const Order = require("../models/order");
const admin = require("../firebase/index");

// admin.initializeApp();

exports.listUsers = async (req, res) => {
  var allUsers = [];
  return admin.auth().listUsers()
      .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
              // For each user
              var userData = userRecord.toJSON();
              allUsers.push(userData);
          });
          res.status(200).send(JSON.stringify(allUsers));
      })
      .catch((error) => {
          console.log("Error listing users:", error);
          res.status(500).send(error);
      });
}

exports.listOrders = async (req, res) => {
  const orders = await Order.find()
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(orders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};
