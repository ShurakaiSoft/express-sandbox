/**
 * Session routes
 */

var users = require('../data/users');

module.exports = function (app) {
	
	
	
	app.configure(function (req, res) {
		app.use(function (req, res, next) {
			res.locals.session = req.session;
			next();
		});
	});
	
	app.get('/session/new', function (req, res) {
		res.render('session/new', {title: "Log in"});
	});
	
	app.post('/session', function (req, res) {
		if (users[req.body.username] && users[req.body.username].password === req.body.password) {
			req.session.user = users[req.body.username];
			res.redirect('/users/fred');
		} else {
			res.redirect('/session/new');
		}
	});
	
	app.del('/session', function (req, res, next) {
		req.session.destroy();
		res.redirect('/users');
	});
};
