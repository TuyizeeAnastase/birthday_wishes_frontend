import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { Container, Typography, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Current page
    const [rowsPerPage] = useState(10); // Number of rows per page

  useEffect(() => {
    // Fetch the users from the API
    axios.get('http://localhost:3000/api/v1/users')
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., POST request to add a new user)
  };

  const handleFileUpload = (e) => {
    // Add file upload logic here
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* User Form */}
      <form onSubmit={handleFormSubmit}>
        {/* Add form fields here */}
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </form>

      {/* File Upload */}
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <Button variant="contained" color="secondary">
        Upload File
      </Button>

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through users and display data */}
            {users.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.birth_day}</TableCell>
                <TableCell>{user.is_active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
      <Button onClick={() => setPage(page + 1)} disabled={page * rowsPerPage >= users.length}>Next</Button>
    </Container>
  );
};

export default UserList;
