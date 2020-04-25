const fs = require('fs');

class WebpackChromeExtensionBundle {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.done.tapAsync(
      'WebpackChromeExtensionBundle',
      (compilation, callback) => {
        const file = fs.readFileSync('./dist/main.js', { encoding: 'utf8' });

        fs.writeFileSync(
          'dist/main.js',
          `
const script = document.createElement("script");
script.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(
    script
);

function main() {
${file}
}`
        );
        console.log('Wrapped bundle inside a script tag injection.');
        callback();
      }
    );
  }
}

module.exports = WebpackChromeExtensionBundle;
