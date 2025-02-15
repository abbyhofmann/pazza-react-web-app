import { posts } from "../../Database";
import "./PostSidebar.css";

/**
 * Function for formatting the given date in dd/mm/yy format.
 * @returns Date as a string.
 */
function formatDate(inputDate: string): string {
    const [year, month, day] = inputDate.split("-");
    return `${month}/${day}/${year.slice(-2)}`;
}

function getTodaysDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year

    return `${month}/${day}/${year}`;
}

function getYesterdayDate(): string {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(today.getDate() - 1);

    const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(yesterday.getDate()).padStart(2, '0');
    const year = String(yesterday.getFullYear()).slice(-2); // Get last two digits of the year

    return `${month}/${day}/${year}`;
}

// produces a list of strings of the days this week not including today or yesterday 
function getThisWeekDates(): string[] {
    const today = new Date();
    const dayThisWeek = new Date(today);
    const days: string[] = [];

    for (let i = 2; i < 7; i++) {

        dayThisWeek.setDate(today.getDate() - i);

        const month = String(dayThisWeek.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(dayThisWeek.getDate()).padStart(2, '0');
        const year = String(dayThisWeek.getFullYear()).slice(-2); // Get last two digits of the year

        days.push(`${month}/${day}/${year}`);
    }

    return days;
}


export default function PostSidebar() {
    var today = getTodaysDate();
    var yesterday = getYesterdayDate();
    var datesThisWeek = getThisWeekDates();

    return (
        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white border-end" style={{ width: "380px" }}>
            {/* Sidebar Header */}
            <a className="d-flex align-items-center p-3 link-dark text-decoration-none border-bottom">
                <span className="fs-5 fw-semibold">Posts</span>
            </a>

            {/* Dropdown Section */}
            <div className="accordion" id="postAccordion">
                <div className="card border-0">
                    {/* Today Dropdown Header */}
                    <div
                        className="mb-0 bucket-header gray-bar d-flex justify-content-between align-items-center px-3 py-2"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseToday"
                        aria-expanded="true"
                        aria-controls="collapseToday"
                    >
                        <span>TODAY</span>
                    </div>

                    {/* Today Collapsible Content */}
                    <div id="collapseToday" className="collapse show" data-bs-parent="#postAccordion">
                        <ul className="list-group list-group-flush">
                            {posts
                                .filter((post) => formatDate(post.datePosted) === today)
                                .map((post) => (
                                    <li className="list-group-item feed_item p-3" key={post._id}>
                                        <div className="d-flex justify-content-between">
                                            <strong>{post.instructor === 0 ? "Instr" : ""}</strong>
                                            <small>{post.title}</small>
                                            <small className="text-muted">{formatDate(post.datePosted)}</small> {/* TODO - will need to change the date format to include the time */}
                                        </div>
                                        <div className="text-muted small">{post.content}</div>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Yesterday Dropdown Header */}
                    <div
                        className="mb-0 bucket-header gray-bar d-flex justify-content-between align-items-center px-3 py-2"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseYesterday"
                        aria-expanded="true"
                        aria-controls="collapseYesterday"
                    >
                        <span>YESTERDAY</span>
                    </div>

                    {/* Yesterday Collapsible Content */}
                    <div id="collapseYesterday" className="collapse show" data-bs-parent="#postAccordion">
                        <ul className="list-group list-group-flush">
                            {posts
                                .filter((post) => formatDate(post.datePosted) === yesterday)
                                .map((post) => (
                                    <li className="list-group-item feed_item p-3" key={post._id}>
                                        <div className="d-flex justify-content-between">
                                            <strong>{post.instructor === 0 ? "Instr" : ""}</strong>
                                            <small>{post.title}</small>
                                            <small className="text-muted">{formatDate(post.datePosted)}</small> {/* TODO - will need to change the date format to include the time */}
                                        </div>
                                        <div className="text-muted small">{post.content}</div>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* This Week Dropdown Header */}
                    <div
                        className="mb-0 bucket-header gray-bar d-flex justify-content-between align-items-center px-3 py-2"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThisWeek"
                        aria-expanded="true"
                        aria-controls="collapseThisWeek"
                    >
                        <span>THIS WEEK</span>
                    </div>

                    {/* This Week Collapsible Content */}
                    <div id="collapseThisWeek" className="collapse show" data-bs-parent="#postAccordion">
                        <ul className="list-group list-group-flush">
                            {posts
                                .filter((post) => datesThisWeek.includes(formatDate(post.datePosted)))
                                .map((post) => (
                                    <li className="list-group-item feed_item p-3" key={post._id}>
                                        <div className="d-flex justify-content-between">
                                            <strong>{post.instructor === 0 ? "Instr" : ""}</strong>
                                            <small>{post.title}</small>
                                            <small className="text-muted">{formatDate(post.datePosted)}</small> {/* TODO - will need to change the date format to include the time */}
                                        </div>
                                        <div className="text-muted small">{post.content}</div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}