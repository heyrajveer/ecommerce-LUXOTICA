import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const PaymentPage = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  // Fetch client token from backend
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/product/braintree/token`);
        const data = await res.json();
        setClientToken(data.clientToken || data.clientToken?.clientToken);
      } catch (err) {
        console.log("Error fetching token:", err);
      }
    };
    getToken();
  }, []);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();

      const res = await fetch(`${BASE_URL}/api/v1/product/braintree/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nonce,
          cart: [
            {
              price: 99,
              name: "Sample Product",
              id: "123",
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.ok) {
        alert("Payment successful!");
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.log("Payment error:", err);
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      {clientToken ? (
        <div>
          <DropIn
            options={{ authorization: clientToken }}
            onInstance={(inst) => setInstance(inst)}
          />
          <button onClick={handlePayment}>Buy Now</button>
        </div>
      ) : (
        <p>Loading payment gateway...</p>
      )}
    </div>
  );
};

export default PaymentPage;
