import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/home_image2.jpg",
    "/images/home_image3.jpg",
    "/images/home_image4.jpg",
  ];

  //auto display image

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // setInterval(function, delay) 
    return() => clearInterval(interval);
  }, [images.length]); //If the length of images changed, this should reload and start again.  

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="home">
      <div className="home_container">
        <ArrowBackIosNewOutlinedIcon
          onClick={handlePrevImage}
          className="home_image_button prev"
        />
      <div className="home_image_container">
        {images.map((image, index) => (
          //每張圖片生成一個img
          <img 
            key={index}
            className="home_image"
            src={image}
            alt=""
            style={{transform: `translateX(${(index - currentImageIndex) * 100}%)`}}
            //style 屬性值需要用 JavaScript 表達式表示，外層的大括號 {} 用來包裹 JavaScript 表達式。
          />
        ))}
      </div>
        <ArrowForwardIosOutlinedIcon
          onClick={handleNextImage}
          className="home_image_button next"
        />

        <div className="home_row">
          {/*product */}
          <Product
            id="12321341"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
            title="The Lean Startup: How Today’s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            rating={5}
            limited="Limited time deal"
            discount="-80%"
            price1={19}
            price2={99}
            shipping="FREE Shipping on orders over $35 shipped by Amazon"
          />
          {/*product */}
          <Product
            id="49538094"
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            rating={4}
            limited="Lowest price in 30 days"
            discount="-50%"
            price1={239}
            price2={49}
            shipping="FREE Shipping by Amazon"
          />
          <Product
            id="90829332"
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            rating={4}
            limited="Limited time deal"
            discount="-20%"
            price1={1094}
            price2={87}
            shipping="FREE Shipping by Amazon"
          />
        </div>

        <div className="home_row">
          <Product
            id="4903850"
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            rating={3}
            limited="Limited time deal"
            discount="-30%"
            price1={199}
            price2={99}
            shipping=""
          />
          <Product
            id="23445930"
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            rating={5}
            limited="Lowest price in 30 days"
            discount="-37%"
            price1={98}
            price2={99}
            shipping="FREE Shipping by Amazon"
          />
          <Product
            id="3254354345"
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            rating={4}
            limited="Lowest price in 30 days"
            discount="-10%"
            price1={598}
            price2={99}
            shipping="FREE Shipping by Amazon"
          />
        </div>

        <div className="home_row">
          <Product
            id="90829332"
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            rating={4}
            limited="Limited time deal"
            discount="-20%"
            price1={1094}
            price2={0}
            shipping="FREE Shipping by Amazon"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
