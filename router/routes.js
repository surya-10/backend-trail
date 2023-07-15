import express from "express";
import { deletestud, editstud, getAllStudents, getStudById, postNewStud } from "../contollers/students.js";

let router = express.Router();

router.get("/all", async(req, res)=>{
    try{
        console.log(req.query);
        if(req.query.task){
            req.query.task = parseInt(req.query.task);
        }
    let students = await getAllStudents(req);
    if(students.length===0){
        return res.status(400).send({msg:"unable to fetch your data"})
    }
    return res.status(200).send(students);
}
catch(error){
    res.status(500).send({error:"internal server error"});
}
})

router.get("/all/:id", async(req, res)=>{
    try {
        let {id} = req.params;
        let stud = await getStudById(id);
        if(!stud){
            return res.status(400).send({msg:"unable to get your data"})
        }
        return res.status(200).send({data:stud});
        
    } catch (error) {
        res.status(500).send({error:"internal server error"});
    }
})

router.post("/add", async(req, res)=>{
    try{
    let newData = req.body;
    console.log(newData);
    if(!newData){
        return res.status(400).send({msg:"unable to get your data"})
    }
    let result = await postNewStud(newData);
    if(!result){
        return res.status(400).send({msg:"unable to fetch your data"})
    }
    return res.status(201).send({data:result});
}
catch(error){
    res.status(500).send({error:"internal server error"});
}
})


router.put("/edit/:id", async(req, res)=>{
    try{
    let {id} = req.params;
    let updateData = req.body;
    if(!id || !updateData){
        return res.status(400).send({msg:"unable to get your data"})
    }
    let result = await editstud(id, updateData);
    if(!result){
        return res.status(400).send({msg:"unable to fetch your data"})
    }
    return res.status(201).send({data:result});
}
catch(error){
    res.status(500).send({error:"internal server error"});
}
})

router.delete("/delete/:id", async(req, res)=>{
   try {
    let {id} =req.params;
    console.log(id)
    if(!id){
        return res.status(400).send({msg:"unable to fetch your data"})
    }
    let result = await deletestud(id);
    return res.status(201).send({data:result});

    
   } catch (error) {
    res.status(500).send({error:"internal server error"});
   }
})
export const studentRouter = router;