var robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);

// while(true) {

//     console.log(robot.getMousePos())

// }

robot.moveMouseSmooth(720, 225)
robot.mouseClick()