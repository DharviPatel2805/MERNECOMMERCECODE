const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqid = require("uniqid");

exports.userCart = async (req, res) => {
  console.log(req.body);
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  //check if cart with logged in user is exist or not
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart and got updated");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = [];

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    //get price from actual product model
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  console.log("cart total", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  console.log("new cart", newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

/////////////////////coupon///////////////////////////////

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("coupon:", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("valid coupon", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  const { products, cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate("products.product")
    .exec();

  console.log("cart total", cartTotal);
  console.log("discount", validCoupon.discount);

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  console.log("total After discount ", totalAfterDiscount);
  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

////////////////ORDER////////////////////////////////////
//stripe>>>>>>>>>>>
exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  console.log("new order", newOrder);

  //decrement quantity, incre sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("product after decre quantity and incre sold", updated);

  res.json({ ok: true });
};

exports.listOrders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};

///////COD>>>>>>>>>>>>>>>>>>>>.
exports.createCashOrder = async (req, res) => {
  const { couponApplied } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqid(),
      amount: finalAmount,
      payment_method_types: ["cash"],
      status: "Cash On Delivery",
      created: Date.now(),
    },
    orderedBy: user._id,
    orderStatus: "Not Processed",
  }).save();

  console.log("new COD order>>>>>", newOrder);

  //decrement quantity, incre sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("COD product after decre quantity and incre sold", updated);

  res.json({ ok: true });
};

// Bulk insert in MongoDB?
// The db.collection.bulkWrite () method provides the ability to perform bulk insert, update,
//  and remove operations. MongoDB also supports bulk insert through the db.collection.insertMany ().

//  Performance wise there is no major difference and both methods come to have less client to database
//  round trips. The syntax of bulk operations allow you to have a mix of updates/deletes or inserts
//  within a bulk while insertMany will only support inserts.

/////////////////////////wishlist //////////////////////////////////////////

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } } //addToSet make sure that there is no duplicate add on wishlist
  ).exec();

  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  console.log("wishlist>>>>>>>>>>>>>>>>>>>>>>", list);

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } } //pull out from wishlist
  ).exec();

  res.json({ ok: true });
};



//////////////////////////order filter///////////////
exports.filterOrderByStaus = async (req, res) => {
  const { orderStatus } = req.params;
  let filterOrders = await Order.find({ orderStatus })
    .populate("products.product")
    .exec();

  res.json(filterOrders);  
};

