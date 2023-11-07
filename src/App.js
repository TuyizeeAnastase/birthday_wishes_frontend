import React, { useState } from 'react';
import axios from 'axios';
import UserList from './components/usersList';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';


function App() {
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3000/api/v1/users/many', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <Router>
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/users" element={<UserList/>}/>
        </Routes>
    </Router>
     </div>
  );
}

export default App;
