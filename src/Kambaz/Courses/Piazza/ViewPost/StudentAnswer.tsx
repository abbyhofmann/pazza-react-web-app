import { useEffect, useState } from "react";

interface StudentAnswerProps {
    studentAnswerId: string;
}

// Component for displaying a student answer to a post.
export default function StudentAnswer(props: StudentAnswerProps) {
    
    // const { studentAnswerId } = props;
    // const [studentAnswer, setStudentAnswer] = useState<String>(""); // TODO - update to Response datatype

    // useEffect(() => {
    //     /**
    //      * Function to fetch the student answer data based on the answer's ID.
    //      */
    //     const fetchData = async () => {
    //       try {
    //         const res = await getStudentAnswerById(studentAnswerId);
    //         setStudentAnswer(res || null);
    //       } catch (error) {
    //         // eslint-disable-next-line no-console
    //         console.error('Error fetching student answer:', error);
    //       }
    //     };
    
    //     // eslint-disable-next-line no-console
    //     fetchData().catch(e => console.log(e));
    //   }, [studentAnswerId]);

    return (
        <article data-id="sa_answer" className="answer" aria-label="Student Answer">
            <header className="border-bottom container-fluid">
                <div className="row">
                    <div className="text-left pl-0 col">
                        <h2>the students' answer, </h2>
                        <span className="post_type_snippet">where students collectively construct a single answer</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="g-0 row">
                    <div className="col">
                        <div className="py-3 history-selection">
                            <div id="m7h0iykfwym12r_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">here is a sample student answer</div> { /* TODO - replace hard-coded content with studentAnswer.content */}
                        </div>
                    </div>
                </div>
            </div>
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-left align-self-center m-1 col-auto">
                        {/* edit button */}
                        <button data-id="edit_button" type="button" className="mr-2 btn btn-primary btn-sm">Edit</button> { /* TODO - edit should only available to creator of post and instructors */}
                    </div>
                    <div className="text-right col">
                        { /* we don't need last updated at, but we do need the timestamp and author of who answered it */}
                        <div className="update_text float-end" data-id="contributors">Answered on <time>February 28, 2025 at 8:11 am</time> by <span data-id="contributors">Abby Hofmann</span> { /* TODO - replace hard-coded content with studentAnswer.authors and studentAnswer.dateEdited */}
                        </div>
                    </div>
                </div>
            </footer>
        </article>
    )
}