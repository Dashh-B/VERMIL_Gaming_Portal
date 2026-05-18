import { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

function CommunityPage() {

    const { user } = useContext(AuthContext);

    const [comments, setComments] = useState([]);

    const [guestName, setGuestName] = useState('');
    const [message, setMessage] = useState('');

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchComments();

    }, []);

    const fetchComments = async () => {

        try {

            const response = await axios.get(
                'http://localhost:5000/comments'
            );

            setComments(response.data);

        }
        catch (error) {

            console.log(error);
        }
        finally {

            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');

        if (!message.trim()) {

            setError('Введите сообщение');

            return;
        }

        if (!user && !guestName.trim()) {

            setError('Введите имя');

            return;
        }

        try {

            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:5000/comments',
                {
                    guestName,
                    message
                },
                {
                    headers: token
                        ? {
                            Authorization: `Bearer ${token}`
                        }
                        : {}
                }
            );

            setMessage('');

            if (!user) {
                setGuestName('');
            }

            fetchComments();

        }
        catch (error) {

            console.log(error);

            setError('Ошибка отправки');
        }
    };

    return (
        <div className="container py-5 text-light">

            <h1 className="mb-4">
                Сообщество
            </h1>

            <div className="row g-4">

                <div className="col-lg-5">

                    <div className="community-card">

                        <h3 className="mb-4 text-danger">
                            Новый комментарий
                        </h3>

                        <form onSubmit={handleSubmit}>

                            {
                                !user && (
                                    <div className="mb-3">

                                        <label className="form-label">
                                            Имя
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={guestName}
                                            onChange={(e) =>
                                                setGuestName(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>
                                )
                            }

                            {
                                user && (
                                    <div className="mb-3">

                                        <div className="logged-user-badge">
                                            Автор:
                                            {' '}
                                            <strong>
                                                {user.login}
                                            </strong>
                                        </div>

                                    </div>
                                )
                            }

                            <div className="mb-4">

                                <label className="form-label">
                                    Сообщение
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="5"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                />

                            </div>

                            {
                                error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )
                            }

                            <button className="btn btn-danger w-100">
                                Опубликовать
                            </button>

                        </form>

                    </div>

                </div>

                <div className="col-lg-7">

                    <div className="community-card">

                        <h3 className="mb-4 text-danger">
                            Обсуждения
                        </h3>

                        {
                            loading ? (
                                <p>Загрузка...</p>
                            ) : (
                                comments.map(comment => (

                                    <div
                                        className="comment-item"
                                        key={comment.id}
                                    >

                                        <div className="comment-header">

                                            <div>

                                                <strong>
                                                    {comment.username}
                                                </strong>

                                            </div>

                                            <span className="comment-date">
                                                {
                                                    new Date(
                                                        comment.created_at
                                                    ).toLocaleDateString()
                                                }
                                            </span>

                                        </div>

                                        <p className="mb-0">
                                            {comment.message}
                                        </p>

                                    </div>

                                ))
                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CommunityPage;