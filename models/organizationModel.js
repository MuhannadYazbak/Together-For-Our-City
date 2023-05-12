const mongoose = require('mongoose')
const Address = require('./addressModel')

const Organization = new mongoose.Schema(
	{
		associationName: { type: String, required: true, unique: true},
        associationSpeciality: { type: String, required: true},
        associationDescription: { type: String, required: true},
        activityName: { type: String, required: false}, // this will be added when creating a new activity
		activityDate: { type: Date, required: false }, // this will be added when creating a new activity
        associationAddress: {type: mongoose.Schema.Types.ObjectId, ref: 'Addresses'},
		associationWebsite: {type: String, required: true},
		associationContact: {
			contactName: { type: String, required: true },
			contactEmail: { type: String, required: true },
			contactPhone: { type: String, required: true },
			password: { type: String, required: true },
		  },
		
	},
	{ 	timestamps: true,
		collection: 'Organizations' }
)

const organizationModel = mongoose.model('Organizations', Organization)

module.exports = organizationModel;  
