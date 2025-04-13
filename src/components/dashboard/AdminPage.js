import React, { use } from "react";
import { useEffect, useState } from "react";
import Section from "../Section";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import "../signup.css";


function AdminPage() {
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const UsersRes = await axios.get("http://localhost:3006/users");
    setUsersData(UsersRes.data);
  };

  
  

  
 const handleEdit= async (user)=> {
  setShowModal(true);
  setSelectedUser({
    id: user.id,           
    name: user.name,
    password: user.password,
    email:user.email,
    number: user.number,  
    userType: user.userType  
  });
 }
 const handleCloseModal = () => {
  setShowModal(false);
  setSelectedUser(null);
};


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    await DeleteUser(id);
    fetchUsersData();
  };


  return (
    <Section className="adminContainer lightBlueBg">
      <div className="container">
          <h3 style={{fontWeight: "600"}} className="mb-3 text-center">ADMIN DASHBOARD</h3>
          <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
        />
        <div className="row mt-5">
          {usersData.length > 0 ? (
            usersData.map((user, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card p-3" style={{boxShadow: '0px 4px 6px rgba(0,0,0, 0.3)', borderRadius:'0'}}>
                  <h5>Name: {user.name}</h5>
                  <p className="mb-0"><span style={{fontWeight: '500'}}>Email:</span> {user.email}</p>
                  <p className="mb-0"><span style={{fontWeight: '500'}}>Password:</span> {user.password}</p>
                  <p className="mb-0"><span style={{fontWeight: '500'}}>Number:</span> {user.number}</p>
                  <p className=""><span style={{fontWeight: '500'}}>User Type:</span> {user.userType}</p>
                   
                  <div className="d-flex gap-2"> 
                  <button className="btn blue_btn" onClick={()=>{
                    handleEdit(user)
                  }} style={{padding:'5px 25px',}}>
                    Edit
                  </button>
                  <button className="btn btn-delete" style={{backgroundColor: '#f43c3c', padding:'5px 25px', color: '#fff'}}  onClick={()=>{
                    handleDelete(user.id)
                  }}>
                    Delete
                  </button>

                  </div>
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
