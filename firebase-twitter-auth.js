document.getElementById('twitter-login-btn').addEventListener('click', function() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        // Это дает вам токен доступа к Twitter. Вы можете использовать его для доступа к Twitter API.
        const token = result.credential.accessToken;
        const secret = result.credential.secret;
        // Зарегистрированный пользователь
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        console.error(error);
    });
});
