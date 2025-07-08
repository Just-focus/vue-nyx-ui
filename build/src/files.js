import gulp from "gulp";
import { deleteAsync } from "del"
import { resolve } from "path";
import { copy } from "fs-extra";
import {
  npRoot,
  iconRoot,
  outputDir,
  outputEsm,
  outputCjs,
  outputDirIcons,
  distRoot,
} from "./common.js";
import { withTaskName } from './process.js';

// 存在包，则先删除
export const deletePkg = async () => await deleteAsync([outputDir], { force: true });
export const deleteIconsPkg = async () => await deleteAsync([outputDirIcons], { force: true });

// 复制package,json
export const copyPackage = async () => {
  await new Promise((resolve) => {
    gulp
      .src(`${npRoot}/package.json`)
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
export const copyTypesDefinitions = async () => {
  const src = resolve(distRoot, "types", "packages");
  const copyTypes = (module, path) =>
    withTaskName(`copyTypes:${module}`, () => copy(src, path, { recursive: true }));
  
  await Promise.all([
    copyTypes('esm', outputEsm)(),
    copyTypes('cjs', outputCjs)()
  ]);
};

// export const copyFiles = () =>
//   Promise.all([
//     copyFile(epPackage, path.join(epOutput, 'package.json')),
//     copyFile(
//       path.resolve(projRoot, 'README.md'),
//       path.resolve(epOutput, 'README.md')
//     ),
//     copyFile(
//       path.resolve(projRoot, 'typings', 'global.d.ts'),
//       path.resolve(epOutput, 'global.d.ts')
//     ),
//   ])


