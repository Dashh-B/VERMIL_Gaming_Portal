import { useEffect, useState } from 'react';

import axios from 'axios';

function GamesPage() {

    const [games, setGames] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchGames();

    }, []);

    const fetchGames = async () => {

        try {

            const response = await axios.get(
                'http://localhost:5000/games'
            );

            setGames(response.data);

        }
        catch (error) {

            console.log(error);
        }
        finally {

            setLoading(false);
        }
    };

    const formatDate = (dateString) => {

        const date = new Date(dateString);

        return date.toLocaleDateString(
            'ru-RU'
        );
    };

    return (
        <div className="container py-5 text-light">

            <div className="mb-5">

                <h1 className="display-4 fw-bold">
                    Игры серии VERMIL
                </h1>

                <p className="text-secondary fs-5 mt-3">
                    Мрачная RPG-франшиза о выживании нечисти
                    в Европе XVII века.
                </p>

            </div>

            {
                loading ? (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-danger"
                            role="status"
                        />

                        <p className="mt-3">
                            Загрузка игр...
                        </p>

                    </div>

                ) : (

                    <div className="row g-4 align-items-stretch">

                        {
                            games.map(game => {

                                const isReleased =
                                    new Date(game.release_date)
                                    <= new Date();

                                return (

                                    <div
                                        className="col-lg-4 d-flex"
                                        key={game.id}
                                    >

                                        <div
                                            className={
                                                isReleased
                                                    ? 'store-card w-100 d-flex flex-column'
                                                    : 'store-card w-100 d-flex flex-column unreleased-game'
                                            }
                                        >

                                            <div>

                                                {game.image_url && (
                                                    <div className="game-image-wrapper">
                                                        <img
                                                            src={`http://localhost:5000${game.image_url}`}
                                                            alt={game.title}
                                                            className="game-image"
                                                        />
                                                    </div>
                                                )}

                                                <div
                                                    className="mb-3 d-flex align-items-start"
                                                    style={{ minHeight: '112px' }}
                                                >

                                                    <h2 className="text-danger fw-bold mb-0">
                                                        {game.title}
                                                    </h2>

                                                </div>

                                                <div className="mb-3">

                                                    <span className="badge bg-dark me-2">
                                                        {game.genre}
                                                    </span>

                                                    <span className="badge bg-secondary">
                                                        {game.rating}
                                                    </span>

                                                </div>

                                                <p className="mb-4">

                                                    <strong>
                                                        Релиз:
                                                    </strong>

                                                    {' '}

                                                    {formatDate(game.release_date)}

                                                </p>

                                            </div>

                                            <div className="flex-grow-1">

                                                <p className="text-secondary">
                                                    {game.description}
                                                </p>

                                            </div>

                                            <div className="mt-4">

                                                {
                                                    isReleased ? (

                                                        <button className="btn btn-danger w-100">
                                                            Подробнее
                                                        </button>

                                                    ) : (

                                                        <button
                                                            className="btn btn-secondary w-100"
                                                            disabled
                                                        >
                                                            Еще не вышла
                                                        </button>

                                                    )
                                                }

                                            </div>

                                        </div>

                                    </div>
                                );
                            })
                        }

                    </div>
                )
            }

        </div>
    );
}

export default GamesPage;