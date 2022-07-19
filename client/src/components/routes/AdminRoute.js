import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminMainDashboard from "../../pages/admin/AdminMainDashboard";

import CreateCategory from "../../pages/admin/category/CreateCategory";
import UpdateCategory from "../../pages/admin/category/CategoryUpdate";

import SubCreate from "../../pages/admin/sub/SubCreate";
import SubUpdate from "../../pages/admin/sub/SubUpdate";

import ProductCreate from "../../pages/admin/product/ProductCreate";
import ProductUpdate from "../../pages/admin/product/ProductUpdate";
import AllProducts from "../../pages/admin/product/AllProducts";

import CreateCouponPage from "../../pages/admin/coupon/CreateCouponPage";

import Users from "../../pages/admin/users/Users";

import DynamicContent from "../../pages/admin/content/DynamicContent";

export function AdminDashboardRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <AdminDashboard /> : <LoadingToRedirect />;
}

export function AdminMainDashboardRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <AdminMainDashboard /> : <LoadingToRedirect />;
}

export function CreateCategoryRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <CreateCategory /> : <LoadingToRedirect />;
}

export function UpdateCategoryRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <UpdateCategory /> : <LoadingToRedirect />;
}

export function CreateSubRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <SubCreate /> : <LoadingToRedirect />;
}

export function UpdateSubRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <SubUpdate /> : <LoadingToRedirect />;
}

export function CreateProductRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <ProductCreate /> : <LoadingToRedirect />;
}


export function AllProductsRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <AllProducts /> : <LoadingToRedirect />;
}

export function ProductUpdateRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <ProductUpdate /> : <LoadingToRedirect />;
}

export function CreateCouponPageRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <CreateCouponPage /> : <LoadingToRedirect />;
}


export function UsersListRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Users /> : <LoadingToRedirect />;
}

export function DynamicContentRoute() {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <DynamicContent /> : <LoadingToRedirect />;
}