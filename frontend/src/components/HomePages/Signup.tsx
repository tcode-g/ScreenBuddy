function Signup()
{
  function doSignup(event:any) : void
  {
    event.preventDefault();
    alert('The sun shines for all');
  }
  return (
    <div className="info-container">
      <form className="info-box" onSubmit={doSignup}>
        <span className="info-title">Get Started!</span>
        <input type="text" id="regFirstname" placeholder="First Name" className="login-input" />
        <input type="text" id="regLastname" placeholder="Last Name" className="login-input" />
        <input type="email" id="regEmail" placeholder="Email" className="login-input" />
        <input type="password" id="regPassword" placeholder="Password" className="login-input" />
        <input type="password" id="regConfPassword" placeholder="Confirm Password" className="login-input" />
        <input type="submit" value="Sign Up" className="login-button" />
        <span id="regResult" className="login-result"></span>
      </form>
    </div>
  );
}

export default Signup;