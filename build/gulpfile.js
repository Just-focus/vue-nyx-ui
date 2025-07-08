import { parallel, series } from "gulp";
import { run, withTaskName } from "./src/process.js";
import { deletePkg, umdBuildEntry, moduleBuildEntry, buildStyle, copyPackage, generateTypesDefinitions, copyTypesDefinitions } from "./src/index.js"

export default series(
  parallel(
    withTaskName('clean', () => run('rimraf dist')),
    withTaskName('cleanOutput', deletePkg),
  ),
  parallel(
    withTaskName(`shellTask: moduleBuildEntry`, moduleBuildEntry),
    withTaskName(`shellTask: umdBuildEntry`, umdBuildEntry),
    withTaskName(`shellTask: generateTypesDefinitions`, generateTypesDefinitions),
    withTaskName(`shellTask: buildStyle`, buildStyle)
  ),
  parallel(
    withTaskName(`shellTask: copyTypesDefinitions`, copyTypesDefinitions),
    withTaskName(`shellTask: copyPackage`, copyPackage)
  )
)
