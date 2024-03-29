import { useEffect, useRef } from "react";

export default function PaypalButton({total}){
    const paypal = useRef(); 

    useEffect(() => {
        const script = document.createElement('script');
        // FALTA PONER EL CLIENT ID!!!!1
        script.src = 'https://www.paypal.com/sdk/js?client-id=CLIENT_ID';
        script.onload = () => {
          window.paypal.Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Compra de productos",
                    amount: {
                      currency_code: "USD",
                      value: total,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log(order);
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current);
        };
        document.body.appendChild(script);
      }, []);
    
      return (
        <div>
          <div ref={paypal}></div>
        </div>
      );
}