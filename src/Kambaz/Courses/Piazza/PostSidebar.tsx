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


export default function PostSidebar() {
    var today = getTodaysDate();

    return (
        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{ width: "380px" }}>
            <a className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                <span className="fs-5 fw-semibold">List group</span>
            </a>
            <div id="accordion">
                <div className="card">
                    <div data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="mb-0 bucket-header gray-bar">
                        TODAY
                    </div>

                    <div id="collapseOne" className="collapse show">
                        <ul className="wd-lessons list-group rounded-0">
                            {posts
                                .filter((post) => formatDate(post.datePosted) === today)
                                .map((post: any) => (
                                        <li className="list-group-item py-3 lh-sm" aria-current="true">
                                            <div className="d-flex w-100 align-items-center justify-content-between">
                                                <strong className="mb-1">{post.instructor == 0 ? "Instr" : ""}</strong>
                                                <small className="mb-1">{post.title}</small>
                                                <small>{formatDate(post.datePosted)}</small> {/* TODO - will need to change the date format to include the time */}
                                            </div>
                                            <div className="col-10 mb-1 small">{post.content}</div>
                                        </li>
                                ))}
                        </ul>
                        <div className="list-group list-group-flush border-bottom scrollarea">


                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="list-group list-group-flush border-bottom scrollarea">
                <a className="list-group-item list-group-item-action active py-3 lh-sm" aria-current="true">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small>Wed</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Tues</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Mon</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>

                <a className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Wed</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Tues</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Mon</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Wed</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Tues</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Mon</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Wed</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Tues</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
                <a className="list-group-item list-group-item-action py-3 lh-sm">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        <strong className="mb-1">List group item heading</strong>
                        <small className="text-muted">Mon</small>
                    </div>
                    <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
            </div> */}
        </div>
    )
}