import { MongoClient } from "mongodb";
import obj from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const mongoConnectionString = process.env.mongo_url;

export async function dbConnection(){
    // we need new client to connect
    let client = new MongoClient(mongoConnectionString);
    await client.connect();
    console.log("connected to mongodb");
    return client;
}
export let objectId = obj.ObjectId;
export let client = await dbConnection();