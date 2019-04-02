/**
 * User specific routes method goes here.
 * 
 */
// Display list of all Genre.
let User = {};
User.list = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre list');
};

User.detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail');
};

User.post = function(req, res) {
    //console.log(req);
    console.log(req.body.key);
    res.send('NOT IMPLEMENTED: Genre post');
};

module.exports = User;