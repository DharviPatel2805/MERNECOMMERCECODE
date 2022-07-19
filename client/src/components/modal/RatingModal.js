import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { StarOutlined } from "@ant-design/icons";
import { Modal } from "antd";

function RatingModal({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>

      <Modal
        title="Leave your Rating"
        visible={modalVisible}
        centered
        onOk={() => {
          setModalVisible(false);
          toast.success("Thank you for your review.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
}

export default RatingModal;
