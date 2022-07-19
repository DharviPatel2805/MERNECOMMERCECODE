import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { LockFilled } from "@ant-design/icons";

function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password Updated!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={submitHandler}>
      <div className="row">
        <div className="col-md-6 offset-md-3 bg-light" >
        <div className="form-group  p-3">
          <label className="h2 " > <LockFilled  /> New Password</label>
          <br/>
          <br/>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
            value={password}
            disabled={loading}
          />
          <br />
          <br/>
          <button
            type="submit"
            className="btn btn-lg btn-info"
            disabled={!password || loading || password.length < 6}
          >
            Submit
          </button>
        </div>
        </div>
        
      </div>
    </form>
  );

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        
        <div className="col">
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <h4 className="p-3 mt-3 mb-7 text-white text-center display-5 jumbotron bgColor">
              Update Password
            </h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
}

export default Password;
