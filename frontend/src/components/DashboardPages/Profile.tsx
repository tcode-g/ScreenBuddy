import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile()
{
    const [profile, setProfile] = useState<any>(null);
    const navigate = useNavigate();
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

    return profile ? (
        
        <div>
            <p><strong></strong> {profile.user.name} </p>
            <p><strong>User created on:</strong> {profile.user.created} </p>
        </div>

    ) :  ( <p>Loading...</p>    
    );
}

export default Profile;