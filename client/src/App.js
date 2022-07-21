import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";


// import Home from "./pages/Home";
// import Header from "./components/nav/Header";
// import SideDrawer from "./components/drawer/SideDrawer";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import CompleteRegister from "./pages/auth/CompleteRegister";
// import ForgotPassword from "./pages/auth/ForgotPassword";
import {
  UserHistory,
  UserPassword,
  UserWishlist,
  UserCheckout,
  UserPayment,
} from "./components/routes/userRoute";
import {
  AdminDashboardRoute,
  AdminMainDashboardRoute,
  CreateCategoryRoute,
  UpdateCategoryRoute,
  CreateSubRoute,
  UpdateSubRoute,
  CreateProductRoute,
  AllProductsRoute,
  ProductUpdateRoute,
  CreateCouponPageRoute,
  UsersListRoute,
  DynamicContentRoute,
} from "./components/routes/AdminRoute";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubHome from "./pages/subs/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";

const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header")); 
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Login = lazy(() => import("./pages/auth/Login")); 
const Register = lazy(() => import("./pages/auth/Register")); 
const CompleteRegister = lazy(() => import("./pages/auth/CompleteRegister"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword")); 

const Product = lazy(() => import("./pages/Product")); 
const CategoryHome = lazy(() => import("./pages/category/CategoryHome")); 
const SubHome = lazy(() => import("./pages/subs/SubHome"));
const Shop = lazy(() => import("./pages/Shop")); 
const Cart = lazy(() => import("./pages/Cart"));  

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();
        // console.log(user);
        currentUser(idToken.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idToken.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unSubscribe();
  }, [dispatch]);
  return (
    <Suspense fallback={
      <div className="text-center p-4" >
        MERN ECOMMERCE 
      </div>
    } >
      <Header />
      <SideDrawer />
      <ToastContainer />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<CompleteRegister />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />

        <Route exact path="/user/history" element={<UserHistory />} />
        <Route exact path="/password" element={<UserPassword />} />
        <Route exact path="/user/wishlist" element={<UserWishlist />} />
        <Route
          exact
          path="/admin/main-dashboard"
          element={<AdminMainDashboardRoute />}
        />
        <Route
          exact
          path="/admin/dashboard"
          element={<AdminDashboardRoute />}
        />
        <Route exact path="/admin/users" element={<UsersListRoute />} />
        <Route exact path="/admin/category" element={<CreateCategoryRoute />} />
        <Route
          exact
          path="/admin/category/:slug"
          element={<UpdateCategoryRoute />}
        />
        <Route exact path="/admin/sub" element={<CreateSubRoute />} />
        <Route exact path="/admin/sub/:slug" element={<UpdateSubRoute />} />
        <Route exact path="/admin/product" element={<CreateProductRoute />} />
        <Route exact path="/admin/products" element={<AllProductsRoute />} />
        <Route
          exact
          path="/admin/product/:slug"
          element={<ProductUpdateRoute />}
        />
        <Route exact path="/product/:slug" element={<Product />} />
        <Route exact path="/category/:slug" element={<CategoryHome />} />
        <Route exact path="/sub/:slug" element={<SubHome />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/admin/coupon" element={<CreateCouponPageRoute />} />
        <Route exact path="/admin/content" element={<DynamicContentRoute />} />

        <Route exact path="/checkout" element={<UserCheckout />} />
        <Route exact path="/payment" element={<UserPayment />} />
      </Routes>
    </Suspense>
  );
}

export default App;
