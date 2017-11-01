const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
	username: {
		type:String,
		required: true,
	},
	password: {
		type:String,
	/*	required:true,*/
	},
		firstname: {type: String},
    	lastname: {type: String}
	})

UserSchema.methods.apiRepr = function() {
    return {
        username: this.username || '',
        firstName: this.firstname || '',
        lastName: this.lastname || ''
    };
};

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = {User};