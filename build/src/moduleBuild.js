import glob from "fast-glob";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import typescript from "rollup-plugin-typescript2";
import {
  pkgRoot,
  kpRoot,
  outputEsm,
  outputCjs,
  outputPkgDir,
} from "./common.js";

const excludeFiles = (files) => {
  const excludes = ["node_modules"];
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  );
};

// 重写@import路径
function rollupPluginCompileStyleEntry() {
  const themeEntryPrefix = `@nyx-plus/theme/src/`;
  return {
    name: "rollup-plugin-compile-style-entry",
    resolveId(id) {
      // 匹配是否满足 @xxx/vc-el.. 开头的字符
      if (!id.startsWith(themeEntryPrefix)) return;
      return {
        // 将 scss 字符替换成 css
        id: id.replaceAll(themeEntryPrefix, `${outputPkgDir}/theme/`),
        external: "absolute",
      };
    },
  };
}

// 模块打包
export const moduleBuildEntry = async () => {
  const input = excludeFiles(
    await glob("**/*.{js,ts,vue}", {
      cwd: pkgRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true, // 只返回文件的路径
    })
  );

  const writeBundles = await rollup({
    input, // 配置打包入口文件
    plugins: [
      rollupPluginCompileStyleEntry(),
      vue(),
      typescript(),
      nodeResolve({ extensions: [".ts"] }),
      esbuild(),
      postcss({
        pextract: true, // css通过链接引入
      }),
    ],
    external: [
      // 排除不进行打包的npm包
      "vue",
      "@vue/shared",
      "async-validator",
    ],
  });

  writeBundles.write({
    format: "esm",
    dir: outputEsm,
    preserveModules: true,
    entryFileNames: `[name].mjs`,
    preserveModulesRoot: kpRoot,
    sourcemap: true,
  });
  writeBundles.write({
    format: "cjs",
    dir: outputCjs,
    preserveModules: true,
    entryFileNames: `[name].cjs`,
    preserveModulesRoot: kpRoot,
    sourcemap: true,
    exports: "named",
  });
};
