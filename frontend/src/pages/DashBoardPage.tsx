import DashBoardHeader from '../components/DashboardPages/DashBoardHeader.tsx';
import DashBoardBody from '../components/DashboardPages/DashBoardBody.tsx';
import WeeklyHistogram from '../components/DashboardPages/charts/WeekLyHistogram.tsx';
import DailyHistogram from '../components/DashboardPages/charts/DailyHistogram.tsx';
import ProfileSideBar from '../components/DashboardPages/children components/ProfileSideBar.tsx';


const DashBoardPage = () =>
{
    return(
      <div>
        <DashBoardHeader />
        <DashBoardBody />
        
        
      </div>
    );
};

export default DashBoardPage;
