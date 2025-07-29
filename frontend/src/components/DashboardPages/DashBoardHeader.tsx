import { useNavigate } from "react-router-dom";


import { NavLink } from "react-router-dom";

function DashBoardHeader()
{
    const navigate = useNavigate();

    function doLogout() 
    {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }

    
    console.log('hello');

        

    return (
        <div className="dashboard-header">
            <a href="https://youtu.be/td3P1-cfZ4E" target="_blank" rel="noopener noreferrer">
            <h1 className="dash-board-title">ScreenBuddy</h1>
            </a>

                <nav className="dash-nav-bar">
                    <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Dash Board</NavLink>

                    {/* <NavLink to="/dashboard/buddy" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Buddy</NavLink> */}
                    <NavLink to="/dashboard/stats" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Stats</NavLink>
                    {/* <NavLink to="/dashboard/shop" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Shop</NavLink> */}
                    {/* <NavLink to="/dashboard/settings" className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}>Settings</NavLink> */}
                </nav>
  
            

            <button className="logout-button" onClick={doLogout}>Logout</button>
        </div>
    );
};



export default DashBoardHeader;
