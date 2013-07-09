/**
 * session routes
 */


var userDB = require('../data/userDB');
var notLoggedIn = require('./middleware/not_logged_in');

module.exports = function (app) {
		
	app.get('/session/new', notLoggedIn, function (req, res) {
		res.render('session/new', { title: "Log in" });
	});
	
	app.post('/session', notLoggedIn, function (req, res) {
		if (userDB.validate(req.body.username, req.body.password)) {
			req.session.user = userDB.getUser(req.body.username);
			res.redirect('/users');
		} else {
			res.redirect('/session/new');
		}
	});
	
	app.del('/session', function (req, res) {
		req.session.destroy();
		res.redirect('/users');
	});
};
