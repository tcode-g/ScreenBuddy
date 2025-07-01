import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();

    function doLogout() 
    {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }

    return (
        <button onClick={doLogout}>Logout</button>
    );
}