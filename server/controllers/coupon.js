const Coupon = require("../models/coupon");
// const User = require("../models/user");
// const Cart = require("../models/cart");

exports.create = async (req, res) => {
    try{
       const { name, expiry, discount } = req.body.coupon;
       const newCoupon = await new Coupon({ name, expiry, discount }).save();
       res.json(newCoupon);
    }catch(err){
        console.log(err);
    }
}

exports.list = async (req, res) => {
    try{
        const listCoupon = await Coupon.find({}).sort({ createdAt: -1 }).exec();
        res.json(listCoupon);
     }catch(err){
         console.log(err);
     }
}

exports.remove = async (req, res) => {
    try{
        const delCoupon = await Coupon.findByIdAndDelete(req.params.couponId).exec();
        res.json(delCoupon);
     }catch(err){
         console.log(err);
     }
}