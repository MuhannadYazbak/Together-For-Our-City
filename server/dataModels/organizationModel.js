const mongoose = require('mongoose');

const assocDetailsSchema = new mongoose.Schema({
    assocName: { type: String, required: true },
            assocDescription: { type: String, required: true },
            assocSpeciality: { type: String, required: true },
            assocWebsite: { type: String, required: true }
}
);

const addressDetailsSchema = new mongoose.Schema({
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true }
});

const contactDetailsSchema = new mongoose.Schema({
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            phone: { type: String, required: true },
            password: { type: String, required: true }
});

const Organization = new mongoose.Schema(
    {
        assocDetails: { type: assocDetailsSchema, required: true },
            // assocName: { type: String, required: true },
            // assocDescription: { type: String, required: true },
            // assocSpeciality: { type: String, required: true },
            // assocWebsite: { type: String, required: true }
       // },

        addressDetails: { type: addressDetailsSchema, required: true},
        //     city: { type: String, required: true },
        //     neighborhood: { type: String, required: true },
        //     street: { type: String, required: true },
        //     postalCode: { type: String, required: true },
        // },
        contactDetails: { type: contactDetailsSchema, required: true },
            // firstName: { type: String, required: true },
            // lastName: { type: String, required: true },
            // email: { type: String, required: true, unique: true },
            // phone: { type: String, required: true },
            // password: { type: contactDetailsSchema, required: true }
        //}
    },
    {
        timestamps: true,
        collection: 'Orgs'
    }
)
const organizationModel = mongoose.model('Orgs', Organization)

module.exports = organizationModel

