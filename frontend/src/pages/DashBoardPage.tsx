import PageTitle from '../components/DashboardPages/DashBoardTitle.tsx';
import Logout from '../components/DashboardPages/Logout.tsx';
import Profile from '../components/DashboardPages/Profile.tsx';

const DashBoardPage = () =>
{

    return(
      <div>
        <PageTitle />
        <Profile />
        <Logout />
      </div>
    );
};

export default DashBoardPage;
