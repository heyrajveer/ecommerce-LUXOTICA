import { useState, createContext, useContext, useEffect} from "react";

// Step 1: Create context
const CartContext = createContext();

// Step 2: Create Provider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initial empty cart
 useEffect(()=>{
    let existingCartItem =localStorage.getItem('cart')
    if(existingCartItem) setCart(JSON.parse(existingCartItem));
 },[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Step 3: Custom hook to use context easily
const useCart = () => useContext(CartContext);

// Step 4: Export
export { useCart, CartProvider };
