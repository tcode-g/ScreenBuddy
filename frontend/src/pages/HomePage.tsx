import Welcome from '../components/Welcome.tsx';
import HomeNav from '../components/HomeNav.tsx';

const HomePage = () =>
{

    return(
      <div>
        <HomeNav />
        <Welcome />
      </div>
    );
};

export default HomePage;