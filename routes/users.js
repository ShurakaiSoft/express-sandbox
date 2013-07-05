
/*
 * GET users listing.
 */

//exports.list = function(req, res){
//  res.send("respond with a resource");
//};

var users = require('../data/users');

module.exports = function(app) {
	app.get('/users', function (req, res) {
		res.render('users/index', {title: 'User Index', users: users});
	});
	
	app.get('/users/new', function (req, res) {
		res.render('users/new', {title: "New User"});
	});
	
	app.get('/users/:name', function (req, res, next) {
		var user = users[req.params.name];
		if (user) {
			res.render('users/profile', {title: 'User profile', user: user});
		} else {
			next();
		}
	});
	
	app.post('/users', function (req, res) {
		if (users[req.body.username]) {
			res.send('Conflict', 409);
		} else {
			users[req.body.username] = req.body;
			res.redirect('/users');
		}
	});
	
	app.del('/users/:name', function (req, res, next) {
		var user = req.params.name;
		if (users[user]) {
			delete users[user];
			res.redirect('/users');
		} else {
			next();
		}
	});
	
};

