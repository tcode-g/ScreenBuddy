import PageTitle from '../components/PageTitle.tsx';
import Signup from '../components/Signup.tsx';
import HomeNav from '../components/HomeNav.tsx';

const SignupPage = () =>
{

    return(
      <div>
        <HomeNav />
        <PageTitle />
        <Signup />
      </div>
    );
};

export default SignupPage;