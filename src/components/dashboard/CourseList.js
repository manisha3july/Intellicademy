function CourseList({ courses, onEdit, onDelete, editingCourseId }) {
  return (
    <div className="mt-4">
      <h4>Your Courses</h4>
      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    course.imageUrl?.trim()
                      ? course.imageUrl
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  className="card-img-top"
                  alt={course.title}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{fontWeight: '700'}}>{course.title}</h5>
                  <p className="card-text" style={{fontSize: '14px', lineHeight: '18px'}}>{course.description}</p>
                  <p className="text-muted">
                    <strong>Duration:</strong> {course.duration}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(course)}
                  >
                    Edit
                  </button>
                  {editingCourseId !== course.id && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(course.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default CourseList;
