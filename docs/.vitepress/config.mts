import { defineConfig } from "vitepress";
import MdContainer from "markdown-it-container";
import path from "path";
import fs from "fs";
import { components } from "./componentsMenu";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "",
  description: "A VitePress Site",
  appearance: false, // 是否启用暗黑模式切换
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "组件", link: "/components/" }],
    sidebar: {
      "/course/": [
        {
          text: "项目重点",
          items: [
            { text: "读懂项目原型", link: "/course/catalog1/prototype.md" },
            { text: "读懂程序流程图", link: "/course/catalog1/flow.md" },
            { text: "用户体验设计", link: "/course/catalog1/design.md" },
            { text: "有效的沟通方式", link: "/course/catalog1/communicate.md" },
            { text: "排查问题经验", link: "/course/catalog1/problem.md" },
          ],
        },
        {
          text: "高阶思维思想",
          items: [
            { text: "参数配置", link: "/course/catalog2/config.md" },
            { text: "逻辑解耦", link: "/course/catalog2/decoupling.md" },
            { text: "组件化", link: "/course/catalog2/component.md" },
            // { text: '模块化', link: '/course/catalog2/module.md' },
            { text: "工程化", link: "/course/catalog2/project.md" },
          ],
        },
        {
          text: "项目开发5大核心",
          items: [
            { text: "1、框架搭建", link: "/course/catalog3/layout.md" },
            { text: "2、安全机制", link: "/course/catalog3/save.md" },
            { text: "3、拦截机制", link: "/course/catalog3/intercept.md" },
            { text: "4、权限机制", link: "/course/catalog3/permission.md" },
            { text: "5、动态路由", link: "/course/catalog3/router.md" },
          ],
        },
        {
          text: "项目开发知识点",
          items: [
            { text: "什么是魔法值", link: "/course/catalog4/mana.md" },
            { text: "OOCSS渲染UI", link: "/course/catalog4/oocss.md" },
            { text: "API接口文档", link: "/course/catalog4/api.md" },
            { text: "业务状态码", link: "/course/catalog4/code.md" },
            { text: "环境变量", link: "/course/catalog4/dev.md" },
            { text: "理解数据库", link: "/course/catalog4/data.md" },
            { text: "token", link: "/course/catalog4/token.md" },
          ],
        },
        {
          text: "性能提升",
          items: [
            { text: "DOM元素渲染卡顿", link: "/course/catalog5/dom.md" },
            { text: "图片和资源", link: "/course/catalog5/img.md" },
            { text: "虚拟列表", link: "/course/catalog5/list.md" },
            { text: "节流与防抖", link: "/course/catalog5/dd.md" },
            { text: "CDN", link: "/course/catalog5/cnd.md" },
          ],
        },
      ],
      "/components/": components,
      "/source/": components,
      "/modify/": components,
    },
  },
  markdown: {
    config: (md) => {
      md.use(MdContainer, "demo", {
        validate(params) {
          return params.trim().match(/^demo\s*(.*)$|/);
        },
        render(tokens: string, idx: string) {
          if (tokens[idx].nesting === 1) {
            // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
            const info = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            const description = info && info.length > 1 ? info[1] : "";
            // 获取路径
            const nextToken = tokens[idx + 1];
            const componentPath =
              nextToken.type === "fence" ? nextToken.content : "";
            /**
             * 读取文件
             */
            let source = "";
            if (componentPath) {
              let file = path.resolve(
                __dirname,
                "../examples",
                `${componentPath}.vue`
              );
              file = file.replace(/\s+/g, "");
              source = fs.readFileSync(file, "utf-8");
            }

            return `<Demo path=${componentPath}>
                      <template #source><pre><code class="language-html">${md.utils.escapeHtml(
                        source
                      )}</code></pre></template>
                      <template #description>${
                        description ? `${md.render(description)}` : ""
                      }</template>
                    `;
          } else {
            return "</Demo>";
          }
        },
      });
    },
  },
});
