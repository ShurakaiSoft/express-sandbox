/**
 * New node file
 */

function notLoggedIn(req, res, next) {
	console.log("middleware not logged in:", req.session.user);
	if (req.session.user) {
		res.send('Unauthorized', 401);
	} else {
		next();
	}
}

module.exports = notLoggedIn;