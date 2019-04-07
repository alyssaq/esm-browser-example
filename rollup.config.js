import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'app.js',
  output: {
    file: 'build/bundle.js',
    format: 'esm'
  },
  plugins: [
    resolve()
  ]
}
