import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProfileSideBar from './children components/ProfileSideBar';
import DailyHistogram from "./charts/DailyHistogram";
import WeeklyHistogram from "./charts/WeekLyHistogram";
import HorizontalBarChart from "./charts/HorizontalBarChart";

function DashBoardBody()
{
    const navigate = useNavigate();

    const [activeGoals, setActiveGoals] = useState(false);
    const [goals, setGoals] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [tooggleState, setToggleState] = useState('daily');
    const [activeSuccessFailData, setActiveSuccessFailData] = useState(false);
    const [successFailData, setSuccessFailData] = useState<any>(null);

    function selectDaily()
    {
        if(tooggleState === 'weekly'){
            setToggleState('daily');
        } else {
            // do nothing.
        }
    }

    function selectWeekly()
    {
        if(tooggleState === 'daily'){
            setToggleState('weekly');
        } else {
            // do nothing.
        }
    }

    console.log('hello');
    useEffect(() =>{
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            console.log('step1');
            if(!token){
                navigate('login'); // denied
                return;
            }

            try
            {
                console.log(token);
                console.log(userId);
                console.log('header: ' , `Bearer ${token}`);
                const response = await axios.get(`http://172.233.171.46:5000/api/profile/${userId}`, {headers: { Authorization: `Bearer ${token}`,}, });
                const goalResponse = await axios.get(`http://localhost:5000/api/goals/active/${userId}`, {headers: { Authorization: `Bearer ${token}`,}, validateStatus: () => true });
                // const response = await axios.get(`http://localhost:5000/api/profile/${userId}`, {headers: { Authorization: `Bearer ${token}`,}, });
                console.log(response.data);
                console.log(goalResponse.status);

                // prop for sidebar
                const user = {
                    username: `${response.data.user.name}`,
                    level: 10,
                    coins: 500,
                    lastLogin: 'today'
                };


                // prop for daily graph
                const payload = {
                    daily: [12, 5, 8, 6, 8, 9, 2, 4, 14, 54, 31, 23, 12, 14, 15, 13, 4, 14, 45, 34, 23, 0, 0, 0],
                    weekly: [12, 5, 8, 6, 8, 9, 2]
                }

                // prop for goal s/f ratio
                const goalsuccessrate = {
                    succeses: 5,
                    fails: 2
                }

                setProfile(user);
                setPayload(payload);
                
                //pending endpoints
                setSuccessFailData(goalsuccessrate);
                setActiveSuccessFailData(true);


                console.log(profile);
                
                if(goalResponse.status == 200){
                               
                    
                    
                    setGoals(goalResponse.data);
                    setActiveGoals(true);
                    
                } else {
                    setActiveGoals(false);
                } 


            } catch(error: any){
                console.error(error);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/denied');
            }    
        };

        fetchUserInfo();
    }, []);

    //user prop for profile side bar;
                

    return (
            <div >
                <div>
                    <ProfileSideBar user={profile} />
                </div>
                <div>
                    {tooggleState === 'daily' ? <DailyHistogram payload={payload}/> : <WeeklyHistogram payload={payload} />}
                    <span>
                        <button onClick={selectDaily}>Today</button>
                        <button onClick={selectWeekly}>This Week</button>
                    </span>
                </div>
                {activeGoals ? ( <div className="goal-container">
                    <h4>Current goal: {goals.title}</h4>
                    <h4>Duration: {goals.targetMinutes}</h4>
                    <h4>Status: In progress </h4>
                </div> ) : ( <div className="goal-container">
                    <h4>No current goal</h4>
                </div>)}

                {activeSuccessFailData ? ( <div className="goal-success-fail-count-container">
                    <HorizontalBarChart payload={successFailData} />
                   <h4>Success: {successFailData.succeses} Fails: {successFailData.fails}</h4>
                   <h4>win rate: {successFailData.succeses / (successFailData.succeses + successFailData.fails) * 100 }</h4>
                </div> ) : ( <div className="goal-success-fail-count-container">
                    <h4>No data</h4>
                </div> ) }


            </div>           
        
    );


}; 


export default DashBoardBody;