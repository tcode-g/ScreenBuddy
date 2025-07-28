import PageTitle from '../components/HomePages/PageTitle.tsx';
import HomeNav from '../components/HomePages/HomeNav.tsx';
import ResetPassword from '../components/HomePages/ResetPassword.tsx';


const ResetPage = () =>
{

    return(
      <div>
        <PageTitle />
        <HomeNav />
        <ResetPassword />
      </div>
    );
};

export default ResetPage;
