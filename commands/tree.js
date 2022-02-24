const fs = require("fs");
const path = require("path/posix");
function treeFn(dirpath){
    if(dirpath == undefined){
        console.log("plz enter a valid dir path")
    }
    else{
        let doesExist = fs.existsSync(dirpath);
        if(doesExist == true){
            treeHelper(dirpath  , " ");
        }
    }
}

function treeHelper(targetPath , indent){
    let isFile = fs.lstatSync(targetPath).isFile();
    if(isFile == true){
        let filename = path.basename(targetPath);
        console.log(indent + '├──' + filename)
    }
    else{
        let dirname = path.basename(targetPath);
        console.log(indent + '└──' + dirname)   
        
        let children = fs.readdirSync(targetPath)
        for(let i = 0 ; i < children.length ; i++){
            let childpath = path.join(targetPath , children[i]);
            treeHelper(childpath , indent + "\t");
        }
    }   
}


module.exports={
    treeKey : treeFn
}