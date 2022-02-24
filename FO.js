const fs = require("fs");
const path = require("path/posix");
const { arrayBuffer } = require("stream/consumers");
const { dirname } = require("path/posix");


// Module exported
const organize = require("./commands/organize")
const help = require("./commands/help")
const tree = require('./commands/tree')



// taking input from terminal
let inputArr = process.argv.slice(2);
let cmd = inputArr[0];

switch(cmd){
    case 'tree' :
        tree.treeKey(inputArr[1])
        //console.log("Tree Implimented")
        break;
    case 'organize' :
        organize.organizeKey(inputArr[1]);
        //console.log("Organize Implimented")
        break;
    case 'help' :
        help.helpKey();
        console.log("Help Implimented");
        break;
    default : 
        console.log("plz enter right cmd");
        break;
}










