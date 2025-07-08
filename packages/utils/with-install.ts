// 按需加载组件
import { Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin;
export function withInstall<T>(comp: T) {
  (comp as SFCWithInstall<T>).install = (app: any) => {
    const { name } = comp as unknown as { name: string };
    app.component(name, comp);
  };
  return comp as SFCWithInstall<T>;
}

// 函数注册
export const functionInstall = (fn: any, name: any) => {
  fn.install = (app: any) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
