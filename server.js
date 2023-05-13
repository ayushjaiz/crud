const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require("body-parser")
const path = require('path')

const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' })
const port = process.env.PORT || 8080;

//local request
app.use(morgan('tiny'));

//parse request to body parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"));

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/add-user', (req, res) => {
    res.render('add_user');
})

app.get('/update-user', (req, res) => {
    res.render('update_user');
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
})