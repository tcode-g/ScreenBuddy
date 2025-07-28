import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';



import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import DashBoardPage from './pages/DashBoardPage.tsx'; // TEMPORARY PAGE
import DeniedPage from './pages/DeniedPage.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import EmailVerification from './pages/EmailVerification.tsx';
import ResetPage from './pages/ResetPage.tsx';
import ResetPasswordFormPage from './pages/ResetPasswordFormPage.tsx';
import SettingPage from './pages/SettingPage.tsx';
import BuddyPage from './pages/BuddyPage.tsx';
import ShopPage from './pages/ShopPage.tsx';
import StatsPage from './pages/StatsPage.tsx';

function App() 
{
  return (
     

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/denied" element={<DeniedPage />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/reset/:token" element={<ResetPasswordFormPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<DashBoardPage />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="buddy" element={<BuddyPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="shop" element={<ShopPage />} />
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;

