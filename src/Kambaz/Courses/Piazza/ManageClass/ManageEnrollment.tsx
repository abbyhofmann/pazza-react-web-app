export default function ManageEnrollment() {
  return (
    <div id="manage_enrollment" className="d-flex flex-column gap-3">
      <hr style={{ border: "3px solid black" }} />

      {/* Header */}
      <div className="d-flex flex-column">
        <h2 className="fw-bold">Enroll Professors/TAs</h2>
        <hr />
        <p>Make sure all instructors are enrolled in the course. The more folks you have responding to student questions, the better!</p>
      </div>
    </div>
  );
}