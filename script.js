function login() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'chat.html';
        } else {
            alert('Login failed');
        }
    });
}

function register() {
    let username = document.getElementById('register-username').value;
    let password = document.getElementById('register-password').value;

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
    .then(() => {
        window.location.href = 'index.html';
    });
}

function sendMessage() {
    let message = document.getElementById('message-input').value;
    socket.emit('message', { sender: 'User', message });
    document.getElementById('message-input').value = '';
}
