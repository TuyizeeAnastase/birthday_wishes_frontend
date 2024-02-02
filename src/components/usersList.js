import React, { useState,useEffect } from 'react';
import axios from 'axios'
import './styles/userlist.css'
import SignUp from './AddUserForm'
import Messages from './MessagesModels';
import { Button } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [success,setSucees]=useState('')
  const [file, setFile] = useState(null);
  const [managepopup,setManagepopup]=useState(false)


  const uploadFile =async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await fetch('http://localhost:4500/api/v1/users/many', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Users created successfully.');
      } else {
        console.error('Failed to create users.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Fetch the users from the API
    axios.get('http://localhost:4500/api/v1/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

  }, [file]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleSearch=()=>{
    console.log('search')
  }

  const handleDelete=async(id)=>{
    try {
      await axios.delete(`http://localhost:4500/api/v1/users/${id}`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  console.log(managepopup)

  return (
    <div className="App">
      <h1>User Management</h1>

      <button className="add-user-btn" onClick={() => setShowAddUserModal(true)}>
        Add User
      </button>
      <button className="add-user-btn" onClick={()=>setManagepopup(true)}>
        Manage site
      </button>
      <div className="file-upload-container">
       <input type="file" accept=".xlsx" onChange={uploadFile} className="file-input"  />
       
           <input type="text" placeholder="Search" className="search-input" />
          <input type="date" className="date-filter" />
           <input type="date" className="date-filter" />
    <button onClick={handleSearch} className="search-button">
      Search
    </button>
      </div>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {currentUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.birth_day}</td>
            <td>{user.is_active}</td>
            <td>
              <Button style={{color:'green',fontStyle:'bold',fontSize:'15px'}}>Edit</Button>
              <Button onClick={() => handleDelete(user.id)} style={{color:'red',fontStyle:'bold',fontSize:'15px'}}>Delete</Button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {
        managepopup && (
          <Messages setManagepopup={setManagepopup}/>
        )
      }
      {showAddUserModal && (
        <SignUp setSucees={setSucees} setUsers={setUsers} users={users} setShowAddUserModal={setShowAddUserModal}/>
      )}
      <div className="pagination">
        {users.length > itemsPerPage &&
          Array(Math.ceil(users.length / itemsPerPage))
            .fill(null)
            .map((_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
      </div>
      </div>
  )

};

export default UserList;
