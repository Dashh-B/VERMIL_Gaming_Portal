import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

function LoginPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { loginUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!login || !password) {
            setError('Заполните все поля');
            return;
        }

        try {

            const response = await axios.post(
                'http://localhost:5000/login',
                {
                    login,
                    password
                }
            );

            loginUser(response.data.token, login);

            navigate('/profile');

        }
        catch (error) {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div className="auth-wrapper">

            <form className="auth-card" onSubmit={handleSubmit}>

                <h1 className="mb-4 text-center text-danger">
                    Вход
                </h1>

                {
                    error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )
                }

                <div className="mb-3">
                    <label className="form-label">
                        Логин
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">
                        Пароль
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-danger w-100 mb-3">
                    Войти
                </button>

                <div className="text-center">
                    <Link className="auth-link" to="/register">
                        Нет аккаунта?
                    </Link>
                </div>

            </form>

        </div>
    );
}

export default LoginPage;