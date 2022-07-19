import React from "react";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";

function UserNav() {
  return (
    <nav className="mt-2 pl-4 pr-4">
      <ul className="nav flex-column">
        <li className="nav-item text-dark ">
          <Link to="/user/history" className="nav-link text-dark h4 font-weight-bold ">
            History
            <hr className="border-2 border-top border-dark " />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
