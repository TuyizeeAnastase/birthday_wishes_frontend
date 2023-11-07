import axios from "axios";
import React,{ useState,useEffect }  from "react";

const SignUp=({setUsers,users,setShowAddUserModal})=>{
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birth_day, setBirthDate] = useState('');
  const [status, setStatus] = useState('Active');
  const [error,setError]=useState('')
  const [success,setSucees]=useState('')
 console.log(firstname,lastname,email,birth_day)
  const addUser = async() => {
    try{
        // const newUser = {
        //     firstname: firstname,
        //     lastname: lastname,
        //     email,
        //     birth_date: birth_day,
        //     status,
        //   };
     const response=await axios.post('http://localhost:4500/api/v1/users',{
        firstname,
        lastname,
        email,
        birth_day
     })
     setSucees(response.data.message)
  
      // setUsers([...users, newUser]);
      // setShowAddUserModal(false);
      setFirstName('');
      setLastName('');
      setEmail('');
      setBirthDate('');
      setStatus('Active');
    }catch(error){
        setError(error.response.data.message)
    }
}
    return (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddUserModal(false)}>
              &times;
            </span>
            <h2>Add User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
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
              value={birth_day}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'white' }}>{success}</p>}
            <button onClick={addUser} className='submit'>Submit</button>
          </div>
        </div>
    )
}

export default SignUp