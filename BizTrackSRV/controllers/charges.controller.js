const chargesDB = require("../models/charges.model");

exports.getAll = async (req, res) => {
  const allCharges = await chargesDB.getAll();
  if (allCharges) {
    res.json({allCharges});
  } else {
    res.json({ title: "Error", body: "No Data available." });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const charges = await chargesDB.getById(id);
  if (charges) {
    res.json(charges);
  } else {
    res.json({ title: "Error", body: "charges does not exist." });
  }
};

exports.getBybanknoteSummaryId = async (req, res) => {
  const id = req.params.id;
  const charges = await chargesDB.getBybanknoteSummaryId(id);
  if (charges) {
    res.json(charges);
  } else {
    res.json({ title: "Error", body: "charges does not exist." });
  }
};

exports.createNew = async (req, res) => {
  try {
    await chargesDB.createNew(req.body);
  } catch (error) {
    console.log(error)
  }
  res
    .status(201)
    .json({ title: "Success", body: "Restaurant created successfully." });
};
