/**
 * Emanuel Master Functions RPA (EMFR)
 * 
 * @author Emanuel de Souza Scherer
 * 
 * @module EMFR
 * 
 * @requires @types/node^13.9.5
 * @requires fs@0.0.1-security
 * @requires jimp^0.9.8
 * @requires nan^2.14.0
 * @requires python-bridge^1.1.0
 * @requires robotjs^0.6.0
*/

// LIBS
const robot = require('robotjs')
const pythonBridge = require('python-bridge')
const fs = require('fs')

// LETS GERAIS
const python = pythonBridge()

const EMFR = module.exports = {

    MoveMouse: (x: number, y: number): void => {

        robot.moveMouse(x,y)

    }

}