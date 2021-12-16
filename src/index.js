const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

const route = require('./routes/route.js');

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().any());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')
//----PROJECT THREE MONGO DB STRING NAMED ---group3DataBase
mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/group3DataBase?authSource=admin&replicaSet=atlas-e7145j-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", { useNewUrlParser: true })//mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/balajiyadav?retryWrites=true&w=majority
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
 app.get('/some/route', function (req, res) {
    
 });

 app.post('/some/other/route', function (req, res) {

 });



 // middleware to catch non-existing routes
 app.use( function(req, res, next) {

     // you can do what ever you want here
     // for example rendering a page with '404 Not Found'
     res.status(404)
     res.render('error', { error: 'Not Found'});

 });