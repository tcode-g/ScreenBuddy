import  React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup()
{
  const [regResult, setRegResult] = useState('');   
    const [regUserame, setRegUsername] = React.useState('');
    const [regEmail, setRegEmail] = React.useState('');
    const [regPassword, setRegPassword] = React.useState('');
    const [regConfPassword, setRegConfPassword] = React.useState('');
    const navigate = useNavigate();
  



  async function doSignup(event:any) : Promise<void>
  {
    event.preventDefault();
    //input validation goes here
    if(regPassword !== regConfPassword){
      setRegResult('password does not match confirmation field.');
      return;
    }
    var obj = {email: regEmail, username: regUserame, password: regPassword};
    
    try
    {
      const response = await axios.post('https://cometcontacts4331.com/api/register', obj);
      // const response = await axios.post('http://localhost:5000/api/register', obj);
      //localStorage.getItem('token_data');
      console.log('whyyy');
      
      
      if(response.status === 201){
        setRegResult('Signup successful');
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
        console.log(response);
        navigate('/verify');
      } else {
        setRegResult(`Something went wrong`);
      }
    } catch(error : any){
      console.log(error);
      setRegResult(`Something went wrong`);
    }
  }

   function handleSetRegUsername(event: any) : void
    {
      setRegUsername(event.target.value);
    }

    function handleSetRegEmail(event: any) : void 
    {
      setRegEmail(event.target.value);
    }

     function handleSetRegPassword(event: any) : void
    {
      setRegPassword(event.target.value);
    }

    function handleSetRegConfPassword(event: any) : void 
    {
      setRegConfPassword(event.target.value);
    }

  return (
    <div className="info-container">
      <form className="info-box" onSubmit={doSignup}>
        <span className="info-title">Get Started!</span>
        <input type="text" id="regUsername" placeholder="Username" className="info-input" onChange={handleSetRegUsername} />
        <input type="email" id="regEmail" placeholder="Email" className="info-input" onChange={handleSetRegEmail} />
        <input type="password" id="regPassword" placeholder="Password" className="info-input" onChange={handleSetRegPassword} />
        <input type="password" id="regConfPassword" placeholder="Confirm Password" className="info-input" onChange={handleSetRegConfPassword} />
        <input type="submit" value="Sign Up" className="info-button" />
        <span id="regResult" className="info-result">{regResult}</span>
      </form>
    </div>
  );
}

export default Signup;
