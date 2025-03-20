
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as mongoDB from "mongodb";
import cors from 'cors';
import * as dotenv from "dotenv";

const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();
const dbConn = process.env.DB_CONN_STRING;
const client = new mongoDB.MongoClient(dbConn);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const postsFilePath = '/Users/katiewinkleblack/Desktop/2025/WEBDEV_NEW/PazzaProject/ACTUAL/pazza-react-web-app/src/Kambaz/Database/posts.json';


app.post('/api/post', (req, res) => {
    console.log("received body");
    console.log(postsFilePath);
    const newPost = req.body;

    fs.readFile(postsFilePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send('Error reading posts');
        }

        const posts = JSON.parse(data || '[]');
        posts.push(newPost);

        fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving post');
            }
            res.status(201).send('Post added successfully');
        });
    });

});

app.get('/api/posts', async (req, res) => {
    try {
        await client.connect();

        const db = client.db("piazza");
        const posts = db.collection("posts");
        const allPosts = (await posts.find({}).toArray());

        console.log('Connected to MongoDB');
        res.status(200).send(allPosts);
    } finally {
        client.close();
    }
});

app.get('/api/post/:pid', async (req, res) => {
    try {
        await client.connect();

        const db = client.db("piazza");
        const posts = db.collection("posts");
        // post id is a request parameter 
        const { pid } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        // fetch the post from the database - returns null if there is not a post with that id 
        const fetchedPost = (await posts.findOne({ _id: pid }));
        console.log('fetched post: ', fetchedPost);
        res.json(fetchedPost);
    } catch (err) {
        res.status(500).send(`Error when fetching post: ${err}`);
    }
    finally {
        client.close();
    }
});

app.listen(3000, 'localhost', () => {
    console.log('Server running on Port 3000');
});
