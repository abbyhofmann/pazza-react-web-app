interface InstructorAnswerProps {
    instructorAnswerId: string;
}

// Component for displaying an instructor answer to a post.
export default function InstructorAnswer(props: InstructorAnswerProps) {

    // const { instructorAnswerId } = props; 
    //
    // const { instructorAnswerId } = props;
    // const [instructorAnswer, setInstructorAnswer] = useState<String>(""); // TODO - update to Response datatype

    // useEffect(() => {
    //     /**
    //      * Function to fetch the instructor answer data based on the answer's ID.
    //      */
    //     const fetchData = async () => {
    //       try {
    //         const res = await getInstructorAnswerById(instructorAnswerId);
    //         setInstructorAnswer(res || null);
    //       } catch (error) {
    //         // eslint-disable-next-line no-console
    //         console.error('Error fetching instructor answer:', error);
    //       }
    //     };
    
    //     // eslint-disable-next-line no-console
    //     fetchData().catch(e => console.log(e));
    //   }, [instructorAnswerId]);

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
                            <div id="m7h0iykfwym12r_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">yes, you should have images on the dashboard page</div> { /* TODO - replace with field of fetched instructor answer */}
                        </div>
                    </div>
                </div>
            </div>
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-right col">
                        { /* we don't need last updated at, but we do need the timestamp and author of who answered it */}
                        <div className="update_text float-end" data-id="contributors">Answered on <time>March 1, 2015 at 2:32 pm</time> by <span data-id="contributors">Heet Manish Kanani</span> { /* TODO - replace with fields of fetched instructor answer */}
                        </div>
                    </div>
                </div>
            </footer>
        </article>
    )
}