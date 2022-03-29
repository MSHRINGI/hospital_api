const express = require('express');
const port = 8822;
const app = express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded({ extended : true }));

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port:: ${port}`);
});