import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import gulpConcat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import { deleteAsync } from "del";
import { rootDir, pkgRoot, outputDir, outputUmd } from "./common.js";

// 按需加载打包css
const buildScssModules = async () => {
  const sass = gulpSass(dartSass);

  await new Promise((resolve) => {
    gulp
      .src(`${rootDir}/packages/theme/src/**/*.scss`)
      .pipe(sass.sync()) // 编译
      .pipe(autoprefixer({ cascade: false })) // 兼容
      .pipe(cleanCSS()) // 压缩
      .pipe(gulp.dest(`${outputDir}/theme`))
      .on("end", resolve); // 监听流完成
  });

  deleteFiles();
};

// 全量打包CSS
const buildScssFull = async () => {
  const sass = gulpSass(dartSass);

  await new Promise((resolve) => {
    gulp
      .src(`${pkgRoot}/theme/src/index.scss`)
      .pipe(sass.sync()) // 编译
      .pipe(autoprefixer({ cascade: false })) // 兼容
      .pipe(cleanCSS()) // 压缩
      .pipe(gulpConcat("index.css"))
      .pipe(gulp.dest(outputUmd)) // dist
      .on("end", resolve); // 监听流完成
  });
};

// 拷贝scss
const cloneScss = async () => {
  await new Promise((resolve) => {
    gulp
      .src(`${pkgRoot}/theme/src/**/*`)
      .pipe(gulp.dest(`${outputDir}/theme/src`))
      .on("end", resolve); // 监听流完成
  });
};

// 删除指定文件或文件夹
const deleteFiles = async () => {
  await deleteAsync(
    [`${outputDir}/theme/index.css`, `${outputDir}/theme/common`],
    { force: true }
  );
};

export const buildStyle = async () => {
  await Promise.all([cloneScss(), buildScssFull(), buildScssModules()]);
};
