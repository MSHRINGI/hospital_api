const express = require('express');
const env = require('./config/environment');
const port = 8822;
const app = express();
const logger = require('morgan');
const db = require('./config/mongoose');

const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded({ extended : true }));
app.use(logger(env.morgan.mode, env.morgan.options));


app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port:: ${port}`);
});