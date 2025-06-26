function Signup()
{
  function doSignup(event:any) : void
  {
    event.preventDefault();
    alert('The sun shines for all');
  }
  return (
    <div id="signupDiv">
        <span id="inner-title">SIGN UP</span><br />
        <input type="text" id="regFirstname" placeholder="First Name" /><br />
        <input type="text" id="regLasttname" placeholder="Last Name" /><br />
        <input type="email" id="regEmail" placeholder="Email" /><br />
        <input type="password" id="regPassword" placeholder="Password" /><br />
        <input type="password" id="regConfPassword" placeholder="Confirm Password" /><br />
        <input type="submit" id="regButton" className="buttons" value = "SignUp" onClick={doSignup} />
        <span id="regResult"></span>
     </div>
  );
};

export default Signup;