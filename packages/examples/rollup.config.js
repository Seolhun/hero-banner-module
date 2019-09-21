import html from 'rollup-plugin-bundle-html';
import serve from 'rollup-plugin-serve';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const externals = Object.keys(pkg.dependencies);

export default {
  external: [...externals, 'path', 'fs', 'resolve', 'rollup-pluginutils'],
  input: 'src/example.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      mainFields: ['main', 'module'],
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    babel({
      exclude: /node_modules/,
    }),
    postcss({
      extract: true,
      modules: true,
      plugins: [autoprefixer],
    }),
    html({
      template: 'static/index.html',
      dest: 'dist',
      filename: 'index.html',
      // externals: [
      //   { type: "js", file: "file1.js", pos: "before" },
      //   { type: "js", file: "file2.js", pos: "before" },
      // ],
    }),
    terser(),
    isProd
      ? null
      : serve({
        open: true,
        contentBase: ['./dist'],
        openPage: '/index.html',
        host: 'localhost',
        // https: {
        //   key: fs.readFileSync("/path/to/server.key"),
        //   cert: fs.readFileSync("/path/to/server.crt"),
        //   ca: fs.readFileSync("/path/to/ca.pem"),
        // },
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   foo: "bar",
        // },
      }),
  ],
};
