import react,{useState} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login=()=>{

    const [email,setEmail]=useState([])
    const [password,setPassword]=useState([])
    const [error,setError]=useState('')

    const navigate = useNavigate();

    const Login=async()=>{
        try{
            const response = await axios.post('http://localhost:4500/api/v1/users/login', {
                email: email,
                password: password
            });    
        navigate('/users');
        }catch(error){
            setError(error.response.data.message)
        }
    }

    return (
        <div className='login_body'>
        <div className='login-content'>
         <h2>Login</h2>
         <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'white' }}>{error}</p>}
            <button onClick={Login} className='submit'>Login</button>
        </div>
        </div>
    )
}

export default Login