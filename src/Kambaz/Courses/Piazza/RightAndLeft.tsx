
import RightSidePage from './RightSidePage';

const CombinedPage = () => {
  return (
    <div className="d-flex align-items-start p-0 m-0">

      <div className="d-flex p-0 m-0" style={{width: "100%"}}>
        <RightSidePage isFullScreen={false} setIsFullScreen={function (): void {
          throw new Error('Function not implemented.');
        } }/>
      </div>
      </div>
  );
};

export default CombinedPage;
