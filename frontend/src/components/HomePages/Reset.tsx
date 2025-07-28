import  React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Reset()
{
    const [resetResult, setResetResult] = useState('');
    const [resPassword, setResPassword] = React.useState('');
    const [resConfPassword, setResConfPassword] = React.useState('');
    const navigate = useNavigate();

    async function doReset(event:any) : Promise<void>
    {
        event.preventDefault();
        const {token} = useParams();
        var obj = {token: token, password: resPassword};
        try{
            const response = await axios.post('https://cometcontacts4331/api/reset-password', obj);
            console.log(response);

            if(response.status === 200 ){
                setResetResult('Password reset successful');
                setTimeout( () => {
                    navigate('/login');
                }, 2000)
            }
        } catch (error: any){
            console.log(error);
            setResetResult(`Something went wrong`);
        }
    } 

     function handleSetRegPassword(event: any) : void
    {
      setResPassword(event.target.value);
    }

    function handleSetRegConfPassword(event: any) : void 
    {
      setResConfPassword(event.target.value);
    }

    return (
        <div className="info-container">
            <form className="info-box" onSubmit={doReset}>
                <span className="info-title">Reset Password</span>
                <input type="password" id="resPassword" placeholder="Password" className="info-input" onChange={handleSetRegPassword} />
                <input type="password" id="resConfPassword" placeholder="Confirm Password" className="info-input" onChange={handleSetRegConfPassword} />
                <input type="submit" value="Sign Up" className="info-button" />
                <span id="resetResult" className="info-result">{resetResult}</span>
            </form>
        </div>
    )
}

export default Reset;