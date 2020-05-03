import fs from "fs";

const generateExtension = (minifedExtension: string) => `
const script=document.createElement("script");function main(){${minifedExtension}}script.appendChild(document.createTextNode("("+main+")();")),(document.body||document.head||document.documentElement).appendChild(script);
`;

interface ParamsObject {
  extractPackageJsonVersion?: boolean;
}

class WebpackChromeExtensionPlugin {
  private extractPackageJsonVersion = false;

  constructor(params: ParamsObject = {}) {
    const { extractPackageJsonVersion } = params;
    this.extractPackageJsonVersion = !!extractPackageJsonVersion;
  }

  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler: any) {
    // Specify the event hook to attach to
    compiler.hooks.done.tapAsync(
      "WebpackChromeExtensionPlugin",
      (_: any, callback: () => void) => {
        const file = fs.readFileSync("./dist/main.js", { encoding: "utf8" });

        fs.writeFileSync("dist/main.js", generateExtension(file));
        console.log(
          "WebpackChromeExtensionPlugin: Wrapped bundle inside a script tag injection."
        );

        if (this.extractPackageJsonVersion) {
          try {
            const packageJson = JSON.parse(
              fs.readFileSync("./package.json", {
                encoding: "utf8",
              })
            );

            const manifestJson = JSON.parse(
              fs.readFileSync("./dist/manifest.json", {
                encoding: "utf8",
              })
            );

            console.log("manifestJson", manifestJson);
            manifestJson.version = packageJson.version;
            fs.writeFileSync(
              "./dist/manifest.json",
              JSON.stringify(manifestJson, undefined, 4)
            );
          } catch (e) {
            console.log("error: ", e);
          }
        }

        callback();
      }
    );
  }
}

export default WebpackChromeExtensionPlugin;
