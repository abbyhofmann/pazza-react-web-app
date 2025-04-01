
import express from 'express';
import * as mongoDB from "mongodb";
import cors from 'cors';
import * as dotenv from "dotenv";
import path from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const dbConn = process.env.DB_CONN_STRING;
const client = new mongoDB.MongoClient(dbConn);

// connect to the DB once at startup
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

connectDB();

const db = client.db("piazza");
const posts = db.collection("posts");
const answers = db.collection("answers");
const users = db.collection("users");
const followupDiscussions = db.collection("followupDiscussions");
const replies = db.collection("replies");


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

// get all posts in database
app.get('/api/post/posts', async (req, res) => {
    try {
        const allPosts = await posts.find({}).toArray();
        console.log('all posts: ', allPosts);
        res.status(200).send(allPosts);
    } catch (err) {
        res.status(500).send(`Error fetching posts: ${err}`);
    }
});

// get an individual post by its post ID
app.get('/api/post/:pid', async (req, res) => {
    try {
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
});

// get an individual answer by its answer ID
app.get('/api/answer/:aid', async (req, res) => {
    try {
        // answer id is a request parameter 
        const { aid } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(aid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const fetchedAnswer = (await answers.findOne({ _id: aid }));
        res.json(fetchedAnswer);
    } catch (err) {
        res.status(500).send(`Error when fetching answer: ${err}`);
    }
});

// update an answer's content 
app.post('/api/answer/updateAnswer', async (req, res) => {
    try {
        // answer id is a request parameter 
        const { aid, newContent } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(aid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedAnswer = await answers.findOneAndUpdate(
            { _id: aid },
            { $set: { content: newContent } },
            { returnDocument: "after" }
        );

        res.json(updatedAnswer);
    } catch (err) {
        res.status(500).send(`Error when fetching answer: ${err}`);
    }
})

// get an individual user by their user ID
app.get('/api/user/:uid', async (req, res) => {
    try {
        // user id is a request parameter 
        const { uid } = req.params;

        // ensure that the id is a valid id - user IDs are not ObjectIds right now
        // if (!mongoDB.ObjectId.isValid(uid)) {
        //     res.status(400).send('Invalid ID format');
        //     return;
        // }

        const fetchedUser = (await users.findOne({ _id: uid }));
        res.json(fetchedUser);
    } catch (err) {
        res.status(500).send(`Error when fetching ansuserwer: ${err}`);
    }
});

// get an individual followup discussion by its ID
app.get('/api/followupDiscussion/:fudid', async (req, res) => {
    try {
        // followup discussion id is a request parameter 
        const { fudid } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const fetchedDiscussion = (await followupDiscussions.findOne({ _id: fudid }));
        res.json(fetchedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when fetching discussion: ${err}`);
    }
});

// create a new followup discussion 
app.post('/api/followupDiscussion/createDiscussion', async (req, res) => {
    if (!isQuestionBodyValid(req.body)) {
        res.status(400).send('Invalid question body');
        return;
      }
      const question: Question = req.body;
    try {
        const createdDiscussion = (await followupDiscussions.create(newDiscussion));
        res.json(createdDiscussion);
    } catch (err) {
        res.status(500).send(`Error when creating discussion: ${err}`);
    }
});

// get an individual followup discussion reply by its ID
app.get('/api/reply/:rid', async (req, res) => {
    try {
        // reply id is a request parameter 
        const { rid } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(rid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const fetchedReply = (await replies.findOne({ _id: rid }));
        res.json(fetchedReply);
    } catch (err) {
        res.status(500).send(`Error when fetching reply: ${err}`);
    }
});

// app.listen(3000, 'localhost', () => {
//     console.log('Server running on Port 3000');
// });
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server running on Port ${process.env.PORT || 3000}`);
});
