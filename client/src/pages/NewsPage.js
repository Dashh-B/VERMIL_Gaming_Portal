import { useState } from 'react';

function NewsPage() {

    const [category, setCategory] = useState('updates');

    const news = {
        updates: {
            title: 'Обновление Moontrade 1.4',
            text: 'Добавлены новые торговые маршруты и события.'
        },

        events: {
            title: 'Ночь Кровавой Луны',
            text: 'В игре стартовало временное событие.'
        },

        dev: {
            title: 'Дневник разработки VERMIL III',
            text: 'Разработчики рассказали о кастомизации персонажа.'
        }
    };

    return (
        <div className="container py-5 text-light">

            <h1 className="mb-4">Новости</h1>

            <div className="d-flex gap-3 mb-4 flex-wrap">

                <button
                    className={`btn ${category === 'updates' ? 'btn-danger' : 'btn-outline-light'}`}
                    onClick={() => setCategory('updates')}
                >
                    Обновления
                </button>

                <button
                    className={`btn ${category === 'events' ? 'btn-danger' : 'btn-outline-light'}`}
                    onClick={() => setCategory('events')}
                >
                    События
                </button>

                <button
                    className={`btn ${category === 'dev' ? 'btn-danger' : 'btn-outline-light'}`}
                    onClick={() => setCategory('dev')}
                >
                    Разработка
                </button>

            </div>

            <div className="card bg-dark border-secondary text-light">

                <div className="card-body">

                    <h2 className="text-danger">
                        {news[category].title}
                    </h2>

                    <p className="mb-0">
                        {news[category].text}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default NewsPage;