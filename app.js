const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', require('./routes/users.js'))
app.get('/', function(req, res) {
    res.send("Working great")
});


var port = 5500
app.listen(port, function () {
    console.log(`Server running on https://localhost:${port}`)
})
