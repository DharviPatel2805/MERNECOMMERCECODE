const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log("log error from product create", err);

    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find()
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

//without pagination//////////
// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     let products = await Product.find()
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send("update product failed");
//   }
// };

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("delete product failed");
  }
};

exports.read = async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    return res.status(400).send("update product failed");
  }
};

//with pagination////////
exports.list = async (req, res) => {
  console.table(req.body);
  try {
    const { sort, order, page } = req.body;
    const currentPage = page;
    const perPage = 3;
    let products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).send("load product failed");
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find().estimatedDocumentCount().exec();
  res.json(total);
};

//star ratings////////////////////////////////////

exports.productStar = async (req, res) => {
  //find product
  const product = await Product.findById(req.params.productId).exec();
  //find user
  const user = await User.findOne({ email: req.user.email }).exec();
  //destructure star number from the fronend body
  const { star } = req.body;

  //find who is updating
  //and check this user already added rating or not!
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  //if user haven't left rating
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    //if user left rating
    const ratingUpdate = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdate", ratingUpdate);
    res.json(ratingUpdate);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate([{ path: "postedBy", strictPopulate: false }])
    .exec();

  res.json(related);
};

/////Search  filter///////////////
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category")
    .populate("subs")
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category")
      .populate("subs")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate("category")
      .populate("subs")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleStars = async (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT", //it's return all the info of product schema
        //title: $title  //you can also access all info individually
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("Aggregate error", err);
      Product.find({ _id: aggregates })
        .populate("category")
        .populate("subs")
        .exec((err, products) => {
          if (err) console.log("product agg error", err);
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  try {
    const products = await Product.find({ subs: sub })
      .populate("category")
      .populate("subs")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleBrand = async (req, res, brand) => {
  try {
    const products = await Product.find({ brand })
      .populate("category")
      .populate("subs")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleColor = async (req, res, color) => {
  try {
    const products = await Product.find({ color })
      .populate("category")
      .populate("subs")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleShipping = async (req, res, shipping) => {
  try {
    const products = await Product.find({ shipping })
      .populate("category")
      .populate("subs")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};


exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, sub, brand, color, shipping } = req.body;

  if (query) {
    console.log("query>>>>", query);
    await handleQuery(req, res, query);
  }
  //price[10, 20]
  if (price !== undefined) {
    console.log("price>>>>", price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log("category>>>>", category);
    await handleCategory(req, res, category);
  }

  if (stars) {
    console.log("stars>>>>", stars);
    await handleStars(req, res, stars);
  }

  if (sub) {
    console.log("sub>>>>", sub);
    await handleSub(req, res, sub);
  }

  if (brand) {
    console.log("brand>>>>", brand);
    await handleBrand(req, res, brand);
  }

  if (color) {
    console.log("color>>>>", color);
    await handleColor(req, res, color);
  }

  if (shipping) {
    console.log("shipping>>>>", shipping);
    await handleShipping(req, res, shipping);
  }
};
