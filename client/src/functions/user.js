import axios from "axios";

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete("http://localhost:8000/api/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const saveUserAddress = async (address, authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/user/address",
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

///////////////////////////coupon//////////////////////////////

export const applyCoupon = async (coupon, authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/user/cart/coupon",
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

///////////////////////////credit point//////////////////////////////
export const getUserCredit = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/user/cart/credit", {
    headers: {
      authtoken,
    },
  });
};

export const applyCredit = async (point, authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/user/cart/credit",
    { point },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addCredit = async (point, authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/user/cart/addcredit",
    { point },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateCredit = async (leftpoint, appliedCredit, authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/user/cart/updatecredit",
    { leftpoint, appliedCredit },
    {
      headers: {
        authtoken,
      },
    }
  );
};

///////////////////////////ORDER//////////////////////////////

export const createOrder = async (stripeResponse, authtoken) => {
  ///////stripe/////////
  return await axios.post(
    "http://localhost:8000/api/user/order",
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const listOrders = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/user/orders", {
    headers: {
      authtoken,
    },
  });
};

export const createCashOrder = async (authtoken, couponApplied, credit) => {
  ////////COD//////////////
  return await axios.post(
    "http://localhost:8000/api/user/cash-order",
    { couponApplied, credit },
    {
      headers: {
        authtoken,
      },
    }
  );
};

/////////////////wishlist////////////////////////////
export const getWishlist = async (authtoken) => {
  return await axios.get("http://localhost:8000/api/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const removeFromWishlist = async (productId, authtoken) => {
  return await axios.put(
    `http://localhost:8000/api/user/wishlist/${productId}`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addToWishlist = async (productId, authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/user/wishlist",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

///////////////////filter order///////////////////
export const filterOrderByStaus = async (orderStatus) => {
  return await axios.get(
    `http://localhost:8000/api/user/orders/${orderStatus}`
  );
};
