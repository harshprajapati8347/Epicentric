const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Events",
        description: "Event Ticket",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

// Cancel Payment - Cancel Booking - User

router.post(
  "/cancel",
  catchAsyncErrors(async (req, res, next) => {
    const payment = await stripe.paymentIntents.cancel(req.body.paymentId);
    res.status(200).json({
      success: true,
      payment,
    });
  })
);

// Refund Payment - Refund Booking - User

router.post(
  "/refund",
  catchAsyncErrors(async (req, res, next) => {
    const refund = await stripe.refunds.create({
      payment_intent: req.body.paymentId,
    });
    res.status(200).json({
      success: true,
      refund,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_PUBLIC_KEY });
  })
);

module.exports = router;
