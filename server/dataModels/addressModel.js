const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	city: {
		type: String,
		required: true
	  },
	  neighborhood: {
		type: String,
		required: true
	  },

	  postalCode: {type: String}
},
{collection: 'Addresses'},
)



const addressModel = mongoose.model('Addresses', addressSchema)

module.exports = addressModel;