var Promise = require('bluebird');
var crypto = require('crypto');
var encode = require('hashcode').hashCode;
var database = require('./database.js');

let uuid = () => randomHex() + '-' + randomHex() + '-' + randomHex() + '-' + randomHex();
let randomHex = () => crypto.randomBytes(4).toString('hex');

let checkAuth = authCookie =>
    Promise.resolve({
		userID: authCookie,
		isValid: typeof authCookie !== 'undefined' && verifyIfUserExists(authCookie)
	});

let verifyIfUserExists = authCookie =>
    database
        .getUser(authCookie)
        .then(user => {
            console.log('User', user);
            return typeof user !== 'undefined';
        })
        .catch(err => {
            console.error('Failed to check User ' + authCookie, err.stack);
            return false;
        });

let validateUserInfo = userInfo => {
	let content = {
        firstName: (userInfo && userInfo.firstName) || "",
        lastName: (userInfo && userInfo.lastName) || "",
        company: (userInfo && userInfo.company) || "",
        table: (userInfo && userInfo.table) || "",
    };

    let error; 
    if (!content.firstName)
        error = 'First name is empty';
    else if (!content.lastName)
        error = 'Last name is empty';
    else if (!content.company)
        error = 'Company is empty';
    else if (!content.table || isNaN(content.table))
        error = 'Table number is invalid';

    content.error = error;
    content.isValid = typeof error === 'undefined';

    if (content.isValid)
    	generateUserID(content);
    return content;
};

let generateUserID = (userInfo) => {
    let userID =
    	encode().value(JSON.stringify({
        	firstName: userInfo.firstName,
	        lastName: userInfo.lastName,
	        company: userInfo.company,
	        table: userInfo.table
	    })).toString();
    userInfo.userID = userID;
};

let createUserIfRequired = userInfoValidationResult => {
    if (!userInfoValidationResult.isValid)
        return userInfoValidationResult;

    return userInfoValidationResult.isValid &&
        database
            .createUser(
                userInfoValidationResult.userID,
                userInfoValidationResult.firstName,
                userInfoValidationResult.lastName,
                userInfoValidationResult.company,
                userInfoValidationResult.table)
            .then(() => userInfoValidationResult)
            .catch(err => {
                userInfoValidationResult.error = 'Failed to create user';
                userInfoValidationResult.isValid = false;
            	console.error(userInfoValidationResult.error, err.stack);
                return userInfoValidationResult;
            });
};

module.exports = {
    uuid: uuid,
    checkAuth: checkAuth,
    validateUserInfo: validateUserInfo,
    createUserIfRequired: createUserIfRequired
};