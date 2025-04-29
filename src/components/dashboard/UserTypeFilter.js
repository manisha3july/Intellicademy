import React from "react";

const UserTypeFilter = ({ userType, onChange }) => {
  return (
    <form className="">
      <div className="d-flex align-items-center">
        <label htmlFor="userTypeFilter" className="form-label me-2 mb-0 fw-semibold" style={{whiteSpace: 'nowrap', fontSize:'14px'}}>
          Filter by User Type:
        </label>
        <select
          id="userTypeFilter"
          className="form-select"
          value={userType}
          onChange={(e) => onChange(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">All</option>
          <option value="Admin">Admin</option>
          <option value="Faculty">Faculty</option>
          <option value="Student">Student</option>
        </select>
      </div>
    </form>
  );
};

export default UserTypeFilter;
