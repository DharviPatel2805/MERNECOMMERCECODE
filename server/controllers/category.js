const Category = require("../models/category");
const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("create category failed");
  }
};

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category: category._id }).populate("category").exec();
  console.log(products);
  res.json({
    category,
    products,
  });
};

exports.list = async (req, res) => {
  const listCategory = await Category.find().sort({ createdAt: -1 }).exec();
  res.json(listCategory);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updateCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updateCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("update category failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleteCategory = await Category.findOneAndRemove({
      slug: req.params.slug,
    });
    res.json(deleteCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("delete category failed");
  }
};

exports.getSubs = async (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
