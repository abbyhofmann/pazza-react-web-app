export default function CustomizeCoursePage() {
  return (
    <div id="customize_course_page" className="d-flex flex-column gap-3">
      <hr style={{ border: "3px solid black" }} />

      {/* Header */}
      <div className="d-flex flex-column">
        <h2 className="fw-bold">Course Page Settings</h2>
        <hr />
        <p>Decide how many resources to display within a section at a time.</p>

        <p>Control access to the sections of your course page by selecting which will be public.</p>
      </div>
    </div>
  );
}