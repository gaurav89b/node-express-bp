var express = require('express');
var router = express.Router();

// required Contoller
var user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send("Hello World New");
});

router.get('/users', user_controller.list);
router.get('/users/detail', user_controller.detail);
router.post('/users/post', user_controller.post);

module.exports = router;
