
const fs = require("fs");
const path = require("path/posix");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg", "pkg", "deb"],
};
function organizefn(dirpath){
    let destPath;
    if(dirpath == undefined){
        console.log("plz eneter a valid dirPath");
        return;
    }
    else{
        //first check weather the given path is valid or not
        let doesExist = fs.existsSync(dirpath) ;
        //console.log(doesExist); 
        if(doesExist == true){
            destPath = path.join(dirpath , "organizedFiles");
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }  
            else{
                console.log("this folder already exists");
            }

        } else{
            console.log("plz eneter a valid path");
        }  
    }            
    organizehelper(dirpath , destPath);    

}

function organizehelper(src , dest){
    let childNames = fs.readdirSync(src);
    //console.log(childNames);
    
    for(let i = 0 ; i < childNames.length ; i++){
        let childAdress = path.join(src , childNames[i]);
        let isFile = fs.lstatSync(childAdress).isFile();

        if(isFile == true){
            let fileCatagory = getCatagory(childNames[i]);
            //console.log(childNames[i] + " belongs to " + fileCatagory);
            sendFiles(childAdress , dest , fileCatagory);

        }
    }
}

function getCatagory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    
    for(let type in types){
        let catTypeArr = types[type];
        for(let i = 0 ; i < catTypeArr.length ; i++){
            if(catTypeArr[i] == ext){
                return type;
            }
        }
    }

    return 'others';

}

function sendFiles(srcPath , dest , Filecatagory){
    let catPath = path.join(dest , Filecatagory)
    if(fs.existsSync(catPath) == false){
        fs.mkdirSync(catPath);                
    }  
    let filename = path.basename(srcPath);
    let destFilePath = path.join(catPath , filename);
    fs.copyFileSync(srcPath , destFilePath);
    console.log(filename + " is copyed to " + Filecatagory);
    // fs.unlinkSync(srcPath);        
}

module.exports={
    organizeKey : organizefn
}