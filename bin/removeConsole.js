#!/usr/bin/env node

let fs = require('fs'),
path = require('path'),
consoleRemove = require('../index')
var glob = require("glob")

let argv = process.argv;
const allowedExtName = ['js']

if (!argv[2]) return
removeConsole(argv[2])

function removeConsole(filePath) {
  fs.stat(filePath, function (err, stat) {
    if (err) console.log('the path is incorrect')
    if (stat.isFile()) {
      if (!handleFile(filePath)) {
        console.log('the file type does not supported')
      }
    } else if (stat.isDirectory()) {
      handleDir(filePath)
    }
  })
}

function handleFile(soureFilePath) {
  let extname = path.extname(soureFilePath),
      fileName = path.basename(soureFilePath, '.' + extname)
  if (allowedExtName.indexOf(extname) !== -1) return false
  let targetFilePath = path.join(path.dirname(soureFilePath), fileName + '.temp.' + extname),
      str = fs.readFileSync(soureFilePath, {encoding: 'utf-8'})
  fs.writeFileSync(targetFilePath, consoleRemove(str))
  fs.unlinkSync(soureFilePath)
  fs.renameSync(targetFilePath, soureFilePath)
  return true
}

function handleDir(dir) {
  glob(path.join(dir, '**', '*.*'), function(err, files){
    if(err) {
      console.log(err)
      return
    }
    files.forEach(function(file) {
      handleFile(file)
    })
  })
}