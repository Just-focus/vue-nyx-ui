import { rollup } from "rollup";
import { resolve } from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import typescript from "rollup-plugin-typescript2";
import { kpRoot, outputUmd } from "./common.js";

// umd打包
export const umdBuildEntry = async () => {
  const writeBundles = await rollup({
    input: resolve(kpRoot, "index.ts"), // 配置打包入口文件
    plugins: [
      vue(),
      typescript(),
      nodeResolve({ extensions: ['.ts'] }),
      esbuild(),
    ],
    external: ["vue"], // 排除不进行打包的npm包
  });

  writeBundles.write({
    format: "umd",
    file: resolve(outputUmd, "index.umd.js"),
    name: "NyxUi",
    exports: 'named',
    globals: {
      vue: "Vue",
    },
  });
};
