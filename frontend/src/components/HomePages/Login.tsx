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
        <input type="text" id="loginName" placeholder="Username" className="info-input" />
        <input type="password" id="loginPassword" placeholder="Password" className="info-input" />
        <input type="submit" value="Log In" className="info-button" />
        <a className="info-link" id="loginForgetPassword">Forget password? (DOES NOTHING)</a>
        <span id="loginResult" className="info-result"></span>
      </form>
    </div>
  );
};


export default Login;
