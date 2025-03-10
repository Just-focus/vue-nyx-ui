import gulp from "gulp";
import {
  generateTypesDefinitions,
} from "./src/index.js";

export default gulp.series(
  gulp.series(
    generateTypesDefinitions,
  )
);
