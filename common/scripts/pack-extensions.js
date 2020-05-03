const { zip } = require("zip-a-folder");
const path = require("path");
const fs = require("fs");

function root(p) {
  return path.join(__dirname, "../..", p);
}

const outputDir = root("./output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function zipExtension(extensionName) {
  const packageJson = require(root(
    `./extensions/${extensionName}/package.json`
  ));
  const extensionDistPath = root(`./extensions/${extensionName}/dist`);
  const outputZipPath = path.join(
    outputDir,
    `${extensionName}-${packageJson.version}.zip`
  );

  console.log(`[${extensionName}] ziping...`);
  await zip(extensionDistPath, outputZipPath);
  console.log(`[${extensionName}] done.`);
}

zipExtension("open-in-genius");
zipExtension("open-in-youtube");
