
import express from 'express';
import { MongoClient } from "mongodb";

const app = express();




import cors from 'cors';

app.use(cors());

app.use(express.json());

const uri = "mongodb+srv://kmwink21:Volleyballgirl%235@cluster0.epbe3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);


async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
connectDB();

const db = client.db("Piazza"); 
const postsCollection = db.collection("post"); 



app.post('/api/post', async (req, res) => {
    try {
        const newPost = req.body;
        const result = await postsCollection.insertOne(newPost);
        res.status(201).json({ message: "Post added successfully", postId: result.insertedId });
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).json({ error: "Error saving post" });
    }
});


app.get('/api/posts', async (req, res) => {
    try {
        const posts = await postsCollection.find().toArray();
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Error fetching posts" });
    }
});

app.listen(3000, 'localhost', () => {
    console.log('Server running on Port 3000');
});
