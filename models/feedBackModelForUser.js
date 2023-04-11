const mongoose = require('mongoose')

const UserFeedback = new mongoose.Schema(
	{
		userID: { type: String, required: true}, // The volunteer to be rated
        contactID: { type: String, required: true}, // The organization's contact to give the feedback
        feedbackText: { type: String, required: true, unique: true },
		rate: { type: Number, required: true },
	},
	{ 	timestamps: true,
		collection: 'UserFeedback' }
)

const UserFeedbackModel = mongoose.model('UserFeedback', UserFeedback)

module.exports = UserFeedbackModel;