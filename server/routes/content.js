const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const {
  createContent,
  listContent,
  removeContent,
  setContent,
  readContent,
  cancelContent,
} = require("../controllers/content");

router.post("/admin/content", authCheck, adminCheck, createContent);
router.get("/admin/content", listContent);
router.delete("/admin/content/:_id", authCheck, adminCheck, removeContent);
router.put("/admin/content/:_id", authCheck, adminCheck, setContent);
router.put("/admin/cancelcontent/:_id", authCheck, adminCheck, cancelContent);
router.get("/content", readContent);

module.exports = router;
