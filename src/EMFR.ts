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
 * 
 * @requires cv2(Python)
 * @requires numpy(Python)
 * 
 * @requires Opencv^4.2.0(PC)
*/

// LIBS
import * as robot from 'robotjs'
import * as pythonBridge from 'python-bridge'
import * as fs from 'fs'

let Jimp = require('jimp')

// LETS GERAIS
//const python = pythonBridge({python: 'python3'})

// TIPOS ESPECIAIS

/**
 * Move o mouse para a posição (x, y)
 * 
 * @param x - X da tela
 * @param y - Y da tela
*/
export let MoveMouse = (x: number, y: number): void => {robot.moveMouse(x,y)}

export let MoveMouseSmooth = (x: number, y: number) : void => {robot.moveMouseSmooth(x, y)}

export let PrintTela = (x: number, y : number, w: number, h: number, path: string) : void => {

    let im = robot.screen.capture(x, y, w, h)

    var jimg = new Jimp(w, h);
    for (var x=0; x<w; x++) {
        for (var y=0; y<h; y++) {
            var index = (y * im.byteWidth) + (x * im.bytesPerPixel);
            var r = im.image[index];
            var g = im.image[index+1];
            var b = im.image[index+2];
            var num = (r*256) + (g*256*256) + (b*256*256*256) + 255;
            jimg.setPixelColor(num, x, y);
        }
    }
    jimg.write("./"+path+".png")

}