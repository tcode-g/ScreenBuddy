import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DailyHistogram from "../charts/DailyHistogram";
import WeeklyHistogram from "../charts/WeekLyHistogram";
import axios from "axios";
import { parse } from "dotenv";

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
                    const response = await axios.get(`https://172.233.171.46:5000/api/statsOrSomething`, {headers: { Authorization: `Bearer ${token}`,}, });
                console.log(response.data);
                    setProfile(response.data);
                    
                } catch(error: any){
                    console.error(error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate('/denied');
                }    
                */          
                let hoursThisWeek = 71; // default value
                try {
                    const response = await axios.get(`https://cometcontacts4331.com/api/metrics/screentime`, {
                        headers: { Authorization: `Bearer ${token}` },
                        validateStatus: () => true
                    });
                    if (response.status === 200) {
                        let totalScreentime = 0;
                        // sum all values from response.data.screentime
                        // if (response.data.screentime) {
                        //     // Assuming response.data.screentime is an object with date keys and time values
                        //     // Iterate through each date and sum the screentime values
                        //     Object.values(response.data.screentime).forEach((screentime) => {
                        //         totalScreentime += screentime;
                        //     });
                        // }

                        for (const value of response.data.screentime.values()) {
                            const screentimeValue = parseInt(screentime as string, 10);
                            // Good practice: also check if parseInt returned a valid number (not NaN)
                                if (!isNaN(screentimeValue)) {
                                totalScreentime += screentimeValue;
                                }
                        }

//                         for (const [_date, screentime] of Object.entries(response.data.screentime)) {

//                             // This check ensures screentime is not null, undefined, or an empty string
//                             // before you try to parse it.
//                             if (screentime) {
//                                 const screentimeValue = parseInt(screentime as string, 10);

//                                 // Good practice: also check if parseInt returned a valid number (not NaN)
//                                 if (!isNaN(screentimeValue)) {
//                                 totalScreentime += screentimeValue;
//                                 }
//                             }
// }

                        

                        // for (const [date, screentime] of Object.entries(response.data.screentime)) {
                        //     totalScreentime += parseInt(screentime, 10);
                        // }
                        hoursThisWeek = Math.floor(totalScreentime / 60); // convert minutes to hours
                    }
                } catch (error) {
                    console.error("Error fetching screentime data:", error);
                }

                
                //  dummy data
                const data: statProp[] = [
                    {
                        name: 'Average screentime per day (hours to date)',
                        value: 12.6
                    },

                    {
                        name: ' Total screentime last week (hours)',
                        value: 87
                    },

                    {
                        name: 'Current total screentime this week (hours)',
                        value: hoursThisWeek
                    },

                    {
                        name: 'Longest time off screen (hours)',
                        value: 2
                    },
                ];

                const payload = {
                    daily: [12, 5, 8, 6, 8, 9, 2, 4, 14, 54, 31, 23, 12, 14, 15, 13, 4, 14, 45, 34, 23, 0, 0, 0],
                    weekly: [122, 125, 202, 100, 63.32, 158, 0]
                };

                setStats(data);
                setPayload(payload);
            };

        fetchStats();
    }, [])

    return stats ? (
  <div className="genstats-container">
    <div className="genstats-stats-grid">
      {stats.map((stat: any, index: any) => (
        <div className="stat-card" key={index}>
          <p className="stat-name">{stat.name}</p>
          <p className="stat-value">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="genstats-charts">
      <h2 className="chart-title">Daily Screen Time</h2>
      <DailyHistogram payload={payload} />

      <h2 className="chart-title">Weekly Screen Time</h2>
      <WeeklyHistogram payload={payload} />
    </div>
  </div>
) : (
  <p className="loading-text">Loading...</p>
);

}

export default GenStats;