// Файл: server.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const TwitterStrategy = require('passport-twitter').Strategy;

const app = express();

// Конфигурация сессии
app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Сериализация пользователя для сессии
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Конфигурация стратегии Twitter для использования в Passport
passport.use(new TwitterStrategy({
    consumerKey: 'wvTBXZZK8MGbH3kZKTsO8WNIa',
    consumerSecret: 'qqgARObdfEdiERaphJLyE9MhhPiV3VBNdmQrq8QWBC8dFoppRl',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }
));

// Маршруты
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Вход через Twitter</title>
    </head>
    <body>
        <button id="twitter-login-btn">Войти через Twitter</button>

        <script>
            document.getElementById('twitter-login-btn').addEventListener('click', function() {
                window.location.href = '/auth/twitter';
            });
        </script>
    </body>
    </html>
  `);
});

// Аутентификация через Twitter
app.get('/auth/twitter', passport.authenticate('twitter'));

// Обработка ответа Twitter после аутентификации
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Успешная аутентификация, перенаправление на главную страницу.
    res.redirect('/');
  });

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
