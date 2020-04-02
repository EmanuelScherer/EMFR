let assert = require('assert');
let pythonBridge = require('python-bridge');
let fs = require('fs') 

let python = pythonBridge({python: 'python3'});

const Script = fs.readFileSync('./Test/TesteDetect.py', "utf8")

console.log(Script)

python.ex`exec(${Script})`

python`a()`.then(x => {console.log(x)})

python.end()