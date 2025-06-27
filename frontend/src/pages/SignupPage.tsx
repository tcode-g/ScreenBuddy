import PageTitle from '../components/HomeScreen/PageTitle.tsx';
import Signup from '../components/HomeScreen/Signup.tsx';
import HomeNav from '../components/HomeScreen/HomeNav.tsx';

const SignupPage = () =>
{

    return(
      <div>
        <PageTitle />
        <HomeNav />
        <Signup />
      </div>
    );
};

export default SignupPage;