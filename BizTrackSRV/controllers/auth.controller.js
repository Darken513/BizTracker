const jwt = require("jsonwebtoken");
const userDB = require("../models/user.model");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userDB.getByEmailAndPassword(email, password);
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      "BizTrackLongKeyHere!!"
    ); //make the key a general constant
    res.json({ token });
  } else {
    res.json({ title: "Error", body: "Wrong credentials." });
  }
};

exports.signup = async (req, res) => {
  const userExists = await userDB.getByEmail(req.body.email);
  if (userExists) {
    res.json({ title: "Error", body: "Email already exists." });
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