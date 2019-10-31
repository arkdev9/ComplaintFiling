var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log(req.session);
	next();
});

router.get('/', function (req, res, next) {
	if (req.session.user === undefined) res.render('login');
	else {
		if (req.session.user.role == 'civilian') {
			res.render('civilian', req.session.user);
		} else if (req.session.user.role == 'police') {
			res.render('police');
		}
	}
});

module.exports = router;
