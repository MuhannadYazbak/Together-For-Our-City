const mongoose = require('mongoose');
const Address = require('./addressModel');

const User = new mongoose.Schema(
	{
		firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        phone: { type: [String], required: false},
		password: { type: String, required: true },
        address: {type: mongoose.Schema.Types.ObjectId, ref: 'Addresses'},
        userType: {type: String, enum: ['Normal', 'Contact', 'Admin'], default: 'Normal', required: true},
        userStatus: {type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true},
        birthDate: {type: Date, required: true},
		gender: {type: String, required: true},
		joinedActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activities' }],
	},
	{ timestamps: true, collection: 'Users' }
);

const userModel = mongoose.model('Users', User);

module.exports = userModel;
