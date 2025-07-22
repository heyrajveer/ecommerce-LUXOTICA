import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();


  const totalPrice =()=>{
    try {
      let total =0;
      cart?.map((item)=> {total =  total + item.price})
      return total.toLocaleString("en-US",{
        style:"currency",
        currency:"USD"
      }
      )
    } catch (error) {
      console.log(error)
    }
  }
  // Function to remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };


  return (
    <Layout>
      <div className="container">
        <h1 className="text-center m-3 bg-light p-2 mb-3">
          {`Hello ${auth?.token ? auth?.user?.name : "Guest"}`}
        </h1>
        <h4 className="text-center">
          {cart?.length > 0
            ? `You have ${cart.length} item(s) in your cart${
                auth?.token ? "" : ". Please login to checkout"
              }`
            : "Your cart is empty"}
        </h4>

        <div className="d-flex m-5">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="card d-flex flex-row m-2 p-3" key={p._id}>
                <div className="col-md-5 m-2">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md m-3 p-1">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                   <p>{p.quantity}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 p-3 text-center">
            <h2>Cart Summary</h2>
            <p>Total | checkout | Payment </p>
            <hr />
            <h3>Total:{totalPrice()}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
