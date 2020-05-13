import G6 from "@antv/g6";
import data from "./data";
function g6Demo() {
  const width = document.getElementById("container").scrollWidth;
  const height = document.getElementById("container").scrollHeight || 1500;
  const graph = new G6.TreeGraph({
    container: "container",
    width,
    height,
    modes: {
      default: [
        {
          type: "collapse-expand",
          onChange: function onChange(item, collapsed) {
            const data = item.get("model").data;
            data.collapsed = collapsed;
            return true;
          },
        },
        "drag-canvas",
        "zoom-canvas",
      ],
    },
    defaultNode: {
      size: 26,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      style: {
        fill: "#C6E5FF",
        stroke: "#5B8FF9",
      },
    },
    defaultEdge: {
      type: "cubic-horizontal",
      style: {
        stroke: "#A3B1BF",
      },
    },
    layout: {
      type: "mindmap",
      direction: "H",
      getId: function getId(d) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 16;
      },
      getVGap: function getVGap() {
        return 10;
      },
      getHGap: function getHGap() {
        return 100;
      },
    },
  });
  let centerX = 0;
  graph.node((node) => {
    if (node.id === "Modeling Methods") {
      centerX = node.x;
    }

    return {
      label: node.id,
      labelCfg: {
        offset: 10,
        position:
          node.children && node.children.length > 0
            ? "left"
            : node.x > centerX
            ? "right"
            : "left",
      },
    };
  });

  graph.data(data);
  graph.render();
  graph.fitView();
  // 响应 hover 状态
  graph.on("node:mouseenter", (ev) => {
    const node = ev.item;
    const edges = node.getEdges();
    edges.forEach((edge) => graph.setItemState(edge, "running", true));
  });
  graph.on("node:mouseleave", (ev) => {
    const node = ev.item;
    const edges = node.getEdges();
    edges.forEach((edge) => graph.setItemState(edge, "running", false));
  });
}
export default g6Demo;
