import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Import Bootstrap JS

function Login() {
  const [logData, setLogData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [modalInstance, setModalInstance] = useState(null);

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal");
  
    if (modalElement) {
      const modal = new Modal(modalElement);
      setModalInstance(modal);
  
      // ✅ Event listener for modal close cleanup
      const handleModalClose = () => {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = ""; // ✅ Restore scrolling
        document.body.style.paddingRight = ""; // ✅ Remove extra padding
  
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
      };
  
      modalElement.addEventListener("hidden.bs.modal", handleModalClose);
  
      // ✅ Cleanup function to remove event listener on unmount
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
      };
    }
  }, []);
  
  const logHandleChange = (e) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const validateLog = () => {
    let errors = {};
    if (!logData.name.trim()) errors.name = "Username is required";
    if (!logData.password.trim()) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (validateLog()) {
      setLogin(true);
      setSuccessMessage(`Thank you for logging in, ${logData.name}!`);
  
      // ✅ Close the modal properly
      if (modalInstance) {
        modalInstance.hide();
      }
  
      setTimeout(() => {
        setSuccessMessage("");
        setShowForm(false);
        setLogData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          country: "",
          city: "",
        });
      }, 3000);
    }
  };
  return (
    <section className="loginPage">
      {showForm && (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">
                  Login
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {successMessage && (
                  <div className="alert alert-success text-center">{successMessage}</div>
                )}

                <form onSubmit={handleLogIn} id="logForm-box">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      value={logData.name}
                      onChange={logHandleChange}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      value={logData.password}
                      onChange={logHandleChange}
                      placeholder="Enter password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
