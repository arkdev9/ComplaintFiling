var express = require('express');
var User = require('../models/User');
var router = express.Router();

router.get('/login', function (req, res, next) {
	res.render('login');
});

router.get('/signup', function (req, res) {
	res.render('signup');
});

router.get('/logout', function (req, res) {
	req.session.loggedIn = false;
	req.session.user = undefined;
	res.send("Logged out");
});

router.post('/login', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	var role = req.body.role;

	if (role != "civilian" && role != "police ") res.status(403).send("Invalid role param");

	User.findOne({ email: email }, (err, user) => {
		if (err) res.status(500).send("Internal server error: " + err);
		user.comparePassword(password, (err, isMatch) => {
			if (err) res.status(500).send("Internal server error: " + err);
			if (isMatch) {
				req.session.loggedIn = true;
				req.session.user = user;
				req.session.save();
				if (role == 'civilian') res.render('civilian', user);
				else res.render('police', user);
			} else res.send("Invalid password");
		});
	});
});

router.post('/signup', (req, res) => {
	User.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		password: req.body.password,
		mobile: req.body.mobile,
		email: req.body.email,
		role: req.body.role
	}).then((value) => {
		res.status(200).redirect('/auth/login');
	}).catch((reason) => {
		res.status(500).send(reason);
	});
});

module.exports = router;
