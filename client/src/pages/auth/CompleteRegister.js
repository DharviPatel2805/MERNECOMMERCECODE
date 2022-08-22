import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createOrUpdateUser, checkRef, applyRef, addCreditToNewUser } from "../../functions/auth";

function CompleteRegister({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [refEmail, setRefEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { refApplied } = useSelector((state) => ({ ...state }));

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

    
    if(refApplied){
      applyRef(refEmail).then((res) => {
        console.log("applying ref id", res.data);
        if (res.data) {
          toast.success("Referral id Applied");
        }
        if (res.data.err) {
          toast.error("Referral id not found");
        }
      })
    }

    if (refApplied) {
      addCreditToNewUser(email).then((res) => {
        console.log("adding credit into new user", res.data);
        if (res.data) {
          toast.success("credit id added");
        }
        if (res.data.err) {
          toast.error("Something went wrong. Credit not added in new user");
        }
      });
    }
  };

  const checkReferenceEmailHandler = (e) => {
    e.preventDefault();
    checkRef(refEmail).then((res) => {
      console.log("checking ref id", res.data);
      if (res.data) {
        toast.success("Referral id checked");
        dispatch({
          type: "REF_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        toast.error("Referral id is not allowed.");
        dispatch({
          type: "REF_APPLIED",
          payload: false,
        });
      }
    });
  };

  const completeRegisterForm = () => (
    <form onSubmit={sumbmitHandler}>
      <div className="form-group">
        <input type="email" className="form-control" value={email} disabled />
      </div>

      <br/>
      <div className="form-group">
        <label>Reference Email:</label>
        <p>
          (Once you add Reference email, you'll get extra 5 credit points in
          your virtual wallet. You can only add reference email of registered
          user.)
        </p>
        <input
          type="email"
          className="form-control"
          value={refEmail}
          placeholder="reference email"
          onChange={(e) => setRefEmail(e.target.value)}
          autoFocus
        />

        <button
          type="submit"
          className="btn btn-outline-secondary mt-2"
          onClick={checkReferenceEmailHandler}
        >
          Check
        </button>
      </div>
      <br/>

      <div className="form-group">
        <label>Your Password: </label>
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
          <h2 className="h2">Complete Registeration</h2>
          {/* <ToastContainer/> */}
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
}

export default CompleteRegister;
