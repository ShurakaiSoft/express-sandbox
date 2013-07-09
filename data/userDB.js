/**
 * New node file
 */

var db = null;

function getInstance() {
	if (!db) {
		console.log("loaded DB");
		db = require('./users');
	}
	return db;
}

function validate(username, password) {
	var db = getInstance();
	return (db[username] && db[username].password === password);
}

function getUser(username) {
	var db = getInstance();
	return db[username] || {};
}


module.exports = {
		validate: validate,
		getUser: getUser
};