import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));


  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const sumbmitHandler = async (e) => {
    e.preventDefault();

    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. click to the given to complete your registration. `
    );

    window.localStorage.setItem("emailForRegistration", email);


    setEmail("");
  };

 

  const registerForm = () => (
    <form onSubmit={sumbmitHandler}>
      <label>Email id</label>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
       
      <br />
      <button type="submit" className="btn btn-outline-secondary">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5  mt-5 relative">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="h2">Register</h2>
          <ToastContainer />
          {registerForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
