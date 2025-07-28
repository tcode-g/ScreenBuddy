import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DailyHistogram from "../charts/DailyHistogram";
import WeeklyHistogram from "../charts/WeekLyHistogram";
import axios from "axios";

type statProp = {
    name: string;
    value: number;
};

function GenStats(){

    const [payload, setPayload] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const navigate = useNavigate();

    
        useEffect(() =>{
            const fetchStats = async () => {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if(!token){
                    navigate('login'); // denied
                    return;
                }
                /*
                    try
                {
                    console.log(token);
                    console.log(userId);
                    console.log('header: ' , `Bearer ${token}`);
                    const response = await axios.get(`http://172.233.171.46:5000/api/statsOrSomething`, {headers: { Authorization: `Bearer ${token}`,}, });
                console.log(response.data);
                    setProfile(response.data);
                    
                } catch(error: any){
                    console.error(error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate('/denied');
                }    
                */          
                
                //  dummy data
                const data: statProp[] = [
                    {
                        name: 'Average screentime per day (hours to date)',
                        value: 12.6
                    },

                    {
                        name: ' Total sreentime last week (hours)',
                        value: 87
                    },

                    {
                        name: 'Current total screentime this week (hours)',
                        value: 71
                    },

                    {
                        name: 'Longest time off screen (hours)',
                        value: 2
                    },

                    {
                        name: 'custom stat',
                        value: 13
                    },

                    {
                        name: 'custom stat',
                        value: 13
                    },

                    {
                        name: 'custom stat',
                        value: 13
                    },

                    {
                        name: 'custom name',
                        value: 13
                    },
                ];

                const payload = {
                    daily: [12, 5, 8, 6, 8, 9, 2, 4, 14, 54, 31, 23, 12, 14, 15, 13, 4, 14, 45, 34, 23, 0, 0, 0],
                    weekly: [12, 5, 8, 6, 8, 9, 2]
                }

                setStats(data);
                setPayload(payload);
            };

        fetchStats();
    }, [])

    return stats ? (
       <div>
            <div>
                {stats.map((stat:any, index:any) => (
                    <p key={index}>{stat.name}: {stat.value}</p>
                ))}
            </div>
            <div>
                <DailyHistogram payload={payload}/> 
                <WeeklyHistogram payload={payload} />
            </div>
        </div>
    ) :  ( <p>Loading...</p>    
    );

}

export default GenStats;