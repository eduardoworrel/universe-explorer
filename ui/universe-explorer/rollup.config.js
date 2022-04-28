import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import typescript from "@rollup/plugin-typescript";
export default {
  input: ['src/main.ts'],
  output: [
    {
      file: 'dist/main.js',
      format: 'cjs',
      name: 'main',
    },
  ],
 plugins: [
   typescript(),
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({
      include: ["**.js", "node_modules/**"],
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
    }),
    uglify(),
  ],
};
