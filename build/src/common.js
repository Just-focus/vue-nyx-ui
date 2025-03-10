// node.js 核心方法 url、path

import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

export const PKG_PREFIX = '@element-plus'
export const PKG_NAME = 'element-plus'
export const PKG_CAMELCASE_NAME = 'ElementPlus'
export const PKG_CAMELCASE_LOCAL_NAME = 'ElementPlusLocale'
export const PKG_BRAND_NAME = 'Element Plus'

export const outputPkgDir = "hozon-plus";
export const outputPkgDirIcon = "kolaicon";
export const filePath = fileURLToPath(import.meta.url);
export const dirName = dirname(filePath);
export const rootDir = resolve(dirName, "..", ".."); // 获取UI组件库根目录
export const pkgRoot = resolve(rootDir, "packages"); // 获取UI组件包的目录
export const kpRoot = resolve(rootDir, "packages", 'kola'); // 获取UI组件库根目录
export const iconRoot = resolve(rootDir, "icons"); // 获取图标目录
// kola
export const outputDir = resolve(rootDir, outputPkgDir);
// es
export const outputEsm = resolve(rootDir, outputPkgDir, "es");
// lib
export const outputCjs = resolve(rootDir, outputPkgDir, "lib");
// dist
export const outputUmd = resolve(rootDir, outputPkgDir, "dist");

// icon kola
export const outputDirIcons = resolve(rootDir, outputPkgDirIcon);
// icon es
export const outputEsmIcons = resolve(rootDir, outputPkgDirIcon, "es");
// icon lib
export const outputCjsIcons = resolve(rootDir, outputPkgDirIcon, "lib");
