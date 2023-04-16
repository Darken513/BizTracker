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
        notif_time: user.notif_time,
        design_mode: user.design_mode,
      },
      "BizTrackLongKeyHere!!"
    ); //make the key a general constant
    res.json({ token });
  } else {
    res.json({ title: "Error", body: "Wrong credentials." });
  }
};

exports.signup = async (req, res) => {
  const { email, password, username } = req.body;
  const userExists = await userDB.getByEmail(email);
  if (userExists) {
    res.json({ title: "Error", body: "Email already exists." });
    return;
  }
  await userDB.createNew(password, email, username);
  res
    .status(201)
    .json({ title: "Success", body: "User created successfully." });
};