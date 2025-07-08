// 生成全局的ts
import path from "path";
import { readFile, writeFile } from "fs/promises";
import ts from 'typescript'
import glob from "fast-glob";
import { copy, remove } from "fs-extra";
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'
import { rootDir, outputEsm, npRoot, distRoot } from "./common.js";
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
  const typesDir = path.join(distRoot, 'types', 'packages')
  const entryDir = path.join(typesDir, 'nyx-plus')
  const entryFilePath = path.join(entryDir, 'index.d.ts')
  const tsDir = path.join(rootDir, 'node_modules', 'typescript')
  const tsConfigPath = path.join(rootDir, 'tsconfig.web.json')
  const tsConfig = ts.readConfigFile(tsConfigPath, ts.sys.readFile)

  await run(
    "npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir dist/types"
  );

  // Rollup all .d.ts files into index.d.ts
  const extractorConfig = ExtractorConfig.prepare({
    configObject: {
      projectFolder: typesDir,
      mainEntryPointFilePath: entryFilePath,
      apiReport: {
        enabled: false,
      },
      docModel: {
        enabled: false,
      },
      tsdocMetadata: {
        enabled: false,
      },
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: entryFilePath,
      },
      compiler: {
        overrideTsconfig: {
          compilerOptions: {
            lib: tsConfig.config.compilerOptions.lib,
            paths: {
              'nyx-plus': [entryFilePath],
              '@nyx-plus/*': [`${typesDir}/*`],
            },
            skipLibCheck: true,
          },
          include: [typesDir],
        },
      },
    },
    configObjectFullPath: undefined,
    packageJsonFullPath: path.join(npRoot, 'package.json'),
  })

  Extractor.invoke(extractorConfig, { typescriptCompilerFolder: tsDir })

  // Format the bundle file
  const fileContent = await readFile(entryFilePath, 'utf8')
  const sourceFile = ts.createSourceFile(
    entryFilePath,
    fileContent,
    tsConfig.config.compilerOptions.target
  )

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const formattedText = printer.printFile(sourceFile)

  await writeFile(entryFilePath, formattedText, 'utf8')

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

  await copy(entryDir, typesDir)
  await remove(entryDir)
};
