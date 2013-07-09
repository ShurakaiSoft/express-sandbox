/*
 * User routes
 */

//var users = require('../data/users');
var userDB = require('../data/userDB');
var notLoggedIn = require('./middleware/not_logged_in');
var loadUser = require('./middleware/load_user');
var restrictUserToSelf = require('./middleware/restrict_user_to_self');

module.exports = function(app) {
	app.get('/users', function (req, res) {
		console.log('/users', req.session.user);
		res.render('users/index', {title: 'User Index', users: userDB.getAllUsers() });
	});
	
	app.get('/users/new', loadUser, notLoggedIn, function (req, res) {
		res.render('users/new', {title: "New User"});
	});
	
	app.get('/users/:name', loadUser, restrictUserToSelf, function (req, res, next) {
		var user = userDB.getUser(req.params.name);
		if (user) {
			res.render('users/profile', {title: 'User profile', user: user});
		} else {
			next();
		}
	});
	
	app.post('/users', notLoggedIn, function (req, res) {
		if (userDB.exists(req.body.username)) {
			res.send('Conflict', 409);
		} else {
			userDB.addUser(req.body);
			req.session.user = userDB.getUser(req.body.username);
			res.redirect('/users');
		}
	});
	
	app.del('/users/:name', loadUser, function (req, res, next) {
		userDB.deleteUser(req.user.username);
		res.redirect('/users');
	});
	
};

