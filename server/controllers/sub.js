const Sub = require("../models/sub");
const Product = require("../models/product");

const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (err) {
    console.log("log error from sub", err);
    res.status(400).send("create sub failed");
  }
};

exports.read = async (req, res) => {
  const sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();

  res.json({
    sub,
    products,
  });
};

exports.list = async (req, res) => {
  const listSub = await Sub.find().sort({ createdAt: -1 }).exec();
  res.json(listSub);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updateSub = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updateSub);
  } catch (err) {
    console.log(err);
    res.status(400).send("update sub failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleteSub = await Sub.findOneAndRemove({
      slug: req.params.slug,
    });
    res.json(deleteSub);
  } catch (err) {
    console.log(err);
    res.status(400).send("delete sub failed");
  }
};
