const express = require("express");
let app = express();
let fs = require("fs");
let path = require("path");
let dirPath = path.join(__dirname, "timeStamps");
app.use(express.json());
app.listen(8000, ()=>{
    console.log("server connected");
})
app.get("/", (req, res)=>{
    let date = new Date();
    let timeStamp = date.toUTCString();
    fs.writeFileSync(`${dirPath}/curent-date-time.txt`, timeStamp, (err)=>{
        if(err){
            res.send({err:"error in getting time"});
        }
        
    })

    res.sendFile(path.join(dirPath, "curent-date-time.txt"))
})

let carsData = [
    {
        name:"slavia",
        country:"german",
        company:"skoda",
        type:"manual",
        fuel:"petrol"
    },
    {
        name:"KIA",
        country:"US",
        company:"AUDI",
        type:"auto",
        fuel:"diesel"
    },
    {
        name:"ford",
        country:"japan",
        company:"jaguar",
        type:"manual",
        fuel:"petrol"
    },
    {
        name:"mg",
        country:"africa",
        company:"hector",
        type:"auto",
        fuel:"petrol"
    }
]
app.get("/car/all", (req, res)=>{
    console.log(req.query);
    let {type, fuel} = req.query;
    let filterData = carsData;
    if(type){
        filterData = filterData.filter((val)=>val.type === type);
    }
    if(fuel){
        filterData = filterData.filter((val)=>val.fuel === fuel);
    }
    res.send(filterData)
})
app.get("/car/:name", (req, res)=>{
    let {name} = req.params;
    let selectedData = carsData.filter((val)=>val.name===name);
    console.log(selectedData);
    res.status(200).send(selectedData);
})
app.get("/cars/name", (req, res)=>{
    nameData = carsData.map((val)=>{
        return val.name;
    })
      res.send(nameData);  
})

app.post("/car/add", (req, res)=>{
    const newCar = req.body;
    console.log(req.body)
    carsData.push(newCar);
    res.status(200).send(carsData);
})

app.put("/car/edit/:name", (req, res)=>{
    let {name} = req.params;
    console.log(name);
    let selectedCar = carsData.find((val)=>val.name===name);
    console.log(selectedCar)
    selectedCar.type = req.body.type;
    console.log(selectedCar.type);
    res.status(200).send(selectedCar);
})
app.delete("/car/delete/:name", (req, res)=>{
    let {name} = req.params;
    let deletedcar = carsData.filter((val)=>val.name!==name);
    res.send(deletedcar);
})
