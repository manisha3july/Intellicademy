
import axios from "axios";
const DeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/users/${id}`);
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

export default DeleteUser
