const express=require("express")
const router=express.Router();

import {processPayment, sendStripeApiKey} from "../controllers/paymentcontroller"
const {isAuthenticatedUser} =require("../middleware/auth")

router.route("/payment/process").post(isAuthenticatedUser,processPayment)

router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey)


module.exports=router
