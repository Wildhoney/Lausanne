import { DEFAULTS, nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { terser } from "rollup-plugin-terser";

const typescriptExtensions = [".ts", ".tsx"];

const nodeResolveExtensions = [...DEFAULTS.extensions, ...typescriptExtensions];

const babelExtensions = [...DEFAULT_EXTENSIONS, ...typescriptExtensions];

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "./dist/index.js",
      format: "esm",
    },
  ],
  plugins: [
    nodeResolve({
      extensions: nodeResolveExtensions,
      exportConditions: ["solid"],
    }),
    typescript(),
    babel({
      extensions: babelExtensions,
      babelHelpers: "bundled",
      presets: [["solid", { generate: "dom", hydratable: true }]],
    }),
    terser(),
  ],
};
