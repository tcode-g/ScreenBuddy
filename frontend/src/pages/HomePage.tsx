import PageTitle from '../components/HomePages/PageTitle.tsx';
import HomeNav from '../components/HomePages/HomeNav.tsx';

const HomePage = () =>
{

    return(
      <div className = "home-page-wrapper">
        <PageTitle />
        <HomeNav />
      </div>
    );
};

export default HomePage;