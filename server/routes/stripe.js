//stripe secret in backend
//generate client secret and send it to front end
//create widget to take credit card details from user


const express = require("express");

const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { createPaymentIntent }  = require("../controllers/stripe");

router.post("/create-payment-intent", authCheck, createPaymentIntent);


module.exports = router;