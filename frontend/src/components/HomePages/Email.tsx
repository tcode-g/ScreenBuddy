import  React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Email()
{
  const dispUsername = localStorage.getItem('username');
  const dispEmail = localStorage.getItem('email');
  console.log(dispUsername);
  console.log(dispUsername);
  const [verificationResult, setloginVerificationResult] = useState('');   
  const [verificationCode, setVerificationCode] = React.useState('');
  const navigate = useNavigate();

  async function doVerify(event:any) : Promise<void>
  {
    event.preventDefault();
    console.log('please work');
    
    
    var obj = {email: dispEmail, code: verificationCode};
    
    try
    {
      const response = await axios.post('http://172.233.171.46:5000/api/verify-email', obj);
      // const response = await axios.post('http://localhost:5000/api/verify-email', obj);
      //localStorage.getItem('token_data');
      console.log('whyyy');
      
      
      if(response.status === 200){
        setloginVerificationResult('Your email is verified. You can now login.');
        

        console.log(response);
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/login');
      } else {
        setloginVerificationResult('Incorrect code');
      }
    } catch(error : any){
      console.log(error);
      setloginVerificationResult('Incorrect code please try again');
    }

  }
  
    function handleSetVerificationCode(event: any) : void
    {
      setVerificationCode(event.target.value);
    }

    
  
  return (
    <div className="info-container">
      <form className="info-box" onSubmit={doVerify}>
        <span className="verify-title">
          Hello <span className="highlight-pink">{dispUsername}</span>, a code has been sent to <span className="highlight-pink">{dispEmail}</span> please submit the code to verify your email.
        </span>
        <input type="text" id="verificationCode" placeholder="Verification code" className="info-input" onChange={handleSetVerificationCode} />
        <input type="submit" value="Verify" className="info-button" />
        <span id="loginResult" className="info-result">{verificationResult}</span>
      </form>
    </div>
  );
};


export default Email;
