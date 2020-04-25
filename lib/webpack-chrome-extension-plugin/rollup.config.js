import commonjs from "@rollup/plugin-commonjs";
import typescriptResolve from "rollup-plugin-typescript2";
import typescript from "typescript";

const plugins = [
  typescriptResolve({ typescript, rollupCommonJSResolveHack: true }),
  commonjs({
    sourceMap: true,
    extensions: [".js", ".ts"],
  }),
];

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
    name: "test",
  },
  plugins,
};
