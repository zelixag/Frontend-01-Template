const net = require("net");
class Request {
  // method, url host + port  +path
  // content-type
  // body: k/v
  // headers
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host || "127.0.0.1";
    this.port = options.port || 8099;
    this.path = options.path || "/";
    this.body = options.body || {};
    // header为空则给空对象
    this.headers = options.headers || {};

    // 关键点 判断header的Content-Type
    // 给默认的Content-Type
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    // 判断Content-Type的值，根据值判断bodyText 的值解析方式不同
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (
      this.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join("&");
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join("\r\n")}
\r
${this.bodyText}`;
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      let parse = new ResponseParse();
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            connection.write(this.toString());
          }
        );
      }
      connection.on("data", (data) => {
        parse.receive(data.toString());
        if (parse.isFinished) {
          resolve(parse.response);
        }
        connection.end();
      });
      connection.on("error", (data) => {
        reject(data.toString());
        connection.end();
      });
    });
  }
}

class Response {}
class ResponseParse {
  constructor() {
    // 第一个状态 status line
    this.WAITTING_STATUS_LINE = 0;
    // /r结束
    // 第二系列状态
    this.WAITTING_STATUS_LINE_END = 1;
    this.WAITTING_HEADER_NAME = 2;
    this.WAITTING_HEADER_SPACE = 3;
    this.WAITTING_HEADER_VALUE = 4;
    this.WAITTING_HEADER_LINE_END = 5;

    // 连续两个空格
    this.WAITTING_HEADER_BLOCK_END = 6;
    this.WAITTING_BODY = 7;

    this.current = this.WAITTING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParse = null;
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }
  get isFinished() {
    return this.bodyParse && this.bodyParse.isFinished;
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParse.content.join(""),
    };
  }
  receiveChar(char) {
    if (this.current === this.WAITTING_STATUS_LINE) {
      // 当有\r的时候，status line结束, 一直迭代添加，添加到\r结束，
      if (char === "\r") {
        this.current = this.WAITTING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITTING_STATUS_LINE_END) {
      // statusLine结束之后，继续header的获取,切换Header Name状态开始
      if (char === "\n") {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_NAME) {
      // header name的获取
      // 当有:的时候，header name结束
      if (char === ":") {
        this.current = this.WAITTING_HEADER_SPACE;
      } else if (char === "\r") {
        // 获取/r 就获取body
        this.current = this.WAITTING_HEADER_BLOCK_END;
        if (this.headers["Transfer-Encoding"] === "chunked") {
          this.bodyParse = new TrunkedBodyParse();
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITTING_HEADER_SPACE) {
      // 当有:的时候，header space结束
      if (char === " ") {
        this.current = this.WAITTING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITTING_HEADER_VALUE) {
      // header value的获取
      // 当有:的时候，header name结束
      if (char === "\r") {
        this.current = this.WAITTING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITTING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_BLOCK_END) {
      if (char === "\n") {
        this.current = this.WAITTING_BODY;
      }
    } else if (this.current === this.WAITTING_BODY) {
      this.bodyParse.receiveChar(char);
    }
  }
}
class TrunkedBodyParse {
  constructor() {
    this.WAITTING_LENGTH = 0;
    this.WAITTING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITTING_NEW_LINE = 3;
    this.WAITTING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;
    this.current = this.WAITTING_LENGTH;
  }
  receiveChar(char) {
    // 数组做加法运算比较差
    if (this.current === this.WAITTING_LENGTH) {
      // console.log("khbjhxs00000jh", this.length);
      if (char === "\r") {
        //console.log('khbjhjh', this.length);
        if (this.length === 0) {
          this.isFinished = true;
        }
        this.current = this.WAITTING_LENGTH_LINE_END;
      } else {
        this.length *= 10;
        this.length += char.charCodeAt(0) - "0".charCodeAt(0);
      }
    } else if (this.current === this.WAITTING_LENGTH_LINE_END) {
      if (char === "\n") {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      if (!this.isFinished) {
        this.content.push(char);
      }
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITTING_NEW_LINE;
      }
    } else if (this.current === this.WAITTING_NEW_LINE) {
      if (char === "\r") {
        this.current = this.WAITTING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITTING_NEW_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITTING_LENGTH;
      }
    }
  }
}

void (async function () {
  const options = {
    method: "POST",
    host: "127.0.0.1",
    post: "8099",
    path: "/",
    headers: { ["X-Foo2"]: "zlxag" },
    body: {
      name: "winter",
    },
  };
  let request = new Request(options);
  let response = await request.send();
  console.log("response", response);
})();
