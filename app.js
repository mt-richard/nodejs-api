const express = require("express")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretKey = 'mysecretkey';

function authenticate(req, res, next) {
//   const authHeader = req.headers.authorization;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
//   const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    req.user = decoded.user;
    next();
  });
}


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
      const token = jwt.sign({ user: { username } }, secretKey, {expiresIn: '5m'});
    //  console.log({ token });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
  app.get('/protected', authenticate, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}!` });
  });

app.use('/users', require('./routes/users.js'))
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
});


var port = 5500
app.listen(port, function () {
    console.log(`Server running on https://localhost:${port}`)
})
