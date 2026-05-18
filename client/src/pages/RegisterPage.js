import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!login || !password) {
            setMessage('Заполните все поля');
            return;
        }

        try {

            await axios.post(
                'http://localhost:5000/register',
                {
                    login,
                    password
                }
            );

            navigate('/login');

        }
        catch (error) {
            setMessage('Пользователь уже существует');
        }
    };

    return (
        <div className="auth-wrapper">

            <form className="auth-card" onSubmit={handleSubmit}>

                <h1 className="mb-4 text-center text-danger">
                    Регистрация
                </h1>

                {
                    message && (
                        <div className="alert alert-danger">
                            {message}
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
                    Создать аккаунт
                </button>

                <div className="text-center">
                    <Link className="auth-link" to="/login">
                        Уже есть аккаунт?
                    </Link>
                </div>

            </form>

        </div>
    );
}

export default RegisterPage;