import './Classes.css';
export default function Classes() {
  const color = "blue";
  return (
    <div>
      <h2>Classes</h2>
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>
      <div style={{
        "backgroundColor": "lightyellow",
        "color": "black", padding: "10px"
      }}>
        Yellow background</div>
      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background    </div>
      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background     </div><hr />
    </div>
  )
};

