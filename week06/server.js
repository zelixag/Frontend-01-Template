const http = require("http");
const fs = require('fs')
var data = fs.readFileSync("index.html");
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  console.log(req.headers)
  res.setHeader("Content-Type", "text/html");
  res.setHeader("X-Foo", "bar");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`data`);
});

server.listen(8099);
