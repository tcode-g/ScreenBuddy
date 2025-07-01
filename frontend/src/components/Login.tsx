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
  //  alert('doIt()' + loginName + ' ' + loginPassword);
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
    return(
      <div id="loginDiv">
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username"  /><br />
        <input type="password" id="loginPassword" placeholder="Password" /><br />
        <input type="submit" id="loginButton" className="buttons" value = "Do It"
          onClick={doLogin} />
        <span id="loginResult"></span>
     </div>
    );
};

export default Login;
