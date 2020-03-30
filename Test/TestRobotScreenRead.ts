const robot = require("robotjs");
let Jimp = require('jimp')

let sizeW = robot.getScreenSize().width
let sizeH = robot.getScreenSize().height

let im = robot.screen.capture(0, 0, sizeW, sizeH)

var jimg = new Jimp(sizeW, sizeH);
for (var x=0; x<sizeW; x++) {
    for (var y=0; y<sizeH; y++) {
        var index = (y * im.byteWidth) + (x * im.bytesPerPixel);
        var r = im.image[index];
        var g = im.image[index+1];
        var b = im.image[index+2];
        var num = (r*256) + (g*256*256) + (b*256*256*256) + 255;
        jimg.setPixelColor(num, x, y);
    }
}
jimg.write('./Test/a.png')