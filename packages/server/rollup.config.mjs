import { DEFAULTS, nodeResolve } from "@rollup/plugin-node-resolve";
import common from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const typescriptExtensions = [".ts", ".tsx"];

const nodeResolveExtensions = [...DEFAULTS.extensions, ...typescriptExtensions];

const babelExtensions = [...DEFAULT_EXTENSIONS, ...typescriptExtensions];

export default [
  {
    input: "./src/index.tsx",
    output: [
      {
        file: "./dist/index.js",
        format: "cjs",
      },
    ],
    external: ["solid-js", "solid-js/web", "path", "express", "stream"],
    plugins: [
      nodeResolve({
        extensions: nodeResolveExtensions,
        preferBuiltins: true,
        exportConditions: ["solid"],
      }),
      typescript(),
      babel({
        extensions: babelExtensions,
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true }]],
      }),
      common(),
    ],
    preserveEntrySignatures: false,
  },
];
