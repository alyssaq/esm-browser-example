const fs = require('fs')
const path = require('path')

const rimraf = require('rimraf')
const resolve = require('resolve')
const parser = require('@babel/parser').parse
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const types = require("@babel/types")

const jsExp = new RegExp('m?js?$')
const outDir = 'build'
rimraf.sync(outDir)
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir)
}

let counter = 0
function process (data, fileDir, fileSet) {
  const { node } = data

  if (node.source && node.source.type === 'StringLiteral') {
    const originalImportLine = node.source.value
    let newFilePath = originalImportLine
    if (!fs.existsSync(originalImportLine)) {
      const moduleFile = resolve.sync(originalImportLine, {
        basedir: fileDir,
        packageFilter: (pkg) => ({main: pkg.module || pkg.main})
      })
      const parts = moduleFile.split(path.sep)
      const nodeModulesIndex = parts.indexOf('node_modules')
      parts.splice(0, nodeModulesIndex)
      newFilePath = parts.join(path.sep)
    } else {
      newFilePath = path.normalize(originalImportLine)
    }

    const importPath = path.sep + newFilePath
    node.source = types.stringLiteral(importPath)
    return JSdependencies(newFilePath, fileSet)
  }

  return fileSet
}

function JSdependencies (filepath, fileSet = new Set()) {
  if (!filepath.match(jsExp)) {
    return fileSet
  }

  const dir = path.dirname(filepath)
  let jsData = fs.readFileSync(filepath, 'utf8')
  const ast = parser(jsData, {
    sourceType: 'module',
    // allowImportExportEverywhere: true,
    // plugins: ['jsx']
  })

  if (fileSet.has(filepath)) {
    // Duplicate dependency
    return fileSet
  }
  fileSet.add(filepath)

  // Create internal out folders
  const outFolder = path.join(outDir, dir)
  if (!fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder, {recursive: true})
  }

  // Traverse the AST to find the nodes we need.
  traverse(ast, {
    ImportDeclaration(data) {
      fileSet = process(data, dir, fileSet)
    },
    ExportNamedDeclaration(data) {
      fileSet = process(data, dir, fileSet)
    },
    ExportAllDeclaration(data) {
      fileSet = process(data, dir, fileSet)
    }
  })

  const newCode = generate(ast).code
  const outPath = path.join(outDir, filepath)
  fs.writeFile(outPath, newCode, 'utf8', (err) => {
    if (err) return console.log(err)
  })
  counter += 1
  console.log('wrote ' + outPath + ' ' + counter)

  return fileSet
}

const entry = 'app.js'
fs.copyFileSync('index.html', path.join(outDir, 'index.html'))
fs.copyFileSync('data.json', path.join(outDir, 'data.json'))
const res = JSdependencies(entry)
