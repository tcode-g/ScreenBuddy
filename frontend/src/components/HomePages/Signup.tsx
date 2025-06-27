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
        <input type="text" id="regUsername" placeholder="Username" className="info-input" />
        <input type="email" id="regEmail" placeholder="Email" className="info-input" />
        <input type="password" id="regPassword" placeholder="Password" className="info-input" />
        <input type="password" id="regConfPassword" placeholder="Confirm Password" className="info-input" />
        <input type="submit" value="Sign Up" className="info-button" />
        <span id="regResult" className="info-result"></span>
      </form>
    </div>
  );
}

export default Signup;