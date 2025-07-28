import  React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom'; 

function Login()
{
  const [loginResult, setloginResult] = useState('');   
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setPassword] = React.useState('');
  const navigate = useNavigate();

  async function doLogin(event:any) : Promise<void>
  {
    event.preventDefault();
    console.log('please work');
    var obj = {username: loginName, password: loginPassword};
    
    try
    {
      // const response = await axios.post('http://localhost:5000/api/login', obj);
      const response = await axios.post('https://172.233.171.46:5000/api/login', obj);
      //localStorage.getItem('token_data');
      console.log('whyyy');
      
      
      if(response.status === 200){
        setloginResult('Login sucessful');
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', response.data.user.id);
        console.log(response);
        navigate('/dashboard');
      } else {
        setloginResult(`User/Password combination incorrect`);
      }
    } catch(error : any){
      console.log(error);
      setloginResult(`User/Password combination incorrect`);
    }

  }
  
    function handleSetLoginName(event: any) : void
    {
      setLoginName(event.target.value);
    }

    function handleSetLoginPassword(event: any) : void 
    {
      setPassword(event.target.value);
    }

    
  
  return (
    <div className="info-container">
      <form className="info-box" onSubmit={doLogin}>
        <span className="info-title">Welcome Back!</span>
        <input type="text" id="loginName" placeholder="Username" className="info-input" onChange={handleSetLoginName} />
        <input type="password" id="loginPassword" placeholder="Password" className="info-input" onChange={handleSetLoginPassword} />
        <input type="submit" value="Log In" className="info-button" />
        

        <nav className="resetNav">
        <NavLink to="/reset" className={({ isActive }) => (isActive ? "small-nav-link-active" : "small-nav-link")}>Forget password?</NavLink>

      </nav>

        <span id="loginResult" className="info-result">{loginResult}</span>
      </form>
    </div>
  );
};


export default Login;
