var fs = require("fs");

var usersArr;

try {
	usersArr = JSON.parse(fs.readFileSync("./users.json"));
} catch (e) {
	usersArr = [];
}

//Check if user exists, if so return that user

function userExists (username) {
	for (var i = 0; i <usersArr.length; i++){
		if(usersArr[i].username === username){
			return usersArr[i];
		}
	}
	return undefined;
}

//Check that username and password match a user in our database. 

function checkLogin (username, password){
	var user = userExists(username);
	if(user && user.password === password){
		return true;
	}
	return false;
}

//Refister a new user, confirm registration was successful, check that username is unique

function registerUser(username, password) {
	if(userExists(username) || username == undefined || username == " " || password == undefined) {
		return false;
	}
	//Store users in object
	usersArr.push({
		username: username,
		password: password
	});
	//Save users as JSON
	saveAllUsers();
	return true;
}

//Convert array of users into a JSON string, save it 

function saveAllUsers(){
	fs.writeFile(
		"./users.json",
		JSON.stringify(usersArr),
		function(err){
			if (err) {
				console.log(err);
			}
		});
}

//Functions as properties on an object

module.exports = {
	userExists : userExists,
	checkLogin: checkLogin,
	registerUser : registerUser,
	saveAllUsers : saveAllUsers
};





