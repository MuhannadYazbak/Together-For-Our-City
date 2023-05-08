const mongoose = require('mongoose')
const Address = require('./addressModel');

const User = new mongoose.Schema(
	{
		firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        phone: { type: [Number], required: true},
		password: { type: String, required: true },
        type: {type: String, required: false},
		status: {type: String, required: false},
		address: {type: String, required: true},
		birthDate: {type: Date, required: true},
		gender: {type: String, required: true},
		registerDate: {type: Date, required: false},
		lastSeen: {type: Date, required: false},
		resetPasswordToken : { type: String, required: false },
		joinedActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activities' }],
	},
	
	{ 	timestamps: true,
		collection: 'Users' }
)

const userModel = mongoose.model('Users', User)

module.exports = userModel;