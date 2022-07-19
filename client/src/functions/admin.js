import axios from "axios";


export const listAllUsers = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/admin/users", {
    headers: {
      authtoken,
    },
  });
};


export const listAllOrders = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/admin/orders", {
    headers: {
      authtoken,
    },
  });
};

export const changeOrderStatus = async (orderId, orderStatus, authtoken) => {
  return await axios.put(
    "http://localhost:8000/api/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
};
