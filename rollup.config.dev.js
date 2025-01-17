import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore.js';
import { ignoreTextfieldFiles } from './elements/ignore/textfield.js';
import { ignoreSelectFiles } from './elements/ignore/select.js';
import { ignoreSwitchFiles } from './elements/ignore/switch.js';

export default {
  input: ['src/nws-alerts-card.ts'],
  output: {
    dir: './dist',
    format: 'es',
  },
  plugins: [
    resolve(),
    typescript(),
    json(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    terser(),
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    ignore({
      files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map((file) => require.resolve(file)),
    }),
  ],
};
