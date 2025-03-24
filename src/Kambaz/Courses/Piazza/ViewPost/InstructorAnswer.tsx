import { useEffect, useState } from "react";
import { Answer, User } from "../../../types";
import { getAnswerById } from "../services/answerService";
import { getUser } from "../services/userService";

interface InstructorAnswerProps {
    instructorAnswerId: string;
}

// Component for displaying an instructor answer to a post.
export default function InstructorAnswer(props: InstructorAnswerProps) {

    const { instructorAnswerId } = props;

    const [instructorAnswer, setInstructorAnswer] = useState<Answer | null>(null); // TODO - update to Response datatype

    const [authors, setAuthors] = useState<User[]>([]);

    useEffect(() => {
        /**
         * Function to fetch the instructor answer data based on the answer's ID.
         */
        const fetchData = async () => {
            try {
                const res = await getAnswerById(instructorAnswerId);
                console.log('instr ans res: ', res, " prop: ", instructorAnswer);
                setInstructorAnswer(res || null);
                const fetchedAuthors: User[] = [];
                await Promise.all(
                    res.authors.map(async authorId => {
                        const fetchedAuthor = await getUser(authorId);
                        console.log('fetched instr post author: ', fetchedAuthor);

                        if (fetchedAuthor._id !== undefined) {
                            fetchedAuthors.push(fetchedAuthor);
                        }
                    }));

                console.log('fetched instr post authors: ', fetchedAuthors);

                setAuthors(fetchedAuthors);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching instructor answer:', error);
            }
        };

        // eslint-disable-next-line no-console
        fetchData().catch(e => console.log(e));
    }, [instructorAnswerId]);

    // formats the date for the answer component 
    function formatAnswerDate(dateString: string): string {
        const date = new Date(dateString);

        return `${date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;

    }

    // TODO - fill in with instructor answer data from the post itself
    return (
        <article data-id="i_answer" className="answer" aria-label="Instructor Answer">
            <header className="border-bottom container-fluid">
                <div className="row">
                    <div className="text-left pl-0 col">
                        <h2>the instructors' answer, </h2>
                        <span className="post_type_snippet">where instructors collectively construct a single answer</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="g-0 row">
                    <div className="col">
                        <div className="py-3 history-selection">
                            {/* content of the answer */}
                            <div id="m7h0iykfwym12r_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">{instructorAnswer?.content}</div> { /* TODO - replace with field of fetched instructor answer */}
                        </div>
                    </div>
                </div>
            </div>
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-right col">
                        { /* we don't need last updated at, but we do need the timestamp and author of who answered it */}
                        <div className="update_text float-end" data-id="contributors">Answered on <time>{instructorAnswer?.dateEdited ? formatAnswerDate(instructorAnswer?.dateEdited) : ""}</time> by <span data-id="contributors">{authors[0]?.firstName} {authors[0]?.lastName}</span> { /* TODO - format for when there are multiple authors/editors */}
                        </div>
                    </div>
                </div>
            </footer>
        </article>
    )
}