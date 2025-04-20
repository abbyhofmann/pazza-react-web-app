
import React, { useEffect, useState } from "react";
import { Col, Form, FormCheck, FormGroup, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./../../styles.css";
import { getFolders } from "./services/folderService";
import { Folder } from "../../types";
import { createPost } from "./services/postService";
import { Post, User } from "../../types";
import { usePostSidebarContext } from "./hooks/usePostSidebarContext";
import InstructorDropdown from "./InstructorsDropdown";

export default function NewPostPage() {
   const [selectedOption, setSelectedOption] = useState<string>('');
   const [selectedPostTo, setSelectedPostTo] = useState<string>('');
   const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
   const [editorValue, setEditorValue] = useState("");
   const [courseFolders, setCourseFolders] = useState<Folder[]>([]);

   // keep track of which instructors are selected to see a new post
   const [usersCanViewPost, setUsersCanViewPost] = useState<User[]>([]);

   // if the "instructors" button is selected in the post to of a new post, show the dropdown selection component
   const [instructorButtonSelected, setInstructorButtonSelected] = useState<boolean>(false);

   const navigate = useNavigate();
   const { cid } = useParams();

   useEffect(() => {
      const fetchFoldersInCourse = async () => {
         setCourseFolders(await getFolders(cid ?? ""));
      };
      fetchFoldersInCourse();
   }, [cid]);

   const [postSummary, setPostSummary] = useState("");

   const { fetchPosts } = usePostSidebarContext();

   const DeleteButton = () => {
      navigate(`/Kambaz/Courses/${cid}/Piazza/`);
   }

   const handleChangePostType = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
   };

   const handleChangePostTo = (event: React.ChangeEvent<HTMLInputElement>) => {
      // if instructors option is selected, show the dropdown for selecting the instructors 
      if (event.target.value === 'instructor') {
         setSelectedPostTo(event.target.value);
         setInstructorButtonSelected(true);
      }
      else {
         // if everyone is selected, we don't want selected instructors to only view post
         setInstructorButtonSelected(false);
         setUsersCanViewPost([]);
         setSelectedPostTo(event.target.value);
      }
   };


   const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostSummary(e.target.value);
   };

   const handleDetailsChange = (value: string) => {
      setEditorValue(value);
   };

   const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;

      if (checked) {
         setSelectedFolders((prev) => [...prev, value]);
      }
      else {
         setSelectedFolders((prev) => prev.filter((folder) => folder !== value));
      }
   };

   const postButton = async () => {
      if (!selectedOption) {
         alert("Please choose a post type: Question/Note");
         return;
      }
      if (!selectedPostTo) {
         alert("Please choose post destination: Everyone/Instructor(s)");
         return;
      }
      if (selectedFolders.length === 0) {
         alert("Please choose a folder(s)");
         return;
      }
      if (!postSummary) {
         alert("Please put a summary for your post");
         return;
      }
      if (!editorValue) {
         alert("Can't submit a post with no details");
         return;
      }

      if (cid) {
         const newPost: Post = {
            folders: selectedFolders,
            authorId: 'user123', // TODO: update to be logged in user
            datePosted: new Date().toDateString(),
            type: selectedOption === 'question' ? 0 : 1, // 0 for question, 1 for note
            instructor: false, // TODO: need to determine if author is an instructor (i.e. logged in user is instructor)
            title: postSummary,
            content: editorValue,
            followupDiscussions: [],
            studentAnswer: null,
            instructorAnswer: null,
            viewers: [],
            courseId: cid,
         };

         try {
            const newPostFromDb = await createPost(newPost);

            if (newPostFromDb && newPostFromDb._id) {
               navigate(`/Kambaz/Courses/${cid}/Piazza`);
               await fetchPosts();
            }
            else {
               console.error("Failed to Post");
            }
         } catch (error) {
            console.error("Error creating post: ", error);
         }
      }
   };

   return (

      <div id="wd-new-post" className="new-post-content">

         <div className="">
            <div>
               <div id="wd-class-stats" className="d-flex wd-text-grey wd-font-bold"
                  style={{ fontSize: "14px", flex: '0 0 20%', paddingLeft: "20px" }}>
                  Post Type*
                  <div id="">
                     <div className="">
                        <div className="d-flex" style={{ flex: '1' }}>
                           <Form>
                              <Form.Group className="mb-3">
                                 <div>
                                    <Form.Check
                                       type="radio"
                                       label={
                                          <div
                                             className={selectedOption === 'question' ? 'wd-highlight-border' : 'wd-border-none'}
                                             style={{
                                                fontSize: "12px",
                                                color: "gray"
                                             }}
                                          >
                                             <span className="wd-font-bold wd-dark-grey">Question</span>
                                             <div style={{ fontSize: "12px", color: '#333333' }}>
                                                if you need an answer
                                             </div>
                                          </div>
                                       }
                                       value="question"
                                       checked={selectedOption === 'question'}
                                       onChange={handleChangePostType}
                                       className="me-3"
                                    />
                                    <Form.Check
                                       type="radio"
                                       label={
                                          <div
                                             className={selectedOption === 'note' ? 'wd-highlight-border' : 'wd-border-none'}
                                             style={{
                                                fontSize: "12px",
                                                color: "gray"
                                             }}
                                          >
                                             <span className="wd-font-bold wd-dark-grey">Note</span>
                                             <div style={{ fontSize: "12px", color: '#333333' }}>
                                                if you
                                                <span className="wd-font-bold"> don't </span>
                                                need an answer
                                             </div>
                                          </div>
                                       }
                                       value="note"
                                       checked={selectedOption === 'note'}
                                       onChange={handleChangePostType}
                                       className="me-3 mt-3"
                                    />
                                 </div>
                              </Form.Group>
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>


               <div id="wd-new-post2" className="">
                  <div className="wd-post-to">
                     <div className="d-flex">
                        <div id="wd-class-stats" className="d-flex wd-text-grey wd-font-bold"
                           style={{ fontSize: "14px" }}>

                           Post To*
                        </div>


                        <div className="mt-1 d-flex ms-3">
                           <Form>
                              <Form.Group className="mb-3">
                                 <div className="d-flex align-items-center">
                                    <Form.Check
                                       type="radio"
                                       label={
                                          <div
                                             style={{
                                                fontSize: "12px",
                                                color: "gray"
                                             }}
                                          >
                                             <span className=" wd-dark-grey">Everyone</span>
                                          </div>
                                       }
                                       value="everyone"
                                       checked={selectedPostTo === 'everyone'}
                                       onChange={handleChangePostTo}
                                       className="me-3"
                                    />

                                    <Form.Check
                                       type="radio"
                                       label={
                                          <div
                                             style={{
                                                fontSize: "12px",
                                                color: "gray"
                                             }}
                                          >
                                             <span className="wd-dark-grey">Instructor(s)</span>
                                          </div>
                                       }
                                       value="instructor"
                                       checked={selectedPostTo === 'instructor'}
                                       onChange={handleChangePostTo}
                                       className="me-3"
                                    />
                                    {instructorButtonSelected && <InstructorDropdown selectedInstructors={usersCanViewPost} setSelectedInstructors={setUsersCanViewPost} />}
                                 </div>
                              </Form.Group>
                           </Form>
                        </div>
                     </div>


                     <div className="d-flex mt-3">
                        <div id="wd-class-stats" className="d-flex wd-text-grey wd-font-bold"
                           style={{ fontSize: "14px" }}>

                           Select <br />Folder(s)*
                        </div>

                        <div>
                           <Form>
                              <FormGroup className="mb-3">
                                 <div className="wd-checkbox-custom">
                                    {courseFolders.map((folder) => (
                                       <FormCheck
                                          key={folder._id}
                                          id={folder._id}
                                          type="checkbox"
                                          label={folder.name}
                                          value={folder.name}
                                          checked={selectedFolders.includes(folder.name)}
                                          onChange={handleFolderChange}
                                       />
                                    ))}
                                 </div>
                              </FormGroup>
                           </Form>
                        </div>
                     </div>


                     <Form>
                        <Form.Group as={Row} className="mb-4 d-flex align-items-center">
                           <Col sm={2}>
                              <div id="wd-class-stats" className="d-flex wd-text-grey wd-font-bold"
                                 style={{ fontSize: "14px" }}>

                                 Summary*
                              </div>
                           </Col>
                           <Col sm={9}>
                              <Form.Control id="wd-name" type="text"
                                 placeholder="Enter a one line summary here, 100 characters or less"
                                 style={{ fontSize: "13px" }}
                                 value={postSummary}
                                 onChange={handleSummaryChange}
                              />
                           </Col>
                        </Form.Group>
                     </Form>

                     <Form>
                        <Form.Group as={Row} className="mb-3 d-flex ">
                           <Col sm={2}>
                              <div id="wd-class-stats" className="d-flex wd-text-grey wd-font-bold"
                                 style={{ fontSize: "14px" }}>

                                 Details*
                              </div>
                           </Col>
                           <Col sm={9}>
                              <ReactQuill
                                 theme="snow"
                                 className="custom-editor"
                                 value={editorValue}
                                 onChange={handleDetailsChange}
                              />
                           </Col>
                        </Form.Group>
                     </Form>


                     <div id="wd-class-stats" className="mt-5 wd-text-grey wd-font-bold"
                        style={{ fontSize: "14px" }}>

                        <span className="wd-rotated-asterick">*</span>Required fields

                     </div>

                     <div className="d-flex">
                        <div className="d-flex">
                           <button className="wd-new-post-button wd-new-post-padding mt-3"
                              onClick={postButton}>
                              Post My{" "}
                              {selectedOption
                                 ?
                                 selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)
                                 : "Question"}{" "}

                              to CS4550-02! </button>
                        </div>

                        <div className="d-flex">
                           <button className="wd-cancel-button wd-new-post-padding mt-3 ms-3"
                              onClick={DeleteButton}>
                              Cancel </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

   );
}