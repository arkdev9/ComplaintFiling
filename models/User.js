const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 5;

const User = new Schema({
	password: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	mobile: { type: String, required: true },
	role: { type: String, required: true }
});

User.pre('save', function (next) {
	const user = this;

	// Only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// Hash the password again
	bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
		console.log(hash);
		if (err) return next(err);

		// Set the hash in place of the cleartext password
		user.password = hash;
		next();
	});
});

User.methods.comparePassword = function (inp_pass, cb) {
	console.log(this.password);
	bcrypt.compare(inp_pass, this.password, function (err, isMatch) {
		console.log(isMatch);
		if (err) return cb(err);
		return cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', User, 'users');