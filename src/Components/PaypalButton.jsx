import { useEffect, useRef } from "react";
// 'https://www.paypal.com/sdk/js?client-id=AdJ08yXLmwB8zpy50VAZwj1LJ67bKAtfA73Ru92rUGnqN3slCVCADXeIDMj1hQU3fWpVl-O2vP9S7RnH'



export default function PaypalButton({ total }) {
  const paypal = useRef(); // Declarar la referencia

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AdJ08yXLmwB8zpy50VAZwj1LJ67bKAtfA73Ru92rUGnqN3slCVCADXeIDMj1hQU3fWpVl-O2vP9S7RnH';
    script.onload = () => {
      window.paypal.Buttons({
        // Configuración de los botones
      }).render(paypal.current); // Usar la referencia
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div ref={paypal}></div> {/* Asignar la referencia a un elemento del DOM */}
    </div>
  );
}