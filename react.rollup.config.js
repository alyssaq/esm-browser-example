import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
  input: 'react-example.js',
  output: {
    file: 'build/react-bundle.js',
    format: 'esm'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': '"production"'
    }),
    resolve(),
    commonjs()
  ],

}
