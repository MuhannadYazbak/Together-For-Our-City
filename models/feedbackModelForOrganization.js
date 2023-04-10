const mongoose = require('mongoose')

const OrganizationFeedback = new mongoose.Schema(
	{
		userID: { type: String, required: true}, // The volunteer giving the rate
        organizationID: { type: String, required: true}, // The organization to be rated
        feedbackText: { type: String, required: true, unique: true },
		rate: { type: Number, required: true },
	},
	{ 	timestamps: true,
		collection: 'OrganizationFeedback' }
)

const OrganizationFeedbackModel = mongoose.model('OrganizationFeedback', OrganizationFeedback)

module.exports = OrganizationFeedbackModel;