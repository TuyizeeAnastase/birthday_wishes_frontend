import React, { useState,useEffect } from 'react';
import axios from 'axios'
import './styles/userlist.css'
import { Button } from '@mui/material';

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Active');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 

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

  const addUser = () => {
    // Add the new user to the users list
    const newUser = {
      firstname: firstName,
      lastname: lastName,
      email,
      birth_date: birthDate,
      status,
    };
    setUsers([...users, newUser]);
    setShowAddUserModal(false);
    // Clear the input fields after adding the user
    setFirstName('');
    setLastName('');
    setEmail('');
    setBirthDate('');
    setStatus('Active');
  };

  const uploadFile = (e) => {
    // Logic to handle file upload
    const file = e.target.files[0];
  };

  const handleSearch=()=>{
    console.log('search')
  }

  return (
    <div className="App">
      <h1>User Management</h1>

      <button className="add-user-btn" onClick={() => setShowAddUserModal(true)}>
        Add User
      </button>
      <div className="file-upload-container">
       <input type="file" accept=".xlsx" onChange={uploadFile} className="file-input"  />
       <div className="search-and-filter">
    <input type="text" placeholder="Search" className="search-input" />
    <input type="date" className="date-filter" />
    <input type="date" className="date-filter" />
    <button onClick={handleSearch} className="search-button">
      Search
    </button>
  </div>
      </div>
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
              <Button style={{color:'red',fontStyle:'bold',fontSize:'15px'}}>Delete</Button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddUserModal(false)}>
              &times;
            </span>
            <h2>Add User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button onClick={addUser} className='submit'>Submit</button>
          </div>
        </div>
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
