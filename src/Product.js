import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({
  id,
  image,
  title,
  rating,
  limited,
  discount,
  price1,
  price2,
  shipping,
}) {
  const [{ basket }, dispatch] = useStateValue();
  console.log("this is the basket >>>", basket);

  // add to basket function
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price1: price1,
        price2: price2,
        rating: rating,
        shipping: shipping,
        discount: discount,
      },
    });
  };

  return (
    <div className="product">
      <img src={image} alt="product_image_1" />

      <div className="product_info">
        <p className="product_title">{title}</p>
        <div className="product_rating">
          {/* The value of rating is the length of the Array.  */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>★</p>
            ))}
        </div>
        <div className="product_limited_tag">
          <p>{limited}</p>
        </div>
        <p className="product_price">
          <p className="product_price_discount">{discount}</p>
          <small className="dollar">$</small>
          <strong className="product_price_1">{price1}</strong>
          <small className="product_price_2">{price2}</small>
        </p>
        <small className="product_shipping">{shipping}</small>
      </div>

      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
