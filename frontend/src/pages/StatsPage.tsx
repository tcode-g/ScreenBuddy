import GenStats from "../components/DashboardPages/children components/GenStats";
import DashBoardHeader from '../components/DashboardPages/DashBoardHeader.tsx';

const StatsPage = () =>
{
    return(
        <div>
            <DashBoardHeader />
            <GenStats />
        </div>
    );
}

export default StatsPage;