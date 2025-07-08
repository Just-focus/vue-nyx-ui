import gulp from "gulp";
import { deletePkg, umdBuildEntry, moduleBuildEntry, buildStyle, copyPackage, generateTypesDefinitions, copyTypesDefinitions } from "./src/index.js"

export default gulp.series(
  gulp.series(deletePkg, umdBuildEntry, moduleBuildEntry, generateTypesDefinitions, buildStyle, copyPackage, copyTypesDefinitions),
  // copyTypesDefinitions
)
