const express = require("express");

const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");
//controller
const { listOrders, orderStatus, listUsers } = require("../controllers/admin");

router.get("/admin/orders", authCheck, adminCheck, listOrders);
router.put("/admin/order-status", authCheck,adminCheck, orderStatus);


//users list
router.get("/admin/users", authCheck, adminCheck, listUsers);


module.exports = router;
