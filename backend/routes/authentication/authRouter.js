//Author: Sai Kiran
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fs = require("fs").promises;
const authController = require("../../controllers/authController");
const registrationController = require("../../controllers/registrationController");


const OTP_FILE_PATH = "./TEMP_OTP.json";
const OTP_CLEAR_TIMEOUT_MINS = 5;
const MAX_OTP_GUESSES = 5;
const MAX_OTP_RESENDS = 5;


function sendError(message)
{
	return {
		status: "failure",
		message: message
	}
}

router.post("/login/requestOTP", (req, res) => {

	if (!req.body.type || !req.body.phone)
		return res.json({ status: "failure", message: "Invalid properties" });
	
	const {type, phone} = req.body;

	authController.loginRequestOTP(type, phone)
	.then(responseObj=>{
		res.json(responseObj);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})

router.post("/login/verifyOTP", (req, res) => {
	if (!req.body.phone || !req.body.OTP || !req.body.type) {
		return res.json({ status: "failure", message: "Invalid properties" });
	}
	const {type, phone, OTP} = req.body;

	authController.loginVerifyOTP(phone, OTP, type)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})


router.post("/register/requestOTP", (req, res) => {

	if (!req.body.phone || !req.body.type) {
		return res.json({ status: "failure", message: "Invalid properties." });
	}

	const { type, phone } = req.body;
	
	registrationController.registrationRequestOTP(phone, type)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
});


//rider register---------------------------------------------------------------------------------------------

router.post("/register/rider/verifyOTP", (req, res) => {
	if (!req.body.phone || !req.body.OTP || !req.body.name) {
		return res.json({ status: "failure", message: "Invalid properties" });
	}

	let { phone, OTP, name} = req.body;

	registrationController.riderOTPVerify(phone, OTP, name)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})

router.get("/allRiders", function (req, res, next) {
	Rider.find(function (err, result) {
		if (err) {
			res.json({
				status: "failure",
				message: "Unable to retrieve data"
			})
			console.error(err);
		}
		else {
			res.json({
				status: "success",
				message: "All Riders shown",
				result: result
			})
		}
	})
})



//requeter request ----------------------------------------------------------------------------

router.post("/register/requester/verifyOTP", (req, res) => {
	if (!req.body.phone || !req.body.OTP || !req.body.yearOfBirth || !req.body.name) {
		return res.json({ status: "failure", message: "Invalid properties" });
	}

	let { phone, OTP, yearOfBirth, name } = req.body;

	registrationController.requesterOTPVerify(phone, OTP, yearOfBirth, name)
	.then(response=>{
		res.json(response);
	})
	.catch(error=>{
		console.log(error);
		res.json(sendError("Internal Server Error"));
	})
})




router.get("/allRequesters", function (req, res, next) {
	Requester.find(function (err, result) {
		if (err) {
			res.json({
				status: "failure",
				message: "Unable to retrieve data"
			})
			console.error(err);
		}
		else {
			res.json({
				status: "success",
				message: "All Requesters shown",
				result: result
			})
		}
	})
})

//--------------------------------------------------------------------------------------------

module.exports = router;
