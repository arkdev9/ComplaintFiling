var express = require('express');
var Complaint = require('../models/Complaint');
var Civilian = require('../models/Civilian');
var router = express.Router();

router.post('/file', (req, res) => {
	Complaint.collection.insertOne({
		type: req.body.type,
		complaint_number: Math.random() * 10000,
		date: req.body.date,
		area: req.body.area,
		crime: req.body.crime,
		mobile: req.body.mobile
	}).then(function(val) {
		Civilian.findOne({_id: req.session.user._id}, (err, user) => {
			if (err) res.status(403).send("Forbidden");
			else {
				user.complaints.push(val);
				res.status(200).send("Filed");
			}
		});
	}).catch(function(err) {
		console.log(err);
		res.status(500).send(err);
	});
});

router.get('/complaints', (req, res) => {
	Civilian.findOne({_id: req.session.user._id}, (err, user) => {
		res.status(200).json({all_complaints: user.complaints});
	});
});

module.exports = router;