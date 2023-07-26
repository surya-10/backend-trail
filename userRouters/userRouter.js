import express from "express";
import bcrypt from "bcrypt";
import { addUser, checkUser, generateToken } from "../userController/usercontrol.js";

let router = express.Router();

router.post("/signup", async(req, res)=>{
    try {
        let user = req.body;
        let saltVal = await bcrypt.genSalt(10);

        let checking = await checkUser(req.body.email);
        if(!checking){
        let hashedPass = await bcrypt.hash(req.body.password, saltVal);
        let hashedUser = await {...req.body, password:hashedPass};
        let result = await addUser(hashedUser);
        if(result){
            res.status(201).json({message:"Signup success"});
        }
    }
    else{
        res.status(400).json({msg:"you have already signed in, go to login paage"});
    }
        

        
    } catch (error) {
        res.status(500).send({error:"server error"});
    }
})

router.post("/login", async(req, res)=>{
    try{
    let user = await checkUser(req.body.email);
    // console.log(check.password);
    if(!user){
        res.status(404).send({msg:"Email doesn't exist. please signup"});
    }
    
    let validatePass = await bcrypt.compare(req.body.password, user.password);
    if(!validatePass){
        res.status(404).send({msg:"password wrong"});
    }
    let token = generateToken(user._id);
    res.status(200).send({data:user, token:token});
}
catch(error){
    res.send({msg:"server error"});
}
})
export const userRouter = router;