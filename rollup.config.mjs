import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'default',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
};
