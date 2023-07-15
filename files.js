console.log(process.argv);
let [, , name2] = process.argv;
console.log(name2);
let fs = require("fs");
fs.readFile("./sample.txt", "utf-8", (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})
let content = "hello";
let content2 = "world";
fs.writeFile("./newFile.txt", content, (err, data)=>{
    if(err){
        console.log("eror");
    }
    else{
        console.log("success");
    }
})
fs.appendFile("/newFile.txt", content2, (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("updated");
    }
})
fs.writeFile("./demo.txt", "hello, i am demo", (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("created");
    }
})
fs.unlink("./demo.txt", (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("deleted");
    }
})
let os = require("os");
console.log(os.version());
console.log(os.freemem()/(1024*1024));

let date = new Date();
console.log(__dirname)
console.log(__filename)
