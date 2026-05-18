import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';

import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import GamesPage from './pages/GamesPage';
import StatusPage from './pages/StatusPage';
import CommunityPage from './pages/CommunityPage';
import StorePage from './pages/StorePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <div className="app-wrapper">

            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>

        </div>
    );
}

export default App;