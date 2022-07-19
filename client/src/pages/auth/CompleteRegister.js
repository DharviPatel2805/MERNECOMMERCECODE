import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createOrUpdateUser } from "../../functions/auth";

function CompleteRegister({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const sumbmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email ans password is required!!");
      return;
    }

    if (password.length < 6) {
      toast.error("password must be at least 6 character long! ");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove email from localstorage
        window.localStorage.removeItem("emailForRegistration");

        //get user id token
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idToken = await user.getIdTokenResult();

        //redux
        console.log(user);

        createOrUpdateUser(idToken.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idToken.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegisterForm = () => (
    <form onSubmit={sumbmitHandler}>
      <div className="form-group">
        <input type="email" className="form-control" value={email} disabled />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
      </div>

      <button type="submit" className="btn btn-outline-secondary">
        Register Complete
      </button>
    </form>
  );

  return (
    <div className="container p-5  mt-5 relative">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="h2" >Complete Registeration</h2>
          {/* <ToastContainer/> */}
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
}

export default CompleteRegister;
