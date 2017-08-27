var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./module/api/api');


//SETUP PARSE SERVER
var Parse = require('parse/node');
Parse.initialize("APPLICATION_ID");
Parse.serverURL = 'http://minorproject.herokuapp.com/parse';
var app = express();

//post data json decode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//SESSION MANAGEMENT
var session = require('express-session');
app.use(session({ secret: 'AKshay-H89gS-!@Hu85-AShish', cookie: { maxAge: 60000 } }));


//API 

app.use("/API",api);
//LOGIN
app.use("/login", function (req, res, next) {
    if (req.session.user) {
        res.redirect("/dashboard");
    } else next();
})
app.use('/login', express.static(path.join(__dirname, '/module/login')));
app.post("/login", function (req, res) {
    Parse.User.logIn(req.body.email, req.body.password, {
        success: function (user) {
            req.session.user = user.id;
            res.redirect("/dashboard");
        },
        error: function (user, error) {
            console.log(req.body.email, req.body.password);
            res.send(error);
        }
    });

})



//Register
app.use("/register", function (req, res, next) {
    if (req.session.user) {
        res.redirect("/dashboard");
    } else next();
})
app.use('/register', express.static(path.join(__dirname, '/module/register')));
app.post("/register", function (req, res) {
    console.log(req.body);
    var user = new Parse.User();
    user.set("username", req.body.email);
    user.set("password", req.body.password);
    user.set("name", req.body.name);
    user.set("phone", req.body.phone);

    user.signUp(null, {
        success: function (user) {
            res.send("Login Success Redirection");
            res.redirect("/login");
        },
        error: function (user, error) {
            console.log(error);
            res.send(error);
        }
    });

})

//DASHBOARD
app.use("/dashboard", function (req, res, next) {
    next();//bypass login
    // if (req.session.user) {
    //     next();
    // } else res.redirect("/login");
})
app.use("/dashboard", express.static(path.join(__dirname, '/module/dashboard')));


//OTHERWISE
app.use("*", function (req, res) {
    if (req.session.user) {
        res.redirect("/dashboard");
    } else {
        res.redirect("/login");
    }
})
app.listen(3000);