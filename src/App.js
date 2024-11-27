import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";

import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js"; //SDK to connect the Stripe API.
import { Elements } from "@stripe/react-stripe-js"; //It provided Stripe UI components.
import Orders from "./Orders";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const promise = loadStripe(
  "pk_test_51QOABFInRucQmTdiexQ8En8kKWEPWmuj7bd3Tl0SNsiHT12JQOjkrKkB69VIGpSYGlRWVg606JB8jnqwscll8kHY00fprKBF6n"
);

function App() {
  const [, dispatch] = useStateValue(); // no need for state, so just disgard the first one
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // If onAuthStateChanged detect that authUser has value
        // Then dispatch the data to the data layer
        dispatch({
          type: "SET_USER",
          user: authUser, // authUser is an opbject, including email, uid, displayName ...
        });
        console.log("The user is logged in:", authUser);
      } else {
        // If the user logged out, then eradicate the user's data
        dispatch({
          type: "SET_USER",
          user: null,
        });
        console.log("The user is logged out");
      }
    });

    // clean up the subscribe
    return () => unsubscribe();
  }, [dispatch]); // will only run once when the app component loads...

  // Next-Step : store the logged in info in the data layer.

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route
            path="/orders"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Orders />
                </Elements>
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {/* Header */}
                <Header />
                {/* Home */}
                <Home />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
