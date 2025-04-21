import { useEffect, useState } from "react";
import { getPostsCount, getUnansweredPostsCount } from "./services/postService";
import { useParams } from "react-router";
import { getResponseCounts } from "./services/answerService";
import { getStudentEnrollmentsCount } from "./services/enrollmentService";


export default function RightSidePage() {
  const [isFullScreen, setFullScreen] = useState(false);
  const handleFullScreenToggle = () => {
    setFullScreen(prev => !prev);
  };

  const { cid } = useParams();

  const [unansweredPostCount, setUnansweredPostCount] = useState<Number>(0);
  const [totalPostsCount, setTotalPostsCount] = useState<Number>(0);
  const [studentResponseCount, setStudentResponseCount] = useState<Number>(0);
  const [instructorResponseCount, setInstructorResponseCount] = useState<Number>(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState<Number>(0);
  const [unreadPostCount, setUnreadPostCount] = useState<Number>(0);

  // todo - remove log after implementation.. this is just to pass the build
  console.log(setUnreadPostCount);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUnansweredCount = await getUnansweredPostsCount(cid!);
        if (fetchedUnansweredCount) {
          setUnansweredPostCount(fetchedUnansweredCount);
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

        // TODO - uncomment and use uid of logged-in user 
        // const fetchedUnreadCount = await getUnreadPostsCount(cid!, uid!);
        // if (fetchedUnreadCount) {
        //   setUnreadPostCount(fetchedEnrollmentCount);
        // }
      }
      catch (error) {
        console.error('Error fetching class at a glance data:', error);
      }
    };

    fetchData().catch(e => console.log(e));

  }, [])


  return (

    <div className={`wd-right-page-bg ${isFullScreen ? 'fullscreen-content' : ''}`}
      style={{
        width: isFullScreen ? '100%' : '100vw',
        height: isFullScreen ? '100%' : 'auto',
        transition: 'all 0.3 ease',
      }}
    >
      <div id="wd-class-stats" className="wd-text-grey wd-font-family fs-3 wd-padding-left-class"
        style={{ fontWeight: 500 }}>
        Class at a Glance
      </div>
      <div className="wd-class-glance">

        <div className="wd-post-stats wd-bold" style={{ paddingLeft: '13px' }}>
          <img src="/images/checkmark.jpg" height={25} />
          <span>{totalPostsCount.toString()} total posts</span>
        </div>

        <div className="wd-post-stats wd-bold">
          <img src="/images/warning5.jpg" height={30} />
          <span> {unansweredPostCount.toString()} unanswered posts</span>
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
      </div>
    </div>
  );
}