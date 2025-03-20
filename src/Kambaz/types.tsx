import { ObjectId } from "mongodb";

export interface Post {
    _id?: ObjectId;
    folderId: Folder;
    authorId: User;
    datePosted: Date;
    type: number;
    instructor: boolean;
    title: string;
    content: string;
    followupDiscussions: FollowupDiscussion[];
    studentAnswer: Answer;
    instructorAnswer: Answer;
    viewers: User[];
    courseId: Course;
}

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    profilePhoto: string; // TODO - idk about this 
    type: number; // TODO - do we want to do 0 for student, 1 for instructor, or something else? 
}

export interface Course {
    _id?: ObjectId;
    name: string;
    term: string;
    number: string; // TODO - is this what we want?
    students: User[];
    instructors: User[];
    folders: Folder[];
}

export interface Folder {
    _id?: ObjectId;
    name: string;
    courseId: Course;
    posts: Post[];
}

export interface FollowupDiscussion {
    _id?: ObjectId;
    postId: Post;
    authorId: User;
    datePosted: Date;
    content: string;
    replies: Reply[];
}

export interface Answer {
    _id?: ObjectId;
    type: number; // TODO - is this what we want? currently using it as 0 for question and 1 for note 
    authors: User[];
    content: string;
    dateEdited: Date;
}

export interface Reply {
    _id?: ObjectId;
    followupDiscussionId: FollowupDiscussion;
    authorId: User;
    datePosted: Date;
    content: string;
}
