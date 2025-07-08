import glob from "fast-glob";
import { rollup } from "rollup";
import { resolve } from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import typescript from '@rollup/plugin-typescript';
import {
  rootDir,
  npRoot,
  outputEsm,
  outputCjs,
  PKG_NAME,
} from "./common.js";

// 重写@import路径
function rollupPluginCompileStyleEntry() {
  const themeEntryPrefix = `@nyx-plus/theme/src/`;
  return {
    name: "rollup-plugin-compile-style-entry",
    resolveId(id) {
      if (!id.startsWith(themeEntryPrefix)) return;
      return {
        // 将 scss 字符替换成 css
        id: id.replaceAll(themeEntryPrefix, `${PKG_NAME}/theme/`),
        external: "absolute",
      };
    },
  };
}

// 模块打包
export const moduleBuildEntry = async () => {
  const input = await glob("**/*.{js,ts,vue}", {
    cwd: npRoot,
    absolute: true,  // 绝对路径
    onlyFiles: true, // 文件的路径，不需要目录
  })

  const writeBundles = await rollup({
    input, // 配置打包入口文件
    plugins: [
      rollupPluginCompileStyleEntry(),
      vue(),
      typescript({
        tsconfig: resolve(rootDir, "tsconfig.json"),
      }),
      nodeResolve({ extensions: [".ts"] }),
      esbuild(),
      postcss({
        pextract: true, // css通过链接引入
      }),
    ],
    external: [
      // 排除不进行打包的npm包
      'vue',
      '@vueuse/core',
      '@nyx-plus/icons-vue',
      'async-validator',
    ],
  });

  writeBundles.write({
    format: "esm",
    dir: outputEsm,
    preserveModules: true,
    entryFileNames: `[name].mjs`,
    preserveModulesRoot: npRoot,
    sourcemap: true,
  });
  writeBundles.write({
    format: "cjs",
    dir: outputCjs,
    preserveModules: true,
    entryFileNames: `[name].cjs`,
    preserveModulesRoot: npRoot,
    sourcemap: true,
    exports: "named",
  });
};
