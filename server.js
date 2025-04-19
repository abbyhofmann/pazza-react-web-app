
import express from 'express';
import * as mongoDB from "mongodb";
import cors from 'cors';
import * as dotenv from "dotenv";
import path from 'path';
import { ObjectId } from 'mongodb';

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
const folders = db.collection("folders");
const enrollments = db.collection("enrollments");


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
        const fetchedPost = (await posts.findOne({ _id: new ObjectId(pid) }));
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

        const fetchedAnswer = (await answers.findOne({ _id: new ObjectId(aid) }));
        res.json(fetchedAnswer);
    } catch (err) {
        res.status(500).send(`Error when fetching answer: ${err}`);
    }
});

// update an answer's content 
app.put('/api/answer/updateAnswer', async (req, res) => {
    try {
        // answer id is a request parameter 
        const { aid, newContent } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(aid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedAnswer = await answers.findOneAndUpdate(
            { _id: new ObjectId(aid) },
            { $set: { content: newContent } },
            { returnDocument: "after" }
        );

        res.json(updatedAnswer);
    } catch (err) {
        res.status(500).send(`Error when updating answer: ${err}`);
    }
});

// create a new answer
app.post('/api/answer/createAnswer', async (req, res) => {
    if (!(req.body.postId !== undefined &&
        req.body.postId !== '' &&
        req.body.type !== undefined &&
        req.body.authors !== undefined &&
        // req.body.authors.length !== 0 && // TODO - uncomment once we have author added
        req.body.content !== undefined &&
        req.body.content !== '' &&
        req.body.dateEdited !== undefined &&
        req.body.dateEdited !== '')) {
        res.status(400).send('Invalid answer body');
        return;
    }

    const newAnswer = req.body;
    try {
        const result = await answers.insertOne(newAnswer);
        const createdAnswer = await answers.findOne({ _id: result.insertedId });
        res.json(createdAnswer);
    } catch (err) {
        res.status(500).send(`Error when creating answer: ${err}`);
    }
});

// get an individual user by their user ID
app.get('/api/user/:uid', async (req, res) => {
    try {
        // user id is a request parameter 
        const { uid } = req.params;

        const fetchedUser = (await users.findOne({ _id: uid }));
        res.json(fetchedUser);
    } catch (err) {
        res.status(500).send(`Error when fetching user: ${err}`);
    }
});

// get all the instructors and TAs of a course 
app.get('/api/user/getInstructors', async (req, res) => {
    try {
        const { cid } = req.body;
        
        const fetchedInstructors = (await users.find({}))

    } catch (err) {
        res.status(500).send(`Error when fetching instructors: ${err}`);
    }
})

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
        const fetchedDiscussion = (await followupDiscussions.findOne({ _id: new ObjectId(fudid) }));
        res.json(fetchedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when fetching discussion: ${err}`);
    }
});

// create a new followup discussion 
app.post('/api/followupDiscussion/createDiscussion', async (req, res) => {
    if (!(req.body.postId !== undefined &&
        req.body.postId !== '' &&
        req.body.authorId !== undefined &&
        req.body.authorId !== '' &&
        req.body.datePosted !== undefined &&
        req.body.datePosted !== '' &&
        req.body.content !== undefined &&
        req.body.content !== '' &&
        req.body.replies !== undefined)) {
        res.status(400).send('Invalid discussion body');
        return;
    }
    const newDiscussion = req.body;
    try {
        const result = await followupDiscussions.insertOne(newDiscussion);
        const createdDiscussion = await followupDiscussions.findOne({ _id: result.insertedId });
        res.json(createdDiscussion);
    } catch (err) {
        res.status(500).send(`Error when creating discussion: ${err}`);
    }
});

// add a reply to followup discussion 
app.put('/api/followupDiscussion/addReply', async (req, res) => {
    try {

        const { fudId, rid } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId) || !mongoDB.ObjectId.isValid(rid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedDiscussion = await followupDiscussions.findOneAndUpdate(
            { _id: new ObjectId(fudId) },
            { $addToSet: { replies: rid } },
            { returnDocument: "after" }
        );

        res.json(updatedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when adding reply to discussion: ${err}`);
    }
});

// marks a followup discussion as resolved
app.put('/api/followupDiscussion/markResolved', async (req, res) => {
    try {

        const { fudId } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedDiscussion = await followupDiscussions.findOneAndUpdate(
            { _id: new ObjectId(fudId) },
            { $set: { resolved: true } },
            { returnDocument: "after" }
        );

        res.json(updatedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when marking discussion as resolved: ${err}`);
    }
});

// marks a followup discussion as unresolved
app.put('/api/followupDiscussion/markUnresolved', async (req, res) => {
    try {

        const { fudId } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedDiscussion = await followupDiscussions.findOneAndUpdate(
            { _id: new ObjectId(fudId) },
            { $set: { resolved: false } },
            { returnDocument: "after" }
        );

        res.json(updatedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when marking discussion as unresolved: ${err}`);
    }
});

// add a followup discussion to post 
app.put('/api/post/addDiscussion', async (req, res) => {
    try {

        const { pid, fudId } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid) || !mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedPost = await posts.findOneAndUpdate(
            { _id: new ObjectId(pid) },
            { $addToSet: { followupDiscussions: fudId } },
            { returnDocument: "after" }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).send(`Error when adding discussion to post: ${err}`);
    }
});

// add an answer to post 
app.put('/api/post/addAnswer', async (req, res) => {
    try {
        const { pid, aid, type } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid) || !mongoDB.ObjectId.isValid(aid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        if (type !== "student" && type !== "instructor") {
            return res.status(400).send("Invalid answer type");
        }

        const updatedPost = await posts.findOneAndUpdate(
            { _id: new ObjectId(pid) },
            {
                $set: {
                    [type === "student" ? "studentAnswer" : "instructorAnswer"]: aid,
                },
            },
            { returnDocument: "after" }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).send(`Error when adding student answer to post: ${err}`);
    }
})

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

        const fetchedReply = (await replies.findOne({ _id: new ObjectId(rid) }));
        res.json(fetchedReply);
    } catch (err) {
        res.status(500).send(`Error when fetching reply: ${err}`);
    }
});

// create a new reply
app.post('/api/reply/createReply', async (req, res) => {

    if (!(req.body.followupDiscussionId !== undefined &&
        req.body.followupDiscussionId !== '' &&
        req.body.authorId !== undefined &&
        // req.body.authorId !== '' && // TODO - uncomment when we add author
        req.body.content !== undefined &&
        req.body.content !== '' &&
        req.body.datePosted !== undefined &&
        req.body.datePosted !== '')) {
        res.status(400).send('Invalid reply body');
        return;
    }

    const newReply = req.body;
    try {
        const result = await replies.insertOne(newReply);
        const createdReply = await replies.findOne({ _id: result.insertedId });
        res.json(createdReply);
    } catch (err) {
        res.status(500).send(`Error when creating reply: ${err}`);
    }
});

// create a new followup discussion 
app.post('/api/followupDiscussion/createDiscussion', async (req, res) => {
    if (!(req.body.postId !== undefined &&
        req.body.postId !== '' &&
        req.body.authorId !== undefined &&
        req.body.authorId !== '' &&
        req.body.datePosted !== undefined &&
        req.body.datePosted !== '' &&
        req.body.content !== undefined &&
        req.body.content !== '' &&
        req.body.replies !== undefined)) {
        res.status(400).send('Invalid discussion body');
        return;
    }
    const newDiscussion = req.body;
    try {
        const result = await followupDiscussions.insertOne(newDiscussion);
        const createdDiscussion = await followupDiscussions.findOne({ _id: result.insertedId });
        res.json(createdDiscussion);
    } catch (err) {
        res.status(500).send(`Error when creating discussion: ${err}`);
    }
});

// add a reply to followup discussion 
app.put('/api/followupDiscussion/addReply', async (req, res) => {
    try {

        const { fudId, rid } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId) || !mongoDB.ObjectId.isValid(rid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedDiscussion = await followupDiscussions.findOneAndUpdate(
            { _id: new ObjectId(fudId) },
            { $addToSet: { replies: rid } },
            { returnDocument: "after" }
        );

        res.json(updatedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when adding reply to discussion: ${err}`);
    }
});

// marks a followup discussion as resolved
app.put('/api/followupDiscussion/markResolved', async (req, res) => {
    try {

        const { fudId } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedDiscussion = await followupDiscussions.findOneAndUpdate(
            { _id: new ObjectId(fudId) },
            { $set: { resolved: true } },
            { returnDocument: "after" }
        );

        res.json(updatedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when marking discussion as resolved: ${err}`);
    }
});

// marks a followup discussion as unresolved
app.put('/api/followupDiscussion/markUnresolved', async (req, res) => {
    try {

        const { fudId } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedDiscussion = await followupDiscussions.findOneAndUpdate(
            { _id: new ObjectId(fudId) },
            { $set: { resolved: false } },
            { returnDocument: "after" }
        );

        res.json(updatedDiscussion);
    } catch (err) {
        res.status(500).send(`Error when marking discussion as unresolved: ${err}`);
    }
});

// add a followup discussion to post 
app.put('/api/post/addDiscussion', async (req, res) => {
    try {

        const { pid, fudId } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid) || !mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedPost = await posts.findOneAndUpdate(
            { _id: new ObjectId(pid) },
            { $addToSet: { followupDiscussions: fudId } },
            { returnDocument: "after" }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).send(`Error when adding discussion to post: ${err}`);
    }
});

// add an answer to post 
app.put('/api/post/addAnswer', async (req, res) => {
    try {
        const { pid, aid, type } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid) || !mongoDB.ObjectId.isValid(aid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        if (type !== "student" && type !== "instructor") {
            return res.status(400).send("Invalid answer type");
        }

        const updatedPost = await posts.findOneAndUpdate(
            { _id: new ObjectId(pid) },
            {
                $set: {
                    [type === "student" ? "studentAnswer" : "instructorAnswer"]: aid,
                },
            },
            { returnDocument: "after" }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).send(`Error when adding student answer to post: ${err}`);
    }
})

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

        const fetchedReply = (await replies.findOne({ _id: new ObjectId(rid) }));
        res.json(fetchedReply);
    } catch (err) {
        res.status(500).send(`Error when fetching reply: ${err}`);
    }
});

// create a new reply
app.post('/api/reply/createReply', async (req, res) => {

    if (!(req.body.followupDiscussionId !== undefined &&
        req.body.followupDiscussionId !== '' &&
        req.body.authorId !== undefined &&
        // req.body.authorId !== '' && // TODO - uncomment when we add author
        req.body.content !== undefined &&
        req.body.content !== '' &&
        req.body.datePosted !== undefined &&
        req.body.datePosted !== '')) {
        res.status(400).send('Invalid reply body');
        return;
    }

    const newReply = req.body;
    try {
        const result = await replies.insertOne(newReply);
        const createdReply = await replies.findOne({ _id: result.insertedId });
        res.json(createdReply);
    } catch (err) {
        res.status(500).send(`Error when creating reply: ${err}`);
    }
});

// get all the folders in a course
app.get('/api/folders', async (req, res) => {
    try {
        // course id is in the request body 
        const { cid } = req.body;
        const fetchedFolders = await folders.find({ course_id: cid }).toArray();
        res.status(200).json(fetchedFolders);
    } catch (err) {
        res.status(500).send(`Error when fetching folders: ${err}`);
    }
});

// get the names of all the folders in a course
app.get('/api/folders/names', async (req, res) => {
    try {
        const { cid } = req.body;
        const fetchedFolders = await folders.find({ course_id: cid }).toArray();
        const names = fetchedFolders.map(folder => folder.name);
        res.status(200).json(names);
    } catch (err) {
        res.status(500).send(`Error when fetching folder names: ${err}`);
    }
});

// get all the posts in a course's folder
app.get('/api/folders/posts', async (req, res) => {
    try {
        const { folder, cid } = req.body;
        const fetchedFolders = await folders.find({ course_id: cid, name: folder }).toArray();
        const posts = fetchedFolders.map(folder => folder.posts);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send(`Error when fetching folder posts: ${err}`);
    }
});

// add folder in a specific course
app.post('/api/folders', async (req, res) => {
    try {
        const { folder } = req.body;
        const resp = await folders.insertOne(folder);
        res.status(200).send(resp);
    } catch (err) {
        res.status(500).send(`Error when creating folder: ${err}`);
    }
});

// delete folders 
app.delete('/api/folders', async (req, res) => {
    try {
        const toDelete = req.body;
        const responses = [];
        for (const f of toDelete) {
            const resp = await folders.deleteOne(
                { name: f.name, course: f.course },
                (err, obj) => {
                    if (err) throw err;
                });
            responses.push(resp);
        }
        res.status(200).send(`Successful in deleting ${responses.length} folders`);
    } catch (err) {
        res.status(500).send(`Error when deleting folder: ${err}`);
    }
});

// to edit a folder name
app.put('/api/folders', async (req, res) => {
    try {
        const { courseId, oldName, newName } = req.body;
        const resp = await folders.updateOne(
            { name: oldName, course: courseId },
            { $set: { name: newName } }
        );
        res.status(200).send(resp);
    } catch (err) {
        res.status(500).send(`Error when editing folder name: ${err}`);
    }
})

// get enrollments for a course
app.get('/api/enrollments/:cid', async (req, res) => {
    try {
        // course id is a request param 
        const { cid } = req.params;
        const fetchedEnrollments = await enrollments.find({ course: cid }).toArray();
        res.status(200).json(fetchedEnrollments);
    } catch (err) {
        res.status(500).send(`Error when fetching enrollments: ${err}`);
    }
}); 

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server running on Port ${process.env.PORT || 3000}`);
});