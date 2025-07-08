// 全局注册
import components from "./components";
import type { App } from 'vue';

export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

// 全局安装
export const install = function (app: App) {
  // 判断是否安装
  // if (app[INSTALLED_KEY]) return

  // app[INSTALLED_KEY] = true
  components.forEach((component) => app.use(component));
}

export default install;

// 按需加载
export * from "@nyx-plus/components";
