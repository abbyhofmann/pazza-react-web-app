export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        {/* Points */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        < br />
        <tr>
          {/* Assignment Group */}
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="QUIZZES">Quizzes</option>
            </select>
          </td>
        </tr>
        < br />
        <tr>
          {/* Display Grade as */}
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="QUIZZES">Quizzes</option>
            </select>
          </td>
        </tr>
        < br />
        <tr>
          {/* Submission Type */}
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ASSIGNMENTS">Online</option>
              <option value="QUIZZES">Paper</option>
            </select>
          </td>
        </tr>
        < br />
        <tr>
          {/* Online Entry Options */}
          <td />
          <td>
            <label htmlFor="wd-text-entry">Online Entry Options</label>
            <br />
            <input type="checkbox" name="entry-options" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label><br />
            <input type="checkbox" name="entry-options" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label><br />
            <input type="checkbox" name="entry-options" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
            <input type="checkbox" name="entry-options" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
            <input type="checkbox" name="entry-options" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label><br />
          </td>
        </tr>
        < br />
        <tr>
          {/* Assign To */}
          <td align="right" valign="top">
            <label>Assign</label>
          </td>
          <td>
            {/* Assign To */}
            <label htmlFor="wd-assign-to">Assign to</label>
            <br />
            <input id="wd-assign-to" value="EVERYONE"></input>
            <br />
            <br />
            {/* Due Date */}
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input type="date"
              value="2024-05-13"
              id="wd-due-date" />
            <br />
            <br />
            <table>
              <tr>
                {/* Available From */}
                <td>
                  <label htmlFor="wd-available-from">Available from</label>
                  <br />
                  <input type="date"
                    value="2024-05-06"
                    id="wd-available-from" />
                </td>
                <br />
                {/* Available Until */}
                <td>
                  <label htmlFor="wd-available-until">Until</label>
                  <br />
                  <input type="date"
                    value="2024-05-20"
                    id="wd-available-until" />
                </td>
              </tr>
            </table>
            <br />
          </td>
        </tr>
      </table>
      < hr />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
