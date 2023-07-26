import { client } from "../db.js";
import jwt from "jsonwebtoken";

export async function addUser(user){
    return client.db("demo").collection("users").insertOne(user);
}
export async function checkUser(user){
    return client.db("demo").collection("users").findOne({email:user});
}

export function generateToken(id){
    return jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn:"30d"}
    )
}