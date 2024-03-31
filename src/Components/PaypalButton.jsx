import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "./PaypalButton.module.css";



function onApprove(data, actions) {
  return actions.order
    .capture()
    .then(function (details) {
      alert("¡Muchas gracias por su colaboración!");
    })
    .catch(function (error) {
      console.error("Error al capturar la orden:", error);
      alert(
        "Hubo un problema al procesar su donación. Por favor, inténtelo de nuevo más tarde."
      );
    });
}

function PaypalButton() {
  const [donationAmount, setDonationAmount] = useState(1);
  return (
    <div className={styles.paypalWrapper}>
    <PayPalScriptProvider
      options={{
        clientId:
          "AegtMfBPHAwnLICPfPbXdxpws0YIf0P9tVf1kUW012yoG9TFSkN2xfTdw4MYnwUiYXGkwfdiQBuwWxPK",
        components: "buttons",
        currency: "USD",
      }}
    >
      <PayPalButtons
        fundingSource="paypal"
        style={{ layout: "vertical", label: "donate" }}
        disabled={false}
        forceReRender={[{ layout: "vertical" }]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value:
                    parseFloat(donationAmount).toFixed(
                      2
                    ),
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value:
                        parseFloat(
                          donationAmount
                        ).toFixed(2),
                    },
                  },
                },
                items: [
                  {
                    name: "Agrupación",
                    quantity: "1",
                    unit_amount: {
                      currency_code: "USD",
                      value:
                        parseFloat(
                          donationAmount
                        ).toFixed(2),
                    },
                    category: "DONATION",
                  },
                ],
              },
            ],
          });
        }}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
    <input
      type="number"
      step={0.5}
      value={donationAmount}
      onChange={(e) =>
        setDonationAmount(e.target.value)
      }
    />
  </div>
  )
}

export default PaypalButton