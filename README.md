# esm-browser-example
Run ES modules in the browser with minimal modifications. No concatenation, no minfication.

## Building
Libraries: 
* [momentjs](https://momentjs.com/)
* [preact](https://preactjs.com/)
* [d3 v4](https://d3js.org/)

```sh
$ npm install
$ node babelparser.js
```
It will create a `build` folder with `index.html`.

## Building with react & react-router
Because [React's](https://github.com/facebook/react) npm module is a 💩and is not ES6-compliant / ESM, use [rollup](https://rollupjs.org) to create a bundle with cjs.

```sh
$ npm run rollup
```
The bundles will be in the `build` folder with `bundle.html`

## Running
In the `build` folder, run a simple HTTP server with python:
```sh
$ python -m SimpleHTTPServer 2000  # Python 2
$ python3 -m http.server 2000      # Python 3
```
Open `http://localhost:2000` or `http://localhost:2000/bundle.html`
