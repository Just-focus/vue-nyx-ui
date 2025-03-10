import { rollup } from "rollup";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
import { iconRoot, outputEsmIcons, outputCjsIcons } from "./common.js";

export const moduleBuildEntry = async () => {
  const writeBundles = await rollup({
    input: resolve(iconRoot, "index.js"), // 配置打包入口文件
    plugins: [
      // 配置插件
      vue(),
    ],
    external: [
      // 排除不进行打包的npm包
      "vue",
    ],
  });

  writeBundles.write({
    format: "esm",
    dir: outputEsmIcons,
    preserveModules: true,
    entryFileNames: `[name].mjs`,
    // sourcemap: true,
  });
  writeBundles.write({
    format: "cjs",
    dir: outputCjsIcons,
    preserveModules: true,
    entryFileNames: `[name].cjs`,
    // sourcemap: true,
  });
};
