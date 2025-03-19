import { useState } from "react";
import usePostSidebar from "../../hooks/usePostSidebar";

interface FollowupReplyProps {
    replyId: string;
}

export default function FollowupReply(props: FollowupReplyProps) {

    const { replyId } = props;

    const { formatDate } = usePostSidebar();

    const [reply, setReply] = useState<{ "id": string, "fuqId": string, "author": string, "datePosted": string, "content": string }>({ "id": replyId, "fuqId": "1234", "author": "Miazi", "datePosted": "2025-02-16T01:00:00.000Z", "content": "replyyyyyyy" }); // TODO - update to Reply datatype

    // useEffect(() => {
    //     /**
    //      * Function to fetch the reply data based on the reply's ID.
    //      */
    //     const fetchData = async () => {
    //       try {
    //         const res = await getFollowupReplyById(replyId);
    //         setReply(res || null);
    //       } catch (error) {
    //         // eslint-disable-next-line no-console
    //         console.error('Error fetching reply:', error);
    //       }
    //     };

    //     // eslint-disable-next-line no-console
    //     fetchData().catch(e => console.log(e));
    //   }, [replyId]);

    return (
        <div
            data-id="followup_reply_idx1_0"
            id="m7mvuzhntd4fj"
            className="followup_reply gx-1 gy-0 row"
        >
            <div className="mx-0 col-auto">
                <div className="avatar" aria-hidden="true"></div>
            </div>
            <div className="col">
                <b>
                    <span className="instructor-label-icon"></span>
                    <span data-id="contributors">{reply.author} </span>
                </b>
                <span className="helper-text">
                    <time
                        dateTime="2025-02-27T05:07:36.000Z"
                        title="Thu Feb 27 2025 00:07:36 GMT-0500 (Eastern Standard Time)"
                    >
                        {/* TODO - is the MM/DD/YYYY the format we want here? */}
                        {formatDate(reply.datePosted)}
                    </time>
                </span>
                <div
                    id="m7mvuzhntd4fj_render"
                    data-id="renderHtmlId"
                    className="render-html-content overflow-hidden latex_process"
                >
                    {reply.content}
                </div>
            </div>
        </div>
    )
}