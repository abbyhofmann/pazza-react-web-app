import { useEffect, useState } from "react";
import { getPostsCount, getUnreadPostsCount } from "./services/postService";
import { useParams } from "react-router";
import { getResponseCounts } from "./services/answerService";
import { getStudentEnrollmentsCount } from "./services/enrollmentService";

export default function RightSidePage() {

  const { cid } = useParams();

  const [unreadPostCount, setUnreadPostCount] = useState<Number>(0);
  const [totalPostsCount, setTotalPostsCount] = useState<Number>(0);
  const [studentResponseCount, setStudentResponseCount] = useState<Number>(0);
  const [instructorResponseCount, setInstructorResponseCount] = useState<Number>(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState<Number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUnreadCount = await getUnreadPostsCount(cid!);
        if (fetchedUnreadCount) {
          setUnreadPostCount(fetchedUnreadCount);
        }

        const fetchedTotalCount = await getPostsCount(cid!);
        if (fetchedTotalCount) {
          setTotalPostsCount(fetchedTotalCount);
        }

        const fetchedResponseCounts = await getResponseCounts(cid!);
        if (fetchedResponseCounts) {
          setStudentResponseCount(fetchedResponseCounts[0]);
          setInstructorResponseCount(fetchedResponseCounts[1]);
        }

        const fetchedEnrollmentCount = await getStudentEnrollmentsCount(cid!);
        if (fetchedEnrollmentCount) {
          setEnrollmentsCount(fetchedEnrollmentCount);
        }
      }
      catch (error) {
        console.error('Error fetching class at a glance data:', error);
      }
    };

    fetchData().catch(e => console.log(e));

  }, [])

  return (

    <div className="wd-right-page-bg">
      <div id="wd-class-stats" className="wd-text-grey wd-font-family fs-3 wd-padding-left-class" style={{ fontWeight: 500 }}>
        Class at a Glance
      </div>
      <div className="wd-class-glance">

        <div className="wd-post-stats wd-bold" style={{ paddingLeft: '13px' }}>
          <img src="/images/checkmark.jpg" height={25} />
          <span>{totalPostsCount.toString()} total posts</span>
        </div>

        <div className="wd-post-stats wd-bold">
          <img src="/images/warning5.jpg" height={30} />
          <span> {unreadPostCount.toString()} unread posts</span>
        </div>

        <div className="wd-post-stats wd-bold" style={{ paddingLeft: '13px' }}>
          <img src="/images/checkmark.jpg" height={25} />
          <span>{studentResponseCount.toString()} student responses</span>
        </div>

        <div className="wd-post-stats wd-bold" style={{ paddingLeft: '13px' }}>
          <img src="/images/checkmark.jpg" height={25} />
          <span>{instructorResponseCount.toString()} instructor responses</span>
        </div>

        <div className="wd-post-stats wd-bold" style={{ paddingLeft: '13px' }}>
          <img src="/images/checkmark.jpg" height={25} />
          <span>{enrollmentsCount.toString()} students enrolled</span>
        </div>

        <div className="wd-post-stats wd-bold">
          <img src="/images/warning5.jpg" height={30} />
          <span>_ unanswered followups</span>
        </div>
      </div>
    </div>

  );
}