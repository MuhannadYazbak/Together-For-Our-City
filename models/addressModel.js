const mongoose = require('mongoose')

const Address = new mongoose.Schema(
	{
		city: { type: String, required: true},
        neighborhood: { type: String, required: true},
        streetNo: { type: Number, required: true},
        postalCode: { type: Number, required: false},
	},
	{ collection: 'Addresses' }
)

const AddressModel = mongoose.model('Addresses', Address)

module.exports = AddressModel;