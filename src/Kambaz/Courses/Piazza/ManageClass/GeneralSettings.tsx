export default function GeneralSettings() {
  return (
    <div id="general_settings" className="d-flex flex-column gap-3">
      <hr style={{ border: "3px solid black" }} />

      {/* Header */}
      <div className="d-flex flex-column">
        <h2 className="fw-bold">General Settings</h2>
        <hr />
        <p>Edit your course number & name.</p>

        <p>Access your course signup & direct links.</p>

        <p>Control whether instructors can enroll themselves in the course.</p>

        <p>Need to pause the course for a take-home exam? Make the class inactive.</p>
      </div>
    </div>
  );
}