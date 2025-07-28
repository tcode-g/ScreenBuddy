import  React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword()
{
  
  
  const [SendResult, setSendResult] = useState('');   
  const [EmailAddress, setEmailAddress] = React.useState('');
  const navigate = useNavigate();

  async function doSendResetEmail(event:any) : Promise<void>
  {
    event.preventDefault();
    console.log('please work');
    
    
    var obj = {email: EmailAddress};
    
    try
    {
      const response = await axios.post('https://cometcontacts4331.com/api/forgot-password', obj);
      // const response = await axios.post('http://localhost:5000/api/forgot-password', obj);
      //localStorage.getItem('token_data');
      console.log('whyyy');
      
      
      if(response.status === 200){
        //setSendResult('');
        setSendResult('Email sent');

        console.log(response);
       // navigate('/login');
      } else {
        setSendResult('Something went wrong');
      }
    } catch(error : any){
      console.log(error);
      setSendResult('Something went wrong');
    }

  }
  
    function handleSetEmailAddress(event: any) : void
    {
      setEmailAddress(event.target.value);
    }

    
  
  return (
    <div className="info-container">
      <form className="info-box" onSubmit={doSendResetEmail}>
        <span className="verify-title">
          Please submit your email adress and we will send you a verification email to reset your password. The email must be tied to an existing account.  
        </span>
        <input type="text" id="EmailAddress" placeholder="Email Address" className="info-input" onChange={handleSetEmailAddress} />
        <input type="submit" value="Submit" className="info-button" />
        <span id="SendResult" className="info-result">{SendResult}</span>
      </form>
    </div>
  );
};


export default ResetPassword;
