import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = location.state;
    if(intended){
      return;
    }else{
      if (user && user.token) navigate("/");
    }
    
  }, [user, navigate, location.state]);

  const roleBasedRedirect = (res) => {
    let intended = location.state;
    if(intended){
      navigate(intended.from)
    }else{
      if(res.data.role === "admin"){
        dispatch({
          type: "ADMIN_LOGIN",
          payload: true,
        })
        navigate("/admin/main-dashboard");
      }else{
        navigate("/user/history");
      }
    }
  }

  const sumbmitHandler = async (e) => {
    e.preventDefault();
    console.table(email, password);
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idToken = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idToken = await user.getIdTokenResult();

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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));

        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const logInForm = () => (
    <form onSubmit={sumbmitHandler}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <br />

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <Button
        onClick={sumbmitHandler}
        icon={<MailOutlined />}
        type="primary"
        className="mb-3"
        shape="round"
        block
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5  mt-5 relative">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ToastContainer />
          {loading ? <h2>Loading</h2> : <h2 className="h2" >Login</h2>}
          {logInForm()}

          <Button
            onClick={googleLogin}
            icon={<GoogleOutlined />}
            type="danger"
            className="mb-3"
            shape="round"
            block
            size="large"
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-end text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
