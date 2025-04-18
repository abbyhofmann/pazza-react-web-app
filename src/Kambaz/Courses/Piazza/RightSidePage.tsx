import { useState } from "react";

export default function RightSidePage() {
  const [isFullScreen, setFullScreen] = useState(false);

  const handleFullScreenToggle = () => {
    setFullScreen(prev => !prev);
  };

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

  );
}