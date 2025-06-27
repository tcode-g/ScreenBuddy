import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';



import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import DashBoardPage from './pages/DashBoardPage.tsx'; // TEMPORARY PAGE

function App() 
{
  return (
     

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="dashboard" element={<DashBoardPage />} /> {/* TEMPORARY PAGE */}
      </Routes>
    </Router>
  );
}

export default App;

