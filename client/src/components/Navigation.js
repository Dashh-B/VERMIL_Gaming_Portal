import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

function Navigation() {

    const { user } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark vermil-navbar">

            <div className="container">

                <Link className="navbar-brand vermil-logo" to="/">
                    VERMIL
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

                        <li className="nav-item">
                            <Link className="nav-link" to="/news">
                                Новости
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/games">
                                Игры
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/status">
                                Статус
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/community">
                                Сообщество
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/store">
                                Магазин
                            </Link>
                        </li>

                        {
                            user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="btn btn-danger btn-sm px-3" to="/profile">
                                            {user.login}
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Вход
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="btn btn-outline-light btn-sm px-3" to="/register">
                                            Регистрация
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navigation;