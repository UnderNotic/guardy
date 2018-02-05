import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import { name } from './package.json';

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${name}-iife.min.js`,
    format: 'iife',
    sourcemap: 'inline'
  },
  plugins: [
    replace({
      'process.env.BUNDLE_FORMAT': JSON.stringify('IIFE')
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
};
