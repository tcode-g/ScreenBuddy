import {Link} from 'react-router-dom'; 

function Welcome()
{
   return(
     <nav>
        <Link to="/" style={{ marginRight: '1rem' }}>HomePage</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/signup">Signup</Link>
    </nav>
   );  
};

export default Welcome;


            