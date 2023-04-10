const mongoose = require('mongoose')
const Address = require('./addressModel');

const User = new mongoose.Schema(
	{
		firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        phone: { type: [Number], required: false},
		password: { type: String, required: true },
        type: {type: String, required: true},
		status: {type: String, required: true},
		address: {type: Address, required: true},
		birthDate: {type: Date, required: true},
		gender: {type: String, required: true},
		registerDate: {type: Date, required: true},
		lastSeen: {type: Date, required: false}
	},
	
	{ 	timestamps: true,
		collection: 'Users' }
)

const userModel = mongoose.model('Users', User)

module.exports = userModel;