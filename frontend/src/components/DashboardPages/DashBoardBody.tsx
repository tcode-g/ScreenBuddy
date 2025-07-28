import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProfileSideBar from './children components/ProfileSideBar';
import DailyHistogram from "./charts/DailyHistogram";
import WeeklyHistogram from "./charts/WeekLyHistogram";
import HorizontalBarChart from "./charts/HorizontalBarChart";

function DashBoardBody() {
    const navigate = useNavigate();

    const [activeGoals, setActiveGoals] = useState(false);
    const [goals, setGoals] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [tooggleState, setToggleState] = useState('daily');
    const [activeSuccessFailData, setActiveSuccessFailData] = useState(false);
    const [successFailData, setSuccessFailData] = useState<any>(null);

    function selectDaily() {
        if (tooggleState === 'weekly') {
            setToggleState('daily');
        }
    }

    function selectWeekly() {
        if (tooggleState === 'daily') {
            setToggleState('weekly');
        }
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (!token) {
                navigate('login');
                return;
            }

            try {
                const response = await axios.get(`https://cometcontacts4331.com/api/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const goalResponse = await axios.get(`https://cometcontacts4331.com/api/goals/active/`, {
                    headers: { Authorization: `Bearer ${token}` },
                    validateStatus: () => true
                });

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
                };

                const goalsuccessrate = {
                    succeses: 5,
                    fails: 2
                };

                setProfile(user);
                setPayload(payload);
                setSuccessFailData(goalsuccessrate);
                setActiveSuccessFailData(true);

                if (goalResponse.status == 200) {
                    setGoals(goalResponse.data);
                    setActiveGoals(true);
                } else {
                    setActiveGoals(false);
                }
            } catch (error: any) {
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

  

  <div id="dashboard-container">

    <div id="histogram-container">
      <h2 className="dashboard-body-head">Activity Overview</h2>
      <div className="top-section">
        {tooggleState === 'daily' ? (
          <DailyHistogram payload={payload} />
        ) : (
          <WeeklyHistogram payload={payload} />
        )}

        <span id="histogram-toggle-buttons">
          <button id="daily-toggle-button" onClick={selectDaily}>Today</button>
          <button id="weekly-toggle-button" onClick={selectWeekly}>This Week</button>
        </span>

        <ProfileSideBar user={profile} />

      </div>

    </div>

    <div id="goal-success-fail-container" className="goal-success-fail-count-container">
        <h2 className="dashboard-body-head">Goal Outcomes</h2>

        {activeSuccessFailData ? (
            <div className="goal-outcome-wrapper">
            <HorizontalBarChart payload={successFailData} />

            <h4 id="success-fail-count">
                <span className="label">Success:</span> <span className="value">{successFailData.succeses}</span>{' '}
                <span className="label">Fails:</span> <span className="value">{successFailData.fails}</span>
            </h4>

            <h4 id="win-rate">
                <span className="label">Win rate:</span>{' '}
                <span className="value">
                {(successFailData.succeses / (successFailData.succeses + successFailData.fails) * 100).toFixed(1)}%
                </span>
            </h4>
            </div>
        ) : (
            <h4 id="no-success-fail-data">No data</h4>
        )}
    </div>


    <div id="goal-container" className="goal-container">
      {activeGoals ? (
        <>
          <h4 id="goal-title">Current goal: {goals.title}</h4>
          <h4 id="goal-duration">Duration: {goals.targetMinutes}</h4>
          <h4 id="goal-status">Status: In progress</h4>
        </>
      ) : (
        <h4 id="no-goal">No current goal</h4>
      )}
    </div>

  </div>
);

}

export default DashBoardBody;
