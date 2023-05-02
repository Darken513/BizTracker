const restaurantDB = require("../models/restaurant.model");

exports.getAll = async (req, res) => {
  const restaurants = await restaurantDB.getAll();
  if (restaurants) {
    res.json({restaurants});
  } else {
    res.json({ title: "Error", body: "No Data available." });
  }
};
exports.getAllwithDetails = async (req, res) => {
  const restaurants = await restaurantDB.getAllwithDetails();
  if (restaurants) {
    let toret = []
    restaurants.forEach(restaurant => {
      let restWrapper = toret.find((res)=> restaurant.restaurantId == res.restaurantId)
      if(restWrapper){

      }else{
        let topush = {}
      }
    });
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
