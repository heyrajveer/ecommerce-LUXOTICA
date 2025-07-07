import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5); // Start from 5 seconds
  const navigate = useNavigate();
const  location =useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/login",{
          state:location.pathname,}
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [count,navigate,location]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="spinner-border mb-3" role="status" style={{ width: "4rem", height: "4rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <h3 className="text-center text-muted">
        Redirecting to login in <strong>{count}</strong> seconds...
      </h3>
    </div>
  );
};

export default Spinner;
 