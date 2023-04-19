const bankNoteSummaryDB = require("../models/banknotesummary.model");

exports.getAll = async (req, res) => {
  const banknotesummarys = await bankNoteSummaryDB.getAll();
  if (banknotesummarys) {
    res.json({banknotesummarys});
  } else {
    res.json({ title: "Error", body: "No Data available." });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const banknotesummary = await bankNoteSummaryDB.getById(id);
  if (banknotesummary) {
    res.json(banknotesummary);
  } else {
    res.json({ title: "Error", body: "restaurant does not exist." });
  }
};

exports.createNew = async (req, res) => {
  try {
    await bankNoteSummaryDB.createNew(req.body);
  } catch (error) {
    console.log(error)
  }
  res
    .status(201)
    .json({ title: "Success", body: "banknote summary created successfully." });
};