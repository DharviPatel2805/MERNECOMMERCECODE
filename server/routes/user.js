const express = require("express");

const router = express.Router();

//middleware
const { authCheck } = require("../middlewares/auth");
//controller
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  listOrders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
  filterOrderByStaus
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

//orders
router.post("/user/order", authCheck, createOrder); //stripe
router.get("/user/orders", authCheck, listOrders);
router.post("/user/cash-order", authCheck, createCashOrder);   //COD

//wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

///filter order
router.get("/user/orders/:orderStatus", filterOrderByStaus);



module.exports = router;
