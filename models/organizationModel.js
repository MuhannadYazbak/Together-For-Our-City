const mongoose = require('mongoose')
const Address = require('./addressModel')

const Organization = new mongoose.Schema(
	{
		associationName: { type: String, required: true, unique: true},
        associationSpeciality: { type: String, required: true},
        associationDescription: { type: String, required: true},
        activityName: { type: String, required: false},
		activityDate: { type: Date, required: true },
        associationAddress: {type: Address, required: true},
		associationWebsite: {type: String, required: true},
		associationContact: {type: Collection, required: true}
	},
	{ 	timestamps: true,
		collection: 'Organizations' }
)

const organizationModel = mongoose.model('Organizations', Organization)

module.exports = organizationModel;