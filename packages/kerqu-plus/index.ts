// 全局注册
import components from "./components";
import type { App } from 'vue'; //ts中的优化，只获取类型

// 全局安装
export const install = function (app: App) {
  components.forEach((component) => app.use(component));
}
export default install
// 按需加载
export * from "@kerqu-plus/components/index"