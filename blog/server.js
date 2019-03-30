'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const secretKey = "MySuperSecretKey";

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://guilherme:alemao@cluster0-ygfip.mongodb.net/test?retryWrites=true/blog',
function(err) {
    if (err) { console.error("error! " + err)}
});

mongoose.connection.on('error', function(erro){
    console.log('Mongoose! Erro na conexão: ' + erro);
});

mongoose.connection.on('connected', function(){
    console.log('Mongoose conetado!');
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose Desconectado!');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose! Desconectado pelo término da aplicação');
        process.exit(0);
    });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Post = require('./model/post');
const User = require('./model/user');

const router = express.Router();
app.use('/', express.static(__dirname+'/'));

//middleare: irá rodar em todas as requisições
router.use(function(req, res, next) {
    console.warn(req.method + " " + req.url + 
    " with " + JSON.stringify(req.body));
    next();
});
//middleware: auth
const auth = function(req, res, next) {
    const token = req.body.token || req.query.token 
    || req.headers['x-access-token'];
    console.log('req.body.token', req.body.token);
    if (token) {
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                return res.status(403).send({
                    sucess: false,
                    message: 'Access denied'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            sucess: false,
            message: 'Access denied'
        });
    }
}

//simple GET / test
router.get('/', function(req, res) {
    res.json({ message: 'hello world!' });
})

router.route('/users')
.get(auth, function(req, res) {
    User.find(function (err, users) {
        if (err)
        res.send(err);
        res.json(users);
    });
})
.post(function (req, res) {
    let user = new User();
    user.name = req.body.name;    
    user.login = req.body.login;
    user.password = req.body.password;
    user.save(function (err) {
        if (err)
        res.send(err);
        res.json(user);
    });
});

router.route('/login')
.post(function (req, res) {    
    if (req.body.isNew) {
        User.findOne({ login: req.body.login }, 'name')
        .exec(function (err, user) {
            if (err) res.send(err);
            if (user != null) {
                res.status(400).send('Login Existente');
            } else {
                let newUser = new User();
                newUser.name = req.body.name;
                newUser.login = req.body.login;
                newUser.password = req.body.password;
                newUser.save(function (err) {
                    if (err) res.send(err);
                    const token = jwt.sign(newUser, secretKey, {
                        expiresIn: '1h'
                    });
                    res.json({ user: newUser, token: token });
                });
            }
        });
    } else {        
        User.findOne({ login: req.body.login,
            password: req.body.password }, 'name')
        .exec(function (err, user) {            
            if (err) res.send(err);
            if (user != null) {                
                const token = jwt.sign(user.toJSON(), secretKey, {
                    expiresIn: '1h'
                });token
                console.log('token', token);
                res.json({ user: user, token: token });
            }else{
                res.status(400).send('Login/Senha incorretos');
            }
        });
    }
});

router.route('/posts/:post_id?')
.get(function (req, res) {
    Post
    .find()
    .sort([['date', 'descending']])
    .populate('user', 'name')
    .exec(function (err, posts) {
        if (err) res.send(err);
        res.json(posts);
    });
})
.post(auth, function (req, res) {
    let post = new Post();
    post.title = req.body.title;
    post.text = req.body.text;
    post.user = req.body.user._id;
    if (post.title == null) 
    res.status(400).send('Título não pode ser nulo');
    post.save(function(err) {
        if (err)
        res.send(err);
        res.json(post);
    });
})
.delete(auth, function(req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function(err, post) {
        if (err)
        res.send(err);
        res.json({ message: 'Successfully deleted'});
    });
});

app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Listen: ' + port);