import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function ScheduleMeeting({ currentUser }) {
  const [schedule, setSchedule] = useState([]);
  const [students, setStudents] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    topic: "",
    date: "",
    time: "",
    selectedStudents: [],
  });

  useEffect(() => {
    if (currentUser) {
      fetchSchedule();
      fetchStudents();
    }
  }, [currentUser]);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:3006/users");
      const studentUsers = data.filter((u) => u.userType === "Student");
      setStudents(studentUsers);
    } catch (err) {
      toast.error("Failed to fetch students");
      console.error("Fetch students error:", err);
    }
  };

  const fetchSchedule = async () => {
    try {
      const res = await axios.get("http://localhost:3006/schedule");
      const mySchedule = res.data.filter((m) => m.facultyId === currentUser.id);
      setSchedule(mySchedule);
    } catch (err) {
      toast.error("Failed to fetch schedule");
      console.error("Fetch schedule error:", err);
    }
  };

  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    const { topic, date, time, selectedStudents } = newMeeting;

    if (!topic || !date || !time) {
      toast.warn("Please fill in all meeting details.");
      return;
    }

    try {
      const meetingId = uuidv4();
      const meetingUrl = `https://meet.jit.si/${meetingId}`;

      await axios.post("http://localhost:3006/schedule", {
        ...newMeeting,
        facultyId: currentUser.id,
        facultyName: currentUser.name,
        meetingId,
        meetingUrl,
      });

      toast.success("Meeting scheduled successfully!");
      setNewMeeting({
        topic: "",
        date: "",
        time: "",
        selectedStudents: [],
      });
      fetchSchedule();
    } catch (err) {
      toast.error("Error scheduling meeting");
      console.error("Schedule meeting error:", err);
    }
  };
  const handleCancelMeeting = async (meetingId) => {
    if (!window.confirm("Are you sure you want to cancel this meeting?"))
      return;

    try {
      await axios.delete(`http://localhost:3006/schedule/${meetingId}`);
      toast.success("Meeting cancelled successfully!");
      fetchSchedule(); // Refresh the meeting list
    } catch (err) {
      toast.error("Failed to cancel meeting.");
      console.error("Cancel meeting error:", err);
    }
  };
  return (
    <section className="content-section schedule-meeting-section pt-3">
      <form
        onSubmit={handleMeetingSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
        className="meeting-form card p-4 mb-3"
      >
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="topic">
            Meeting Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            placeholder="e.g., Project Discussion"
            value={newMeeting.topic}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, topic: e.target.value })
            }
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newMeeting.date}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, date: e.target.value })
            }
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={newMeeting.time}
            onChange={(e) =>
              setNewMeeting({ ...newMeeting, time: e.target.value })
            }
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Assign to Students</label>
          <select
            multiple
            className="form-control"
            value={newMeeting.selectedStudents}
            onChange={(e) =>
              setNewMeeting({
                ...newMeeting,
                selectedStudents: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success btn-schedule-meeting">
          Schedule Meeting
        </button>
      </form>

      <h4 className="mb-3">Your Scheduled Meetings</h4>

      {schedule.length === 0 ? (
        <p>You have no meetings scheduled.</p>
      ) : (
        <ul className="meeting-list">
          {schedule.map((meet, index) => (
            <li key={index} className="meeting-item">
              <strong>{meet.topic}</strong>{" "}
              {new Date(meet.date).toLocaleDateString()} at {meet.time}
              {meet.meetingUrl && (
                <div>
                  <a
                    href={meet.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn_blue"
                    style={{ marginLeft: "10px" }}
                  >
                    Join Meeting
                  </a>
                  <button
                    onClick={() => handleCancelMeeting(meet.id)}
                    className="btn btn-dark"
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ScheduleMeeting;
