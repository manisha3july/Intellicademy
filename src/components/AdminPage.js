import React from "react";
import { useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";

function AdminPage() {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const AdminRes = await axios.get("http://localhost:3006/users");
   
    setAdminData(AdminRes.data);
  };


  const DeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/users/${id}`);
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    await DeleteUser(id);
    fetchAdminData();
  };


  return (
    <Section>
      <div className="container">
          <h3 className="text-center mb-3">Admin Dashboard</h3>
        <div className="row">
          {adminData.length > 0 ? (
            adminData.map((user, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card p-3">
                  <h5>Name: {user.name}</h5>
                  <p>Email: {user.email}</p>
                  <p>User Type: {user.userType}</p>
                  <p>Password: {user.password}</p>
                  <p>Country: {user.country}</p>
                   
                  <button>
                    Edit
                  </button>
                  <button  onClick={()=>{
                    handleDelete(user.id)
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No users found or loading...</p>
          )}
        </div>
      </div>
    </Section>
  );
}

export default AdminPage;
