/**
 * New node file
 */

var fs = require('fs');

var db = null;

function getInstance() {
	if (!db) {
		console.log("loaded DB");
		db = require('./users');
	}
	return db;
}

function saveDB(db) {
	console.log('writing file');
	fs.writeFile('./data/users.json', JSON.stringify(db), function (err) {
		if (err) {
			console.log("Error: problem while saving db.", err);
		}
	});
}

function validate(username, password) {
	var db = getInstance();
	return (db[username] && db[username].password === password);
}

function getUser(username) {
	var db = getInstance();
	return db[username] || {};
}

function getAllUsers() {
	return getInstance();
}

function exists(username) {
	var db = getInstance();
	return (db[username]);
}

function addUser(userData) {
	var db = getInstance();
	db[userData.username] = userData;
	saveDB(db);
}

function deleteUser(username) {
	var db = getInstance();
	delete db[username];
	saveDB(db);
}


module.exports = {
		validate: validate,
		getUser: getUser,
		getAllUsers: getAllUsers,
		exists: exists,
		addUser: addUser,
		deleteUser: deleteUser
};