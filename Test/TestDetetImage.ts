let assert = require('assert');
let pythonBridge = require('python-bridge');
let fs = require('fs') 

let python = pythonBridge({python: 'python3'});

const Script = fs.readFileSync('./Test/TesteDetect.py', "utf8")

python.ex`exec(${Script})`

python.end()