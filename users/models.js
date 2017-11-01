const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
	username: {
		type:String,
		required: true,
		unique: true
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
        username: this.userName || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
    };
};

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = {User};