require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require("body-parser")
const path = require('path')

const port = process.env.PORT || 8080;
const dbConnect = require('./server/database/conn')

//database coonection
dbConnect(process.env.MONGODB_URL)

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

//setting routes
app.use('/', require('./server/routes/router'))

//listening to server
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
})