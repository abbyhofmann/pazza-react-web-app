export interface Post {
    _id?: string; // MongoDB ObjectId stored as a string
    folderId: string;
    authorId: string;
    datePosted: string;
    type: number;
    instructor: boolean;
    title: string;
    content: string;
    followupDiscussions: string[];
    studentAnswer: string | null;
    instructorAnswer: string | null;
    viewers: string[];
    courseId: string;
}

export interface User {
    _id?: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

export interface Course {
    _id?: string;
    name: string;
    term: string;
    number: string;
    students: string[];
    instructors: string[];
    folders: string[];
}

export interface Folder {
    _id?: string;
    name: string;
    courseId: string;
    posts: string[];
}

export interface FollowupDiscussion {
    _id?: string;
    postId: string;
    authorId: string;
    datePosted: string;
    content: string;
    replies: string[];
    resolved: boolean;
}

export interface Answer {
    _id?: string;
    postId: string;
    type: number; // 0 = student, 1 = instructor
    authors: string[];
    content: string;
    dateEdited: string;
}

export interface Reply {
    _id?: string;
    followupDiscussionId: string;
    authorId: string;
    datePosted: string;
    content: string;
}
