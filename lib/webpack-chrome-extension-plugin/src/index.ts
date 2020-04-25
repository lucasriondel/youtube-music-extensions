import fs from "fs";

const generateExtension = (minifedExtension: string) => `
const script=document.createElement("script");function main(){${minifedExtension}}script.appendChild(document.createTextNode("("+main+")();")),(document.body||document.head||document.documentElement).appendChild(script);
`;

class WebpackChromeExtensionPlugin {
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
        callback();
      }
    );
  }
}

export default WebpackChromeExtensionPlugin;
