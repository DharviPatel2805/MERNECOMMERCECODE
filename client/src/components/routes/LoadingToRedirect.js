import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/");
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate]);

  return (
    <div className="container text-center p-4">
      <h2>Redirecting you in {count} seconds</h2>
    </div>
  );
}

export default LoadingToRedirect;
