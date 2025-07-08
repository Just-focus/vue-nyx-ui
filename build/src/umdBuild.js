import { rollup } from "rollup";
import { resolve } from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import typescript from '@rollup/plugin-typescript';
import { rootDir, npRoot, outputUmd, PKG_CAMELCASE_NAME } from "./common.js";

// umd打包
export const umdBuildEntry = async () => {
  const writeBundles = await rollup({
    input: resolve(npRoot, "index.ts"), // 配置打包入口文件
    plugins: [
      vue(),
       typescript({
        tsconfig: resolve(rootDir, "tsconfig.json"),
      }),
      nodeResolve({ extensions: ['.ts'] }),
      esbuild(),
    ],
    external: ["vue"], // 排除不进行打包的npm包
  });

  writeBundles.write({
    format: "umd",
    file: resolve(outputUmd, "index.full.js"),
    name: PKG_CAMELCASE_NAME,
    exports: 'named',
    globals: {
      vue: "Vue",
    },
  });
};
