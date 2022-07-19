const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  // console.log(req.body.authtoken);
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { picture, name: email.split("@")[0] },
    { new: true }
  );

  if (user) {
    console.log("User Updated", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("User created", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new ERROR(err);
    res.json(user);
  });
};

exports.listUsers = async (req, res) => {
  const list = await User.find().exec();
  res.json(list);
}
