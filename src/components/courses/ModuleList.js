
function ModuleList({ courseModules }) {
  const style = {
    padding: "20px",
    width: "100%",
    maxWidth: "32.33%",
    boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between"
  };

  return (
    <section className="mb-5">
      <div className="heading mb-5"><h3>Course Modules</h3></div>
      <div className="module_list d-flex flex-wrap gap-3 justify-content-between">
        {courseModules.map((mod, i) => (
          <div key={i} className="course-module" style={style}>
            <h4>{mod.title}</h4>
            <p>{mod.description}</p>
            <button className="btn blue_btn">Learn More</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default  ModuleList