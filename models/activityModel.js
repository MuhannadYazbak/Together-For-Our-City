const mongoose = require('mongoose')
const Address = require('./addressModel')
const User = require('./userModel')

const Activity = new mongoose.Schema(
	{
		associationName: { type: String, required: true},
        associationSpeciality: { type: String, required: true},
        associationDescription: { type: String, required: true},
        activityName: { type: String, required: false},
		activityDate: { type: Date, required: true },
        associationAddress: {type: String, required: true},
		associationWebsite: {type: String, required: true},
		associationContact: {type: String, required: true}
	},
	{ collection: 'Activities' }
)

const ActivityModel = mongoose.model('Activities', Activity)

module.exports = ActivityModel;