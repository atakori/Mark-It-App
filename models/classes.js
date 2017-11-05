const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const classSchema = mongoose.Schema({
	className: {
		type:String,
		required: true,
	},
	genre: {
		type:String,
		required:true,
	},
	difficulty: {type: String},
    choreographer: {type: String},
    studio: {
    	name: {type:String},
    	address: {
				street: {type:String},
				city: {type:String} ,
				state: {type:String},
				zipcode: {type:String}
			}
    	},
    weeklyDayandTime: {
		type:String,
		required: true,
	},
	dateCreated: {type: Date, default: Date.now},
	description: {type:String},
	currentStudents: [String],
	currentVideos: [String]
	})

classSchema.virtual('addressString').get(function() {
  return `${this.studio.address.street} ${this.studio.address.city}, 
  ${this.studio.address.state} ${this.studio.address.zipcode}`.trim()});

classSchema.methods.apiRepr = function() {
    return {
    	id:this._id,
        className: this.className,
        genre: this.genre,
        difficulty: this.difficulty,
        choreographer: this.choreographer,
        studioName: this.studio.name,
        studioAddress: this.addressString,
        weeklyDayandTime: this. weeklyDayandTime,
        dateCreated: this.dateCreated,
        description: this.description,
        currentStudents: this.currentStudents,
        currentVideos: this.currentVideos
    };
};

const Class = mongoose.model('Class', classSchema);

module.exports = {Class};