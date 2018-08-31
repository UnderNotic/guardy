import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "umd",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    replace({
      "process.env.BUNDLE_FORMAT": JSON.stringify("UMD")
    }),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
