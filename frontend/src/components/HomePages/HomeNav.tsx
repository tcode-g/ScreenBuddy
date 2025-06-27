import {NavLink} from 'react-router-dom'; 

function Welcome()
{
   return(
      <nav className="home-nav-bar">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Home</NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Login</NavLink>
        <NavLink to="/signup" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Signup</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>TempNextPageLink</NavLink>
      </nav>
   );  
};

export default Welcome;