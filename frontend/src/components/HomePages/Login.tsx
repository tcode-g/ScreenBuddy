//import  React, {useState} from 'react';

function Login()
{
  //const [message, setMessage] = useState('');   
  //const [loginName, setLoginName] = useState('');
  //const [loginPassword, setPassword] = useState('');


  function doLogin(event:any) : void
  {
    event.preventDefault();
    alert('testing');
    // alert('doIt()' + loginName + ' ' + loginPassword);
  }
  /*
    function handleSetLoginName(event: any) : void
    {
      setLoginName(event.target.value);
    }

    function handleSetLoginPassword(event: any) : void 
    {
      setPassword(event.target.value);
    }
  */
  return (
    <div className="info-container">
      <form className="info-box" onSubmit={doLogin}>
        <span className="info-title">Welcome Back!</span>
        <input type="text" id="loginName" placeholder="Username" className="login-input" />
        <input type="password" id="loginPassword" placeholder="Password" className="login-input" />
        <input type="submit" value="Do It" className="login-button" />
        <span id="loginResult" className="login-result"></span>
      </form>
    </div>
  );
};

export default Login;
