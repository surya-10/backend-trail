import express, { Router } from "express";

import dotenv from "dotenv";
// import { client, dbConnection } from "./db.js";
// import { getAllStudents } from "./contollers/students.js";
import { studentRouter } from "./router/routes.js";

dotenv.config();
let port = process.env.port;
let app = express();
app.listen(port, ()=>{
    console.log("server connected")
});

// middleware
app.use(express.json());

app.use("/", studentRouter);

app.get("/", (req, res)=>{
    res.send("working good");
})

// dbConnection();

// app.get("/student/all", async(req, res)=>{
//     try{
//     let students = await getAllStudents()
//     console.log(students);
//     if(students.length===0){
//         return res.status(400).json({msg:"unable to find your data"});
//     }
//     return res.status(200).send(students);
// }
// catch(error){
//     res.status(500).send({error:"internal server error"});
// }
// })
