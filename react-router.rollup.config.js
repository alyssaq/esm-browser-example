import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

export default {
  input: 'react-router-example.js',
  output: {
    file: 'build/react-bundle.js',
    format: 'esm'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': '"production"'
    }),
    babel({
      presets: [
        ['@babel/preset-react', {useBuiltIns: true}],
        ['@babel/preset-env', {targets: {esmodules: true}}]
      ]
    }),
    resolve(),
    commonjs({
      sourceMap: false,
      namedExports : {
        'react-dom' : ['render'],
        'react-is' : ['isValidElementType']
      }
    })
  ]
}
