import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase.js";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import Order from "./Order.js";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      //console.log("User UID:", user.uid); // Verify the user UID
      const orderRef = collection(db, "users", user?.uid, "orders");
      const ordersQuery = query(orderRef, orderBy("created", "desc"));
      
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        console.log("Snapshot docs:", snapshot.docs);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        console.log("Fetched Orders:", snapshot.docs.map((doc) => doc.data())); // Add this line
      });
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user?.uid]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}

export default Orders;
