var express = require('express');
var router = express.Router();
const authMiddleWare = require('../middlewares/authMiddleware');

// required Contoller
var user_controller = require('../controllers').user;

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send("Hello World New 2 docker new" + process.env.ENV_VAR_CUSTOM);
});

router.get('/users', user_controller.list);
router.get('/users/detail', user_controller.detail);
router.post('/users/post', authMiddleWare, user_controller.post);
router.post('/users/create', user_controller.create);
router.post('/login', user_controller.login);

module.exports = router;
