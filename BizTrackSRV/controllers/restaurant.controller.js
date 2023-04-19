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
  try {
    await restaurantDB.createNew(req.body);
  } catch (error) {
    console.log(error)
  } 
  res
    .status(201)
    .json({ title: "Success", body: "Restaurant created successfully." });
};
