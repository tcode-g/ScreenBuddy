import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';


function DashBoardHeader()
{
    const navigate = useNavigate();

    function doLogout() 
    {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }

    const [profile, setProfile] = useState<any>(null);
    console.log('hello');
    useEffect(() =>{
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if(!token){
                navigate('login'); // denied
                return;
            }

            try
            {
                console.log(token);
                console.log(userId);
                console.log('header: ' , `Bearer ${token}`);
                const response = await axios.get(`http://localhost:5000/api/profile/${userId}`, {headers: { Authorization: `Bearer ${token}`,}, });
                console.log(response.data);
                setProfile(response.data);
                //console.log(profile.name + ' ' + profile.created);
            } catch(error: any){
                console.error(error);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/denied');
            }    
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="dashboard-header">
            <a href="https://youtu.be/td3P1-cfZ4E" target="_blank" rel="noopener noreferrer">
            <h1 className="dash-board-title">ScreenBuddy</h1>
            </a>

            {profile && profile.user && (
            <div className="dashboard-user-info">
                <p className="user-name-title"><strong>{profile.user.name}</strong></p>
                <p className="user-date-subtitle"><strong>User created on:</strong> {profile.user.created}</p>
            </div>
            )}

            <button className="logout-button" onClick={doLogout}>Logout</button>
        </div>
    );


};

export default DashBoardHeader;
