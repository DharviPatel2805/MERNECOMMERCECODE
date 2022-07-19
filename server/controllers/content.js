const Content = require("../models/content");

exports.createContent = async (req, res) => {
  try {
    const { content } = req.body;
    const dynamicContent = await new Content({ title: content }).save();
    res.json(dynamicContent);
  } catch (err) {
    console.log("log error from sub", err);
    return res.status(400).send("create dynamic content failed");
  }
};

exports.listContent = async (req, res) => {
  const list = await Content.find().sort({ createdAt: -1 }).exec();
  res.json(list);
};

exports.removeContent = async (req, res) => {
  try {
    const deleteContent = await Content.findOneAndRemove({
      _id: req.params._id,
    });
    res.json(deleteContent);
  } catch (err) {
    console.log(err);
    res.status(400).send("delete content failed");
  }
};

exports.setContent = async (req, res) => {
  try {
    const update = await Content.findOneAndUpdate(
      { _id: req.params._id },
      { set: true },
      { new: true }
    ).exec();
    console.log("set value>>>>", update);
    res.json(update);
  } catch (err) {
    console.log(err);
    res.status(400).send("update category failed");
  }
};

exports.cancelContent = async (req, res) => {
  try {
    const update = await Content.findOneAndUpdate(
      { _id: req.params._id },
      { set: false },
      { new: true }
    ).exec();
    console.log("set value>>>>", update);
    res.json(update);
  } catch (err) {
    console.log(err);
    res.status(400).send("update category failed");
  }
};

exports.readContent = async (req, res) => {
  const content = await Content.findOne({ set: true }).exec();
  console.log(content);
  res.json(content);
};