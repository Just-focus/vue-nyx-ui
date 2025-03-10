const path = require("path");
const MdContainer = require("markdown-it-container"); // 引入markdown-it

// 项目目录
export const projRoot = path.resolve(__dirname, "..", "..");
// 项目名称
export const docsDirName = "docs";
// 文档库目录
export const docRoot = path.resolve(projRoot, docsDirName);
export const mdPlugin = (md) => {
  md.use(MdContainer, "demo", {
    render(tokens, idx) {
      return `<Demo></Demo>`;
    },
  });
};
