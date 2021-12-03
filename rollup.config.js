import moduleResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.js",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
    },
    {
      file: "lib/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    moduleResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    terser(),
  ],
};
