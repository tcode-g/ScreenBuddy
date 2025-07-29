import PageTitle from '../components/HomePages/PageTitle.tsx';
import HomeNav from '../components/HomePages/HomeNav.tsx';
import buddies from '../components/Buddies.tsx';

const HomePage = () =>
{

    return(
      <div>
        <PageTitle />
        <HomeNav />
        <img src={buddies.circlePink} alt="Circle Pink" className="circle-pink" style={{ width: "15rem", height: "15rem" }} />
      </div>
    );
};

export default HomePage;