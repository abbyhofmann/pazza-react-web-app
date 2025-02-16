import { posts } from "../../Database";
import "./PostSidebar.css";

/**
 * Function for formatting the given date in dd/mm/yy format. This is used for formatting the date for
 * older posts and for comparing today's date with the date of a certain post.
 * @param inputDate ISODate string ("2025-02-16T01:00:00.000Z" format from mongodb).
 * @returns Date as a string in mm/dd/yy format.
 */
function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
}

/**
 * Function for calculating today's date.
 * @returns Today's date as a string in mm/dd/yy format.
 */
function getTodaysDate(): string {
    const today = new Date();
    const month = String(today.getUTCMonth() + 1).padStart(2, '0');
    const day = String(today.getUTCDate()).padStart(2, '0');
    const year = String(today.getUTCFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
}

/**
 * Function for calculating yesterday's date.
 * @returns Yesterday's date as a string in mm/dd/yy format.
 */
function getYesterdayDate(): string {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setUTCDate(today.getUTCDate() - 1);

    const month = String(yesterday.getUTCMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getUTCDate()).padStart(2, '0');
    const year = String(yesterday.getUTCFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
}

/**
 * Function for extracting the time (such as 8:45 AM or 9:27 PM) from a given ISO date.
 * @param dateString ISODate string ("2025-02-16T01:00:00.000Z" format from mongodb).
 * @returns Human-readable string of the time of the given date.
 */
function extractTime(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    return `${hours}:${minutes} ${ampm}`;
}

/**
 * Function for extracting the day of the week from a given ISO date.
 * @param dateString ISODate string ("2025-02-16T01:00:00.000Z" format from mongodb).
 * @returns The day of the week corresponding to the given date.
 */
function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return days[date.getUTCDay()];
}

/**
 * Function for producing a list of strings of the days this week (not including today or yesterday).
 * @returns List of strings in mm/dd/yy format.
 */
function getThisWeekDates(): string[] {
    const today = new Date();
    const days: string[] = [];

    for (let i = 2; i < 7; i++) {
        const dayThisWeek = new Date(today);
        dayThisWeek.setUTCDate(today.getUTCDate() - i);

        const month = String(dayThisWeek.getUTCMonth() + 1).padStart(2, '0');
        const day = String(dayThisWeek.getUTCDate()).padStart(2, '0');
        const year = String(dayThisWeek.getUTCFullYear()).slice(-2);

        days.push(`${month}/${day}/${year}`);
    }

    return days;
}

// The post feed accordian-style sidebar.
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
            <div id="feed_list_wrapper">
                <div id="feed_search_bar">
                    <button id="new_post_button" type="button">
                        New Post
                    </button>
                    <div id="search_bar" role="search">
                        <input type="text" placeholder="Search or add a post..." id="search-box" className="form-control" />
                    </div>
                </div>


                {/* Dropdown Section */}
                <div className="accordion" id="postAccordion">
                    <div className="card border-0">
                        {/* Today Dropdown Header */}
                        <div
                            className="mb-0 bucket-header gray-bar d-flex align-items-center px-3 py-2"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseToday"
                            aria-expanded="true"
                            aria-controls="collapseToday"
                        >
                            <span aria-hidden="true" className="me-1">▾</span>
                            <span>TODAY</span>
                        </div>

                        {/* Today Collapsible Content */}
                        <div id="collapseToday" className="collapse show">
                            <ul className="list-group list-group-flush">
                                {posts
                                    .filter((post) => formatDate(post.datePosted) === today)
                                    .map((post) => (
                                        <li className="list-group-item feed_item p-3" key={post._id}>
                                            <div className="d-flex justify-content-between">
                                                <strong>{post.instructor === 0 ? "Instr" : ""}</strong>
                                                <small>{post.title}</small>
                                                <small className="text-muted">{extractTime(post.datePosted)}</small> {/* TODO - will need to change the date format to include the time */}
                                            </div>
                                            <div className="text-muted small">{post.content}</div>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* Yesterday Dropdown Header */}
                        <div
                            className="mb-0 bucket-header gray-bar d-flex align-items-center px-3 py-2"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseYesterday"
                            aria-expanded="true"
                            aria-controls="collapseYesterday"
                        >
                            <span aria-hidden="true" className="me-1">▾</span>
                            <span>YESTERDAY</span>
                        </div>

                        {/* Yesterday Collapsible Content */}
                        <div id="collapseYesterday" className="collapse show">
                            <ul className="list-group list-group-flush">
                                {posts
                                    .filter((post) => formatDate(post.datePosted) === yesterday)
                                    .map((post) => (
                                        <li className="list-group-item feed_item p-3" key={post._id}>
                                            <div className="d-flex justify-content-between">
                                                <strong>{post.instructor === 0 ? "Instr" : ""}</strong>
                                                <small>{post.title}</small>
                                                <small className="text-muted">{extractTime(post.datePosted)}</small> {/* TODO - will need to change the date format to include the time */}
                                            </div>
                                            <div className="text-muted small">{post.content}</div>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* This Week Dropdown Header */}
                        <div
                            className="mb-0 bucket-header gray-bar d-flex align-items-center px-3 py-2"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThisWeek"
                            aria-expanded="true"
                            aria-controls="collapseThisWeek"
                        >
                            <span aria-hidden="true" className="me-1">▾</span>
                            <span>THIS WEEK</span>
                        </div>

                        {/* This Week Collapsible Content */}
                        <div id="collapseThisWeek" className="collapse show">
                            <ul className="list-group list-group-flush">
                                {posts
                                    .filter((post) => datesThisWeek.includes(formatDate(post.datePosted)))
                                    .map((post) => (
                                        <li className="list-group-item feed_item p-3" key={post._id}>
                                            <div className="d-flex justify-content-between">
                                                <strong>{post.instructor === 0 ? "Instr" : ""}</strong>
                                                <small>{post.title}</small>
                                                <small className="text-muted">{getDayOfWeek(post.datePosted)}</small>
                                            </div>
                                            <div className="text-muted small">{post.content}</div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}