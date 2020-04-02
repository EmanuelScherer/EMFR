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
import { type } from 'os'
import { resolve } from 'path'

const lineReader = require('line-reader');
const Jimp = require('jimp')
const screenshot = require('screenshot-desktop')

// LETS GERAIS
//const python = pythonBridge({python: 'python3'})

// TIPOS ESPECIAIS

/**
 * Move o mouse para a posição (x, y)
 * 
 * @param x - X da tela
 * @param y - Y da tela
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * MoveMouse(10, 10)
 * 
*/
export const MoveMouse = (x: number, y: number): void => {robot.moveMouse(x,y)}

/**
 * Move o mouse para a posisão (x, y) suavemente - tenta imitar um humano
 * 
 * @param x - X da tela
 * @param y - Y da tela
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * MoveMouseSmooth(10, 10)
*/
export const MoveMouseSmooth = (x: number, y: number) : void => {robot.moveMouseSmooth(x, y)}

/*
/**
 * Tira um print da tela e gera um png
 * 
 * @param x - X do primeiro ponto da tela (inicio do print)
 * @param y - Y do primeiro ponto da tela (inicio do print)
 * @param w - largura do print
 * @param h - altura do print
 * @param path - lugar e nome do png gerado
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * PrintTela(0, 0, 800, 800, "printlegal")
*/

/**
 * Tira um print da tela, gera uma imagem e retorna uma promessa com o path absoluto da imagem gerada
 * 
 * @param path - lugar e nome da foto com extrensão (Possiveis .jpg e .png) esse path NÃO cria pastas
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * PrintTela("printlegal.png")
*/
export const PrintTela = async (path: string) : Promise<string> => {

    return new Promise(async resolve => {

        let r: string = "";

        await screenshot({ filename: path }).then((imgPath : string) => {
        
            r = imgPath
        
        });

        return r

    })

    // let im = robot.screen.capture(x, y, w, h)

    // var jimg = new Jimp(w, h);
    // for (var x=0; x<w; x++) {
    //     for (var y=0; y<h; y++) {
    //         var index = (y * im.byteWidth) + (x * im.bytesPerPixel);
    //         var r = im.image[index];
    //         var g = im.image[index+1];
    //         var b = im.image[index+2];
    //         var num = (r*256) + (g*256*256) + (b*256*256*256) + 255;
    //         jimg.setPixelColor(num, x, y);
    //     }
    // }
    // jimg.write(path+".png")

}

/**
 * Scrola o mouse em X pixeis para direira ou esquerda, Y pixeis para cima ou baixo
 * 
 * @param x - pixeis para scrollar para X (NEGATIVO VAI PARA ESQUERDA)
 * @param y - pixeis para scrollar para Y (NEGATIVO VAI PARA BAIXO)
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * ScrollMouse(0, -50)
 */
export const ScrollMouse = (x: number, y: number) : void => {

    robot.scrollMouse(x, y)

}

/**
 * Seta tempo de delay para todas as ações do mouse (padrão 10ms)
 * 
 * @param ms - Milisegundos do delay
 *
 * @example
 * <caption>Exemplo de uso</caption>
 * SetMouseDelay(20)
*/
export const SetMouseDelay = (ms: number) : void => {

    robot.setMouseDelay(ms)

}

/**
 * Clicka com o mouse
 * 
 * @param bt - Botão que será usado no click
 * @param db - Define se vai ser double click
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * MouseClick("left", false)
*/
export const MouseClick = (bt: "left" | "right" | "middle", db: boolean) : void => {

    robot.mouseClick(bt, db)

}

/**
 * Muda o estado do mouse
 * 
 * @param tg - Estado do mouse (mantem esse estado até proximo MouseToggle, se for down)
 * @param bt - Botão a ser usado
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * MouseToggle("down", "left")
*/
export const MouseToggle = (tg: "down" | "up", bt: "left" | "right" | "middle") : void => {

    robot.mouseToggle(tg, bt)

}

/**
 * Move o mouse instataneamente para (X, Y) segurando o botão direito
 * 
 * @param x - X da tela
 * @param y - Y da tela
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * DragMouse(100, 100)
 */
export const DragMouse = (x: number, y: number) : void => {

    robot.dragMouse(x, y)

}

interface mouse {

    x: number,
    y: number

}

/**
 * Pega a posisão (x, y) do mouse
*/
export const GetMousePos = () : mouse => {

    return robot.getMousePos()

}

/**
 * Seta tempo de delay para todas as ações do teclado (padrão 10ms)
 * 
 * @param ms - Milisegundos do delay
 *
 * @example
 * <caption>Exemplo de uso</caption>
 * SetKeyboardDelay(20)
*/
export const SetKeyboardDelay = (ms: number) : void => {

    robot.setKeyboardDelay(ms)

}

/**
 * Aperta uma simples tecla com ou sem modificação
 * 
 * @param key - tecla a ser apertada (são muitas então ta tudo aki -> http://robotjs.io/docs/syntax#keys)
 * @param mod - modificador(es) ("alt", "command", "control", "shift", "") -> "" indica sem mod
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * KeyTap("a", ["shift"])
 */
export const KeyTap = (key: string, mod: Array<"alt" | "command" | "control" | "shift" | "">) : void => {

   robot.keyTap(key, mod)

}

/**
 * Aperta uma simples tecla com ou sem modificação
 * 
 * @param key - Tecla a ser apertada (são muitas então ta tudo aki -> http://robotjs.io/docs/syntax#keys)
 * @param tg - Estado do aperto da tecla (mantem esse estado até proximo MouseToggle, se for down)
 * @param mod - Modificador(es) ("alt", "command", "control", "shift", "") -> "" indica sem mod
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * KeyToggle("a", "down", ["shift"])
 */
export const KeyToggle = (key : string, tg: "down" | "up", mod: Array<"alt" | "command" | "control" | "shift" | "">) : void => {

    robot.keyToggle(key, tg, mod)

}

/**
 * Digita uma string no teclado
 * 
 * @param type - String a ser digitada
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * TypeString("eae, blz?")
*/
export const TypeString = (type: string) : void => {

    robot.typeString(type)

} 

/**
 * Digita uma string no teclado com delay 
 * 
 * @param type - String a ser digitada 
 * @param dl  - Delay (caracteres por minuto)
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * TypeString("eae, blz?", 1)
*/
export const TypeStringDelayed = (type: string, dl: number) : void => {

    robot.typeStringDelayed(type, dl)

}

/**
 * Pega a cor do pixel espeficicado (hex)
 * 
 * @param x - X da tela
 * @param y - Y da tela
 * 
 * @example
 * <caption>Exemplo de uso</caption>
 * GetPixelColor(10, 10)
*/
export const GetPixelColor = (x: number, y: number) : string => {

    return robot.getPixelColor(x, y)

} 

interface ScreenSize {

    width: number,
    height: number

}

/**
 * Pega o tamanho da tela
*/
export const GetScreenSize = () : ScreenSize => {

    return robot.getScreenSize()

}

let actions = {

    // MOUSE "Click\[(\d+,\d+)\]"
    MoveMouse: {match: "Click\[(\d+,\d+)\]"},
    MoveMouseSmooth: "a",
    MouseClick: "a",
    DragMouse: "a",
    GetMousePos: "a",
    MouseToggle: "a",
    ScrollMouse: "a",
    SetMouseDelay: "a",

    // TELA
    PrintTela: "a",
    GetPixelColor: "a",
    GetScreenSize: "a",

    // TECLADO
    KeyTap: "a",
    KeyToggle: "a",
    TypeString: "a",
    TypeStringDelayed: "a",
    SetKeyboardDelay: "a"

};

/**
 * Lê um txt com a automação (o txt deve seguir todas as regras do EMFR para automação)
 * 
 * @returns True se tudo certo, False se algo deu errado
 * 
 * @param path - Caminho para o txt da automação
*/
export const ReadAutomation = async (path: string) : Promise<boolean> => {

    return new Promise(async resolve => {

        await lineReader.eachLine(path, (line : string, last: boolean) => {
            
            if (last) {

                resolve(true)

            }
            else {

                console.log(line);

                let a = "MoveMouse"

                actions[a]

            }

        })
        
    })

}