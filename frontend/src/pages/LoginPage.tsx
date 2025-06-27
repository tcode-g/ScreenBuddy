import PageTitle from '../components/HomeScreen/PageTitle.tsx';
import Login from '../components/HomeScreen/Login.tsx';
import HomeNav from '../components/HomeScreen/HomeNav.tsx';

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
