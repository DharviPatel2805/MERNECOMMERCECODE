import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../../components/nav/Adminnav";
import {
  createDynamicContent,
  listContent,
  removeContent,
  setContentDynamic,
  cancelContentDynamic,
} from "../../../functions/content";

import { toast } from "react-toastify";
import { Badge } from "antd";
import {
  PlusCircleFilled,
  DeleteOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";

function DynamicContent() {
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);

  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () =>
    listContent().then((res) => setContentList(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();

    createDynamicContent({ content }, user.token)
      .then((res) => {
        console.log(res.data);
        setContent("");
        toast.success(`"${res.data.title}" is added`);
        loadContent();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleRemove = async (id) => {
    if (window.confirm("Delete?")) {
      removeContent(id, user.token)
        .then((res) => {
          toast.error("Succeessfully Deleted!!");
          loadContent();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  const handleSet = async (id) => {
    setContentDynamic(id, user.token)
      .then((res) => {
        console.log(res);
        toast.success("Succeessfully Added!!");
        navigate("/admin/content");
        loadContent();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleCancel = async (id) => {
    cancelContentDynamic(id, user.token)
      .then((res) => {
        console.log(res);
        toast.success("Cancelled!!");
        navigate("/admin/content");
        loadContent();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="container-fluid pl-0  pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <div className="m-2 md:m-10 mt-5 p-5 md:p-10 bg-light rounded-3xl">
            <h2 className=" text-left m-4 h2">
              <b>Add Content</b>
            </h2>
            <hr className="bg-info border-2 border-top border-info " />
            <br/>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="content"
                    className="form-control"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                  <button className="btn btn-info mt-2">Add</button>
                </div>
              </form>
            </div>

            {contentList &&
              contentList.map((c) => (
                <div className="alert alert-secondary" key={c._id}>
                  {c.title}
                  {c.set && (
                    <span className="p-2 hover:drop-shadow-xl  rounded-full text-white bg-green-400 ml-3 h6">
                      Set
                    </span>
                  )}

                  <span
                    className="btn btn-lg float-right pt-0"
                    onClick={() => handleRemove(c._id)}
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>

                  {!c.set && (
                    <span
                      className="btn btn-lg float-right pt-0"
                      onClick={() => handleSet(c._id)}
                    >
                      <PlusCircleFilled className="text-success" />
                    </span>
                  )}

                  {c.set && (
                    <span
                      className="btn btn-lg float-right pt-0"
                      onClick={() => handleCancel(c._id)}
                    >
                      <MinusCircleFilled className="text-success" />
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicContent;
