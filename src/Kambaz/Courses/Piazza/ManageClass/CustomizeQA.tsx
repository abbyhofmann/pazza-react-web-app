export default function CustomizeQA() {
  return (
    <div id="customize_qa" className="d-flex flex-column gap-3">
      <hr style={{ border: "3px solid black" }} />

      {/* Header */}
      <div className="d-flex flex-column">
        <h2 className="fw-bold">Q&A Settings</h2>
        <hr />
        <p>Fine tune your class Q&A by enabling private or anonymous posts.</p>
      </div>
    </div>
  );
}