import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/Adminnav";
import { listAllUsers } from "../../../functions/admin";

import { UserOutlined } from "@ant-design/icons";

function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = () =>
    listAllUsers(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setUsers(res.data);
    });

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <div className="m-2 md:m-10 mt-5 p-5 md:p-10 bg-light rounded-3xl">
            <h2 className=" text-left m-4 h2">
              <b>
                <UserOutlined /> Users
              </b>
            </h2>
            <hr className="bg-info border-2 border-top border-info " />
            <br/>

            <table className="table table-bordered ">
              <thead className="table-light">
                <tr>
                  <th scope="col">.</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User Email ID</th>
                  <th scope="col">User Creation time</th>
                  <th scope="col">User last login</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userdata, i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{userdata.displayName} </td>
                    <td>{userdata.email}</td>
                    <td>{userdata.metadata.creationTime}</td>
                    <td>{userdata.metadata.lastSignInTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
