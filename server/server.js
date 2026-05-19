const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('VERMIL API работает');
});

app.post('/register', async (req, res) => {

    try {

        const { login, password } = req.body;

        const existingUser = await pool.query(
            'SELECT * FROM users WHERE login = $1',
            [login]
        );

        if (!login || !password) {

            return res.status(400).json({
                error: 'Заполните все поля'
            });
        }

        if (
            login.trim() === '' ||
            password.trim() === ''
        ) {

            return res.status(400).json({
                error: 'Некорректные данные'
            });
        }

        if (existingUser.rows.length > 0) {

            return res.status(400).json({
                error: 'Логин уже занят'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users(login, password) VALUES($1, $2)',
            [login, hashedPassword]
        );

        res.json({ message: 'Регистрация успешна' });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/login', async (req, res) => {

    try {

        const { login, password } = req.body;

        if (!login || !password) {

            return res.status(400).json({
                error: 'Заполните все поля'
            });
        }

        const user = await pool.query(
            'SELECT * FROM users WHERE login = $1',
            [login]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({
                error: 'Пользователь не найден'
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(400).json({
                error: 'Неверный пароль'
            });
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id,
                login: user.rows[0].login
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        res.json({ token });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.get('/games', async (req, res) => {

    try {

        const games = await pool.query(
            'SELECT * FROM games ORDER BY id ASC'
        );

        res.json(games.rows);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});

app.get('/comments', async (req, res) => {

    try {

        const comments = await pool.query(
            'SELECT * FROM comments ORDER BY id DESC'
        );

        res.json(comments.rows);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});

app.post('/comments', async (req, res) => {

    try {

        const authHeader = req.headers.authorization;

        let username;
        let isAnonymous = true;

        if (authHeader) {

            try {

                const token = authHeader.split(' ')[1];

                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

                username = decoded.login;

                isAnonymous = false;

            }
            catch {
                console.log('Неверный токен');
            }
        }

        const { guestName, message } = req.body;

        if (!message || message.trim() === '') {

            return res.status(400).json({
                error: 'Сообщение пустое'
            });
        }

        if (isAnonymous) {

            if (!guestName || guestName.trim() === '') {

                return res.status(400).json({
                    error: 'Введите имя'
                });
            }

            const anonymousComments = await pool.query(
                `
                SELECT username
                FROM comments
                WHERE username LIKE '%Аноним#%'
                `
            );

            let maxNumber = 0;

            anonymousComments.rows.forEach(comment => {

                const match = comment.username.match(
                    /Аноним#(\d+)/
                );

                if (match) {

                    const number = Number(match[1]);

                    if (number > maxNumber) {
                        maxNumber = number;
                    }
                }
            });

            username =
                `${guestName} (Аноним#${maxNumber + 1})`;
        }

        await pool.query(
            `
            INSERT INTO comments(username, message)
            VALUES($1, $2)
            `,
            [username, message]
        );

        res.json({
            message: 'Комментарий добавлен'
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            error: 'Ошибка сервера'
        });
    }
});