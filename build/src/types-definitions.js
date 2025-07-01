// 生成全局的ts
import path from "path";
import { readFile, writeFile } from "fs/promises";
import glob from "fast-glob";
import { copy, remove } from "fs-extra";
import { rootDir, outputEsm } from "./common.js";
import { copyTypesDefinitions } from "./files.js";
import { parallel, series } from "gulp";
import { run } from './process.js'

// export const pathRewriter = () => {
//   return (id) => {
//     id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`);
//     id = id.replaceAll(`${PKG_PREFIX}/`, `${outputEsm}/`);
//     return id;
//   };
// };

export const generateTypesDefinitions = async () => {
  await run(
    "npx vue-tsc -p tsconfig.json --declaration --emitDeclarationOnly --declarationDir /dist/types"
  );
  const typesDir = path.join(rootDir, "nyx-ui", "types", "packages");

  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true,
  });

  console.log("filePaths", filePaths);
  const rewriteTasks = filePaths.map(async (filePath) => {
    const content = await readFile(filePath, "utf8");
    await writeFile(filePath, content, "utf8");
  });
  await Promise.all(rewriteTasks);
  const sourceDir = path.join(rootDir, "nyx-ui");
  // await copy(sourceDir, typesDir);
  await remove(sourceDir);
};
