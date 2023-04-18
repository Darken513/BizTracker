const restaurantDB = require("../models/restaurant.model");

exports.getAll = async (req, res) => {
  const restaurants = await restaurantDB.getAll();
  console.log(restaurants);
  if (restaurants) {
    res.json({restaurants});
  } else {
    res.json({ title: "Error", body: "No Data available." });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const restaurant = await restaurantDB.getById(id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.json({ title: "Error", body: "restaurant does not exist." });
  }
};

exports.createNew = async (req, res) => {
  console.log({...req.body});
  const restaurant = await restaurantDB.createNew(req.body);
  console.log(restaurant);
  res
    .status(201)
    .json({ title: "Success", body: "Restaurant created successfully." });
};
