import React, { useState,useEffect } from 'react';
import axios from 'axios'
import './styles/userlist.css'
import SignUp from './AddUserForm'

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(10); 

  useEffect(() => {
    // Fetch the users from the API
    axios.get('http://localhost:4500/api/v1/users')
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const uploadFile = (e) => {
    // Logic to handle file upload
    const file = e.target.files[0];
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <button className="add-user-btn" onClick={() => setShowAddUserModal(true)}>
        Add User
      </button>
      <div className="file-upload-container">
       <input type="file" accept=".xlsx" onChange={uploadFile} className="file-input"  />
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Status</th>
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
          </tr>
        ))}
        </tbody>
      </table>
      {showAddUserModal && (
        <SignUp users={users} setUsers={setUsers} setShowAddUserModal={setShowAddUserModal}/>
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
