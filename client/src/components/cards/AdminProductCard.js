import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.jpg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

function AdminProductCard({ product, handleRemove }) {
  const { title, description, images, slug } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          alt=""
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-2"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`} >
          <EditOutlined className="text-success" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
}

export default AdminProductCard;
