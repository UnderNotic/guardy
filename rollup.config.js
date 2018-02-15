import replace from 'rollup-plugin-replace';
import { name } from './package.json';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${name}.js`,
    format: 'umd',
    name: name,
    sourcemap: true
  },
  plugins: [
    replace({
      'process.env.BUNDLE_FORMAT': JSON.stringify('UMD')
    }),
    babel({
      exclude: 'node_modules/**',
    })
  ]
};