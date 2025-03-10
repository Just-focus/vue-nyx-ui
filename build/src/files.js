import gulp from "gulp";
// 删除文件或者文件夹
import { rimrafSync } from "rimraf";
import { resolve } from "path";
import { copy } from "fs-extra";
import {
  outputDir,
  pkgRoot,
  rootDir,
  outputEsm,
  outputCjs,
  outputDirIcons,
  iconRoot,
} from "./common.js";

// 存在包，则先删除
export const deletePkg = async () => rimrafSync(outputDir);
export const deleteIconsPkg = async () => rimrafSync(outputDirIcons);

// 复制package,json
export const copyPackage = async () => {
  await new Promise((resolve) => {
    gulp
      .src(`${pkgRoot}/package.json`)
      .pipe(gulp.dest(`${outputDir}`))
      .on("end", resolve); // 监听流完成
  });
};

export const copyIconPackage = async () => {
  await new Promise((resolve) => {
    gulp
      .src(`${iconRoot}/package.json`)
      .pipe(gulp.dest(`${outputDirIcons}`))
      .on("end", resolve); // 监听流完成
  });
};

// 复制TS定义
export const copyTypesDefinitions = (done) => {
  const src = resolve(rootDir, "dist", "types", "packages");
  const copyTypes = (path) => copy(src, path, { recursive: true });

  return Promise.all([copyTypes(outputEsm), copyTypes(outputCjs)]);
};
