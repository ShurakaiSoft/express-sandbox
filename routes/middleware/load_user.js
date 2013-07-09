/**
 * Load fake user db
 */

//var users = require('../../data/users');

var userDB = require('../../data/userDB');

function loadUser(req, res, next) {
	var user = req.user = userDB.getUser(req.params.name);
	if (!user) {
		res.send("Not found", 404);
	} else {
		next();
	}
}


module.exports = loadUser;