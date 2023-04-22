const jwt = require("jsonwebtoken");
const userDB = require("../models/user.model");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userDB.getByUsernameAndPassword(username, password);
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        restaurantId: user.restaurantId,
      },
      "BizTrackLongKeyHere!!"
    ); //make the key a general constant
    res.json({ token });
  } else {
    res.json({ title: "Error", body: "Wrong credentials." });
  }
};

exports.signup = async (req, res) => {
  const emailExists = await userDB.getByEmail(req.body.email);
  const usernameExists = await userDB.getByUsername(req.body.username);
  if (emailExists) {
    res.json({ title: "Error", body: "Email already exists." });
    return;
  }
  if (usernameExists) {
    res.json({ title: "Error", body: "Username already exists." });
    return;
  }
  try {
    await userDB.createNew(req.body);
  } catch (error) {
    console.log(error)
  }
  res
    .status(201)
    .json({ title: "Success", body: "User created successfully." });
};