import DashBoardHeader from '../components/DashboardPages/DashBoardHeader.tsx';
import DashBoardBody from '../components/DashboardPages/DashBoardBody.tsx';


const DashBoardPage = () =>
{
  // test push to see if server resets
    return(
      <div>
        <DashBoardHeader />
        <DashBoardBody />
      </div>
    );
};

export default DashBoardPage;
