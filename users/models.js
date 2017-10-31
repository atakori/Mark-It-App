const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
	userName: {
		type:String,
		required: true,
		unique: true
	},
	password: {
		type:String,
		required:true,
	},
		firstName: {type: String, default: ''},
    	lastName: {type: String, default: ''}
	})

UserSchema.methods.apiRepr = function() {
    return {
        userName: this.userName || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
    };
};

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = {User};