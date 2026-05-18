import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function ProfilePage() {

    const { user, logoutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logoutUser();

        navigate('/');
    };

    if (!user) {

        return (
            <div className="container py-5 text-light">
                <h1>Требуется авторизация</h1>
            </div>
        );
    }

    return (
        <div className="container py-5 text-light">

            <div className="profile-card">

                <h1 className="text-danger mb-4">
                    Личный кабинет
                </h1>

                <div className="profile-info mb-4">

                    <div className="profile-label">
                        Пользователь
                    </div>

                    <div className="profile-value">
                        {user.login}
                    </div>

                </div>

                <div className="row g-4 mb-4">

                    <div className="col-md-4">
                        <div className="profile-widget">
                            <h4>Игры</h4>
                            <p>3 проекта серии</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="profile-widget">
                            <h4>Статус</h4>
                            <p>Night Traveler</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="profile-widget">
                            <h4>Сообщество</h4>
                            <p>Новый участник</p>
                        </div>
                    </div>

                </div>

                <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                >
                    Выйти
                </button>

            </div>

        </div>
    );
}

export default ProfilePage;