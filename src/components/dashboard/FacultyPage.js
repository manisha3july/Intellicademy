import React, { use } from "react";
import { useEffect, useState } from "react";
import Section from "../Section";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import "../signup.css";


function FacultyPage() {
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [facultyData, setFacultyData] = useState([])

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const UsersResult = await axios.get("http://localhost:3006/users");
  
      const currentUser = JSON.parse(localStorage.getItem("user"));
  
      if (!currentUser) {
        setUsersData([]);
        return;
      }
  
      const filteredUsers = UsersResult.data.filter(user =>
        user.userType === "Student" || user.id === currentUser.id
      );
  
      setUsersData(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersData([]);
    }
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
          <h5 style={{fontWeight: "500"}} className="mb-5"> Welcome {currentUser.name} to  Faculty dashboard</h5>
          <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
        />
        <div className="row ">
        <div class="table-responsive">
          <table className="table table-bordered" style={{backgroundColor:'#fff'}}>
          <tr><th>Name</th> <th>Email</th> <th>Password</th> <th>Number</th><th>User Type</th>  <th>update</th> </tr>
          {usersData.length > 0 ? (
            usersData.filter(user => user.userType === "Faculty" || user.userType === "Student").map((user, index) => (
              <tr>
                <td> {user.name}</td>
              
                  <td>
                  {user.email}
                  </td>
                  <td>
                 {user.password}
                  </td>
                  <td>
                {user.number}
                  </td>
                  <td>
                {user.userType}
                  </td>
                  <td>
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
                  </td>

              
                
              </tr>
             
            ))
          ) : (
            <p className="text-center">No users found or loading...</p>
          )}
           </table>
           </div>
        </div>
      </div>
    </Section>
  );
}

export default FacultyPage;
