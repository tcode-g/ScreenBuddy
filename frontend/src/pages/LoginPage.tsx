import PageTitle from '../components/HomePages/PageTitle.tsx';
import Login from '../components/HomePages/Login.tsx';
import HomeNav from '../components/HomePages/HomeNav.tsx';

const LoginPage = () =>
{

    return(
      <div>
        <PageTitle />
        <HomeNav />
        <Login />
      </div>
    );
};

export default LoginPage;
