import gulp from "gulp";
import { moduleBuildEntry } from "./src/iconsBuild.js";
import { deleteIconsPkg, copyIconPackage } from "./src/index.js";

export default gulp.series(
  gulp.series(deleteIconsPkg, moduleBuildEntry, copyIconPackage)
);
