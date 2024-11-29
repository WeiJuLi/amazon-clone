import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import { NumericFormat } from "react-number-format";
import axios from "./axios.js";
import { db } from "./firebase.js";
import { doc, setDoc, collection } from "firebase/firestore";

function Payment() {
  const history = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe(); //This gets the reference of stripe instance that passes into the <Element></Element>
  const elements = useElements(); //This gets the reference of Element instance

  const [error, setError] = useState(null);

  //They control the status(disabled, processing, succeeded) of the Buy Now button.
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  //cilentSecret
  const [clientSecret, setCilentSecret] = useState(true);

  //
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setCilentSecret(response.data.clientSecret); //update
    };

    getClientSecret();
  }, [basket]); // whenever the basket changes, restart.

  console.log("The Secret is >>>", clientSecret);

  const handleSubmit = async (e) => {
    // stripe
    e.preventDefault();
    setProcessing(true); //disable the subnit button

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        // If we got error from the return promise of stripe.confirmCardPayment()
        console.error(
          "stripe.confirmCardPayment() failed:",
          result.error.message
        );
        setError(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent) {
        // If the payment is successful
        const { paymentIntent } = result;
        console.log("PaymentIntent object:", paymentIntent);

        // Push items in the basket to the Firebase database
        await setDoc(
          doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          }
        )
          .then(() => console.log("Firestore write successful"))
          .catch((error) => {
            console.error("Firestore write error:", error); // Log any Firestore error
            setError("Failed to save order. Try again.");
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history("/orders", { replace: true });
      }
    } catch (error) {
      // Catch other unintended errors

      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty); //If there is no card number, the Buy Now button will be disabled.
    setError(e.errr ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>Checkout {<Link to="/checkout">{basket?.length} items </Link>}</h1>

        {/* address */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* reviewing intems */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {/* reuse the code */}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price1={item.price1}
                price2={item.price2}
                shipping={item.shipping}
                discount={item.discount}
              />
            ))}
          </div>
        </div>

        {/* payment methods */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* Stripe Part */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceCOntainer">
                <NumericFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket?.length} items):{" "}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  //properties of CurrencyFormat
                  decimalScale={2}
                  value={getBasketTotal(basket)} //not defined
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
