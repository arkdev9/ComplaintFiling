const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
	status: { type: String, default: "Created"},
	complaint_number: { type: Number },
	type: { type: String, required: true },
	date: { type: Date },
	area: { type: String },
	mobile: { type: String},
	crime: { type: String }
});

module.exports = mongoose.model('Complaint', ComplaintSchema, 'complaints');