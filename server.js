
import express from 'express';
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

const app = express();




import cors from 'cors';

app.use(cors());

app.use(express.json());


dotenv.config();
const dbConn = process.env.DB_CONN_STRING;
const client = new MongoClient(dbConn);

//const uri = "mongodb+srv://kmwink21:Volleyballgirl%235@cluster0.epbe3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const client = new MongoClient(uri);


async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
}

connectDB();


app.post('/api/post', async (req, res) => {

try {
    console.log("received body");
  

    const db = client.db("piazza");
    const posts = db.collection("posts");

    const newPost = {
        ...req.body,
        datePosted: new Date().toISOString()
    };

    const result = await posts.insertOne(newPost);

  
            res.status(201).json({...newPost, _id: result.insertedId});
            
} catch (error) {
    console.error("Error saving Post:", error);
    res.status(500).send("Error saving Post:", error);
}         
        });




app.get('/api/posts', async (req, res) => {
    try {

        const db = client.db("piazza");
        const posts = db.collection("posts");
        const allPosts = (await posts.find({}).toArray());

        console.log('Connected to MongoDB');
        res.status(200).send(allPosts);
    } catch (error) {
        console.error("Error getting Post:", error);
        res.status(500).send("Error getting Post:", error);
    } 
});

app.get('/api/folders', async (req, res) => {
    try {
        const db = client.db("piazza");
        const folders = db.collection("folders");
        const allFolders = (await folders.find({}).toArray());

        console.log('Connected to MongoDB');
        res.status(200).send(allFolders);
    } catch (error) {
        console.error("Error getting Folders:", error);
        res.status(500).send("Error getting Folders:", error);
    } 
})


app.listen(3000, 'localhost', () => {
    console.log('Server running on Port 3000');
});
