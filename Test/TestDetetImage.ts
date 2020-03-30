let assert = require('assert');
let pythonBridge = require('python-bridge');
let fs = require('fs') 

let python = pythonBridge();

const Script = fs.readFileSync('/home/mano/Documentos/Codigos/EMFR/Test/TesteDetect.py', "utf8")

python.ex`exec(${Script})`

python.end()