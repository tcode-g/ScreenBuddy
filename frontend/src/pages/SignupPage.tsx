import PageTitle from '../components/HomePages/PageTitle.tsx';
import Signup from '../components/HomePages/Signup.tsx';
import HomeNav from '../components/HomePages/HomeNav.tsx';

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