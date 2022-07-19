import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: "https://localhost:3000/login",
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("check your email for password link");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="container p-5 mt-5 relative">
      <div className=" col-md-6 offset-md-3">
        {loading ? (
          <h2 className="text-danger">Loading</h2>
        ) : (
          <h2 className="h2" >Forgot Password</h2>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <br />
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={!email}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
