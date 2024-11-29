// node.js
const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const part1 = "sk_test_51QOABFInRucQmTdiZIh9h1NO192LTrMXPEzKssYltN";
const part2 = "5zYM2l7wC5EnuaPrmFYumIf93s6cII95Cd3bRxFi4psZu400E1a39Wc5";
const stripe = require("stripe")(part1+part2);

// API

// API config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (request, response) =>
  response.status(200).send("Hello from Firebase Functions!"),
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received amount >>", total);
  console.log("Received POST request on /payments/create");
  console.log("Total amount:", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = onRequest(app);

// Example Endpoint
// http://127.0.0.1:5001/challenge-9eca5/us-central1/api
// npm run lint -- --fix

// firebase emulators:start
