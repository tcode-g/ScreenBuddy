import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    return token ? <Outlet /> : <Navigate to="/denied" />; // access denied.

};

export default PrivateRoute;