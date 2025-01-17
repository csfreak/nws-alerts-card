import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore.js';
import { ignoreTextfieldFiles } from './elements/ignore/textfield.js';
import { ignoreSelectFiles } from './elements/ignore/select.js';
import { ignoreSwitchFiles } from './elements/ignore/switch.js';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript(),
  json(),
  babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  dev && serve(serveopts),
  !dev && terser(),
  ignore({
    files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map((file) => require.resolve(file)),
  }),
];

export default [
  {
    input: 'src/nws-alerts-card.ts',
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
