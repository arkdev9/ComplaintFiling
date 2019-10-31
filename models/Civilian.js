const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Civilian = new Schema({
	_id: { type: String, required: true },
	complaints: [String]
});

module.exports = mongoose.model('Civilian', Civilian, 'civilians');