import React from "react";
import { useSelector } from "react-redux";

import LoadingToRedirect from "./LoadingToRedirect";
import History from "../../pages/user/History";
import Password from "../../pages/user/Password";
import Wishlist from "../../pages/user/Wishlist";
import Checkout from "../../pages/Checkout";
import Payment from "../../pages/Payment";

export function UserHistory({ ...props }) {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token && user.role !== "admin" ? <History /> : <LoadingToRedirect />;
}

export function UserPassword({ ...props }) {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Password /> : <LoadingToRedirect />;
}

export function UserWishlist({ ...props }) {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token && user.role !== "admin" ? <Wishlist /> : <LoadingToRedirect />;
}

export function UserCheckout({ ...props }) {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Checkout /> : <LoadingToRedirect />;
}

export function UserPayment({ ...props }) {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Payment /> : <LoadingToRedirect />;
}

