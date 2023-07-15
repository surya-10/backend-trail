import { ObjectId } from "bson";
import { client } from "../db.js";

export async function getAllStudents(req){
    return client.db("demo").collection("student").find(req.query).toArray();
}

export function getStudById(id){
    return client.db("demo").collection("student").findOne({_id:new ObjectId(id)});
}

export function postNewStud(data){
    return client.db("demo").collection("student").insertOne(data);
}

export function editstud(id, data){
    return client.db("demo").collection("student").findOneAndUpdate({_id:new ObjectId(id)}, {$set:data});
}

export function deletestud(id){
    return client.db("demo").collection("student").deleteOne({_id:new ObjectId(id)});
}