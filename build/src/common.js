import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

export const PKG_PREFIX = '@nyx-plus'
export const PKG_NAME = "nyx-plus";
export const PKG_CAMELCASE_NAME = 'NyxPlus'
export const PKG_NAME_ICON = "nyx-ui-icon";

export const filePath = fileURLToPath(import.meta.url);
export const dirName = dirname(filePath);
export const rootDir = resolve(dirName, "..", ".."); // 获取UI组件库 “根目录”

// Package directories
export const pkgRoot = resolve(rootDir, "packages"); // 获取UI组件包的目录
export const npRoot = resolve(rootDir, "packages", PKG_NAME); // 获取nyx-plus包的目录
export const iconRoot = resolve(rootDir, "icons"); // 获取图标目录
export const distRoot = resolve(rootDir, 'dist'); // dist 目录

// Main package output paths
export const outputDir = resolve(rootDir, PKG_NAME);
export const outputEsm = resolve(outputDir, "es");
export const outputCjs = resolve(outputDir, "lib");
export const outputUmd = resolve(outputDir, "dist");

// Icon package output paths
export const outputDirIcons = resolve(rootDir, PKG_NAME_ICON);
export const outputEsmIcons = resolve(outputDirIcons, "es");
export const outputCjsIcons = resolve(outputDirIcons, "lib");
