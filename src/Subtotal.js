import React from "react";
import "./Subtotal.css";
import {NumericFormat} from "react-number-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const [{basket}] = useStateValue();
  const history = useNavigate();

  return (
    <div className="subtotal">
      <NumericFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        //properties of CurrencyFormat
        decimalScale={2} 
        value={getBasketTotal(basket)} //not defined 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={e => history('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
