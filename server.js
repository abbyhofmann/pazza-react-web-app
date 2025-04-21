
import express from 'express';
import session from "express-session";
import * as mongoDB from "mongodb";
import cors from 'cors';
import * as dotenv from "dotenv";
import { ObjectId } from 'mongodb';

dotenv.config();
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
}));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
        maxAge: 1000 * 60 * 60 * 24,
    };
}

app.use(session(sessionOptions));
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
const courses = db.collection("courses");
const modules = db.collection("modules");
const assignments = db.collection("assignments");

// create a new post 
app.post('/api/post/createPost', async (req, res) => {
    if (!(req.body.folders !== undefined &&
        req.body.folders.length !== 0 && // folders should be defined and at least one folder should be selected
        req.body.authorId !== undefined &&
        req.body.authorId !== '' &&
        req.body.datePosted !== undefined &&
        req.body.datePosted !== '' &&
        req.body.type !== undefined &&
        req.body.instructor !== undefined &&
        req.body.title !== undefined &&
        req.body.title !== '' &&
        req.body.content !== undefined &&
        req.body.content !== '' &&
        req.body.followupDiscussions !== undefined &&
        req.body.followupDiscussions.length === 0 && // should be no fuds initially 
        req.body.studentAnswer !== undefined &&
        req.body.studentAnswer === null &&
        req.body.instructorAnswer !== undefined &&
        req.body.instructorAnswer === null &&
        req.body.viewers !== undefined &&
        req.body.viewers.length === 0 && // no viewers upon creation 
        req.body.courseId !== undefined &&
        req.body.courseId !== '')) {
        res.status(400).send('Invalid post body');
        return;
    }

    const newPost = req.body;
    try {
        const result = await posts.insertOne(newPost);
        const createdPost = await posts.findOne({ _id: result.insertedId });
        res.json(createdPost);
    } catch (err) {
        res.status(500).send(`Error when creating post: ${err}`);
    }
});

// delete a post 
app.delete('/api/post/:pid', async (req, res) => {
    try {
        // answer id is a request parameter 
        const { pid } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const postDeletion = (await posts.deleteOne({ _id: new ObjectId(pid) }));
        res.json(postDeletion);
    } catch (err) {
        res.status(500).send(`Error when deleting post: ${err}`);
    }
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

// get all posts in a specific course
app.get('/api/post/posts/course/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const allPostsInCourse = await posts.find({ courseId: cid }).toArray();
        res.status(200).send(allPostsInCourse);
    } catch (err) {
        res.status(500).send(`Error fetching posts in course ${cid}: ${err}`);
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

// get all posts in a course's folder
app.get('/api/post/posts/folder', async (req, res) => {
    try {
        const { courseId, folderName } = req.query;
        const allPosts = await posts.find({}).toArray();
        const filteredPosts = [];
        for (const post of allPosts) {
            if (post.courseId === courseId) {
                if (post.folders && post.folders.includes(folderName)) {
                    filteredPosts.push(post);
                }
            }
        }

        res.json(filteredPosts);
    } catch (err) {
        res.status(500).send(`Error when fetching posts of a folder: ${err}`);
    }
});

// get number of unread posts for a user in a course
app.get('/api/post/unreadCount/:cid/:uid', async (req, res) => {
    try {
        const { cid, uid } = req.params;

        const count = await posts.countDocuments({
            courseId: cid,
            viewers: { $ne: uid } // uid is not in viewers array
        });

        res.send(count.toString());
    } catch (err) {
        res.status(500).send(`Error getting unread post count: ${err}`);
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

// delete an answer 
app.delete('/api/answer/:aid', async (req, res) => {
    try {
        // answer id is a request parameter 
        const { aid } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(aid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const answerDeletion = (await answers.deleteOne({ _id: new ObjectId(aid) }));
        res.json(answerDeletion);
    } catch (err) {
        res.status(500).send(`Error when deleting answer: ${err}`);
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

// get the number of instructor and student responses (i.e. answers)
app.get('/api/answer/responseCounts/:cid', async (req, res) => {
    try {
        // answer id is a request parameter 
        const { cid } = req.params;

        // const countsArray = await answers.aggregate([
        //     {
        //         // join answers with posts 
        //         $lookup: {
        //             from: 'posts',
        //             localField: 'postId',
        //             foreignField: '_id',
        //             as: 'post'
        //         }
        //     },
        //     {
        //         // unwind the joined post array
        //         $unwind: '$post'
        //     },
        //     {
        //         // match only posts from the specific course
        //         $match: {
        //             'post.courseId': cid
        //         }
        //     },
        //     {
        //         // group by 'type' of answer: 0 = student, 1 = instructor
        //         $group: {
        //             _id: '$type',
        //             count: { $sum: 1 }
        //         }
        //     }
        // ]).toArray();
        const countsArray = await answers.aggregate([
            {
                // convert postId string to ObjectId
                $addFields: {
                    postObjId: { $toObjectId: '$postId' }
                }
            },
            {
                // join answers with posts
                $lookup: {
                    from: 'posts',
                    localField: 'postObjId',
                    foreignField: '_id',
                    as: 'post'
                }
            },
            {
                // unwind joined posts array
                $unwind: '$post'
            },
            {
                // match only posts from the specific course
                $match: {
                    'post.courseId': cid
                }
            },
            {
                // group by 'type' of answer: 0 = student, 1 = instructor
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            }
        ]).toArray();

        /*
        structure of response
      [
          { _id: 0, count: _ }, // student responses
          { _id: 1, count: _ }  // instructor responses
      ]
      */

        // convert countsArray into [studentCount, instructorCount] array
        let studentCount = 0;
        let instructorCount = 0;

        for (const entry of countsArray) {
            if (entry._id === 0) {
                studentCount = entry.count;
            } else if (entry._id === 1) {
                instructorCount = entry.count;
            }
        }

        res.json([studentCount, instructorCount]);

    } catch (err) {
        res.status(500).send(`Error when fetching answer counts: ${err}`);
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
});

// add a new user to the database
app.post("/api/users", async (req, res) => {
    const user = await users.insertOne(req.body);
    res.json(user);
});

// get all the users in the database
app.get("/api/users", async (req, res) => {
    const foundUsers = await users.find({}).toArray();
    res.json(foundUsers);
});

// get the current user's courses
app.get("/api/users/courses", async (req, res) => {
    if (req.session.user) {
        const myEnrollments = await enrollments.find({ user: req.session.user._id }).toArray();
        const myCourses = [];
        for (const e of myEnrollments) {
            const c = await courses.findOne({ _id: e.course });
            myCourses.push(c);
        }
        res.json(myCourses);
    }
});

// get a specific user
app.get("/api/users/:userId", async (req, res) => {
    const user = await users.findOne({ _id: req.params.userId });
    res.json(user);
});

// create a new user
app.put("/api/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await users.updateOne({ _id: userId }, { $set: userUpdates });
    const currentUser = req.session.user;
    if (currentUser && currentUser._id === userId) {
        req.session.user = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
});

// delete a specific user
app.delete("/api/users/:userId", async (req, res) => {
    const status = await users.deleteOne({ _id: req.params.userId });
    res.json(status);
});

// create a new user on signup
app.post("/api/users/signup", async (req, res) => {
    const user = await users.findOne({ username: req.body.username });
    if (user) {
        res.status(400).json(
            { message: "Username already in use" });
        return;
    }
    const currentUser = await users.insertOne(req.body);
    req.session.user = currentUser;
    res.json(currentUser);
});

// log into the app and start a new session
app.post("/api/users/signin", async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await users.findOne({ username, password });
    if (currentUser) {
        req.session.user = currentUser;
        res.json(currentUser);
    } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
    }
});

// sign out of the app and destroy session
app.post("/api/users/signout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

// get the current user's profile
app.post("/api/users/profile", async (req, res) => {
    const currentUser = req.session.user;
    if (!currentUser) {
        res.sendStatus(401);
        return;
    }
});

// get the courses of the current user
app.post("/api/courses", async (req, res) => {
    const currentUser = req.session.user;
    const newCourse = await courses.insertOne(req.body);
    await enrollments.insertOne({ user: currentUser._id, course: newCourse._id });
    res.json(newCourse);
});

// get all the courses in the database
app.get("/api/courses", async (req, res) => {
    const allCourses = await courses.find({}).toArray();
    res.send(allCourses);
});

// delete a course from the database
app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await courses.deleteOne({ _id: courseId });
    res.send(status);
});

// update a course
app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await courses.updateOne({ _id: courseId }, { $set: courseUpdates });
    res.send(status);
});

// find the modules of a course
app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modulesFound = await modules.find({ course: courseId }).toArray();
    res.json(modulesFound);
});

// add a new module to the courses
app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
        ...req.body,
        course: courseId,
    };
    const newModule = await modules.insertOne(module);
    res.send(newModule);
});

// delete a course's module
app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modules.deleteOne({ _id: moduleId });
    res.send(status);
});

// update a course's module
app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modules.updateOne({ _id: moduleId }, { $set: moduleUpdates });
    res.send(status);
});

// get all the assignments in the database
app.get("/api/assignments", async (req, res) => {
    const results = await assignments.find({}).toArray();
    res.send(results);
});

// get all the assignments of a course
app.get("/api/assignments/:courseId/course", async (req, res) => {
    const { courseId } = req.params;
    const results = await assignments.find({ _id: courseId }).toArray();
    res.send(results);
});

// delete a specific assignment
app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const status = await assignments.deleteOne({ _id: assignmentId });
    res.send(status);
});

// update a specific assignment
app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = assignments.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    res.send(status);
});

// create a new module
app.post("/api/assignments/:assignmentId/modules", async (req, res) => {
    const { assignmentId } = req.params;
    const module = {
        ...req.body,
        assignment: assignmentId,
    };
    const newModule = await modules.insertOne(module);
    res.send(newModule);
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

// delete a followup discussion 
app.delete('/api/followupDiscussion/:fudId', async (req, res) => {
    try {
        // fud id is a request parameter 
        const { fudId } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const fudDeletion = (await followupDiscussions.deleteOne({ _id: new ObjectId(fudId) }));
        res.json(fudDeletion);
    } catch (err) {
        res.status(500).send(`Error when deleting fud: ${err}`);
    }
});

// update a followup discussion's content 
app.put('/api/followupDiscussion/updateFud', async (req, res) => {
    try {
        // fud id is a request parameter 
        const { fudId, newContent } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedFud = await followupDiscussions.findOneAndUpdate(
            { _id: new ObjectId(fudId) },
            { $set: { content: newContent } },
            { returnDocument: "after" }
        );

        res.json(updatedFud);
    } catch (err) {
        res.status(500).send(`Error when updating fud: ${err}`);
    }
});

// remove a reply from a followup discussion - called when deleting a reply
app.put('/api/followupDiscussion/removeReply', async (req, res) => {
    try {
        const { fudId, replyId } = req.body;
        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(fudId) || !mongoDB.ObjectId.isValid(replyId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedFud = await followupDiscussions.findOneAndUpdate(
            {
                _id: new ObjectId(fudId),
            },
            {
                $pull: {
                    replies: replyId, // remove replyId from the array
                },
            },
            { returnDocument: "after" }
        );

        res.json(updatedFud);
    } catch (err) {
        res.status(500).send(`Error when removing reply from fud: ${err}`);
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
        res.status(500).send(`Error when adding answer to post: ${err}`);
    }
});

// remove an answer from a post - called when deleting an answer
app.put('/api/post/removeAnswer', async (req, res) => {
    try {
        const { pid, aid, type } = req.body;
        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid) || !mongoDB.ObjectId.isValid(aid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedPost = await posts.findOneAndUpdate(
            {
                _id: new ObjectId(pid),
                [`${type}Answer`]: aid, // match only if this answer id matches
            },
            {
                $set: {
                    [`${type}Answer`]: null,
                },
            },
            { returnDocument: "after" }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).send(`Error when removing answer from post: ${err}`);
    }
});

// remove a followup discussion from a post - called when deleting a followup discussion
app.put('/api/post/removeFud', async (req, res) => {
    try {
        const { pid, fudId } = req.body;
        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid) || !mongoDB.ObjectId.isValid(fudId)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedPost = await posts.findOneAndUpdate(
            {
                _id: new ObjectId(pid),
            },
            {
                $pull: {
                    followupDiscussions: fudId, // remove fudId from the array
                },
            },
            { returnDocument: "after" }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).send(`Error when removing fud from post: ${err}`);
    }
});

// get the number of unanswered posts for a course
app.get('/api/post/unanswered/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const count = await posts.countDocuments({
            courseId: cid,
            studentAnswer: null,
            instructorAnswer: null
        });

        res.json(count);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching unanswered count' });
    }
});

// get the total number of posts for a course
app.get('/api/post/countPosts/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const count = await posts.countDocuments({});

        res.json(count);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching total count' });
    }
});

// update a post's content 
app.put('/api/post/updatePost', async (req, res) => {
    try {
        // post id is a request parameter 
        const { pid, newContent } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(pid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedPost = await posts.findOneAndUpdate(
            { _id: new ObjectId(pid) },
            { $set: { content: newContent } },
            { returnDocument: "after" }
        );

        res.json(updatedPost);
    } catch (err) {
        res.status(500).send(`Error when updating post: ${err}`);
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

// delete a reply 
app.delete('/api/reply/:rid', async (req, res) => {
    try {
        // reply id is a request parameter 
        const { rid } = req.params;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(rid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const replyDeletion = (await replies.deleteOne({ _id: new ObjectId(rid) }));
        res.json(replyDeletion);
    } catch (err) {
        res.status(500).send(`Error when deleting reply: ${err}`);
    }
});

// update a reply's content 
app.put('/api/reply/updateReply', async (req, res) => {
    try {
        // reply id is a request parameter 
        const { rid, newContent } = req.body;

        // ensure that the id is a valid id
        if (!mongoDB.ObjectId.isValid(rid)) {
            res.status(400).send('Invalid ID format');
            return;
        }

        const updatedReply = await replies.findOneAndUpdate(
            { _id: new ObjectId(rid) },
            { $set: { content: newContent } },
            { returnDocument: "after" }
        );

        res.json(updatedReply);
    } catch (err) {
        res.status(500).send(`Error when updating reply: ${err}`);
    }
});

// get all the folders in a course
app.get('/api/folders/:courseId', async (req, res) => {
    try {
        // course id is in the request body 
        const { courseId } = req.params;
        const fetchedFolders = await folders.find({ courseId }).toArray();
        res.status(200).json(fetchedFolders);
    } catch (err) {
        res.status(500).send(`Error when fetching folders: ${err}`);
    }
});

// get the names of all the folders in a course
app.get('/api/folders/names/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;
        const fetchedFolders = await folders.find({ courseId }).toArray();
        const names = fetchedFolders.map(folder => folder.name);
        res.status(200).json(names);
    } catch (err) {
        res.status(500).send(`Error when fetching folder names: ${err}`);
    }
});

// get all the posts in a course's folder
app.get('/api/folders/posts', async (req, res) => {
    try {
        const { folder, cid } = req.params;
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
        const { folder } = req.body; // TODO: change to params
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
});

app.put("/api/enrollments/:courseId", async (req, res) => {
    const currentUser = req.session.user;
    const { courseId } = req.params;
    const status = await enrollments.insertOne({ user: currentUser._id, course: courseId });
    res.send(status);
});

app.delete("/api/enrollments/:courseId", async (req, res) => {
    const currentUser = req.session.user;
    const { courseId } = req.params;
    const status = await enrollments.deleteOne({ user: currentUser._id, course: courseId });
    res.send(status);
});

// get student enrollment count for course 
app.get('/api/enrollments/countStudentEnrollments/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const studentCount = await enrollments.aggregate([
            {
                // join with users collection
                $lookup: {
                    from: 'users',
                    localField: 'user',     // field in enrollment
                    foreignField: '_id',    // field in user
                    as: 'userData'
                }
            },
            {
                // unwind joined userData array
                $unwind: '$userData'
            },
            {
                // filter by cid and role = STUDENT
                $match: {
                    course: cid,
                    'userData.role': 'STUDENT'
                }
            },
            {
                // count results 
                $count: 'studentCount'
            }
        ]).toArray();

        // mongo join queries return results in this weird array so need to extract the number
        res.json((studentCount[0]?.studentCount || 0).toString());
    } catch (err) {
        res.status(500).json({ error: 'Error fetching student enrollment count' });
    }
});

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