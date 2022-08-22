const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const {
  createOrUpdateUser,
  currentUser,
  listUsers,
  checkRefEmail,
  applyRefEmail,
  addCreditToNewUser,
} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
router.get("/users", listUsers);

//credit point from ref email
router.post("/checkref", checkRefEmail);
router.post("/applyref", applyRefEmail);  //add credit in registered user
router.post("/addnewcredit", addCreditToNewUser);  //add credit in new user

module.exports = router;
