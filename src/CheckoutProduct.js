import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";


function CheckoutProduct({
  id,
  image,
  title,
  shipping,
  discount,
  price1,
  price2,
  hideButton,
}) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    //remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <div>
        <img className="checkoutProduct_image" src={image} alt="" />
      </div>
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">
          <strong>{title}</strong>
        </p>
        <p>
          <small>{shipping}</small>
        </p>
        <p className="checkoutProduct_stock">
          <small>In Stock</small>
        </p>
        {!hideButton && (<button onClick={removeFromBasket}>Remove from Basket</button>)}
      </div>
      <div className="checkoutProduct_price">
        <p className="checkoutProduct_discount">{discount}</p>
        <p className="checkoutProduct_price_detail">
          <small>$</small>
          <strong>
            {price1}.{price2}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default CheckoutProduct;
