import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

type RightSidePageProps = {
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RightSidePage({ isFullScreen, setIsFullScreen }: RightSidePageProps) {

  const handleFullScreenToggle = () => {
    setIsFullScreen(prev => !prev);
  };

  return (


    <div className={`wd-right-page-bg ${isFullScreen ? 'fullscreen-content' : ''}`}
      style={{
        width: "100%",
        transition: 'all 0.3 ease', 
      }}
    >
 <div id="carrot_bar" className={`${isFullScreen ? 'fullscreen-header' : ''}`}>
    <button id="carrot_button" type="button" onClick={handleFullScreenToggle}>
      {isFullScreen ?  (
          <FaCaretRight className="ms-1 mb-1 fs-5" />
      ) : (
        ""
      )}
        </button>
      
      <div id="wd-class-stats" className="wd-text-grey wd-font-family fs-3 wd-padding-left-class" 
      style={{ fontWeight: 500 }}>
        Class at a Glance
      </div>
      <div className="wd-class-glance">
        <div className="wd-post-stats wd-bold">
          <img src="/images/warning5.jpg" height={30} />
          <span>_ unread posts</span>
        </div>

        <div className="wd-post-stats wd-bold" style={{ paddingLeft: '13px' }}>
          <img src="/images/checkmark.jpg" height={25} />
          <span>_ unanswered followups</span>
        </div>

        <div className="wd-post-stats wd-bold">
          <img src="/images/warning5.jpg" height={30} />
          <span>_ unanswered followups</span>
        </div>
      </div>
    </div>
</div>
  );
}