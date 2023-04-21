const employeeDB = require("../models/user.model");

exports.getAll = async (req, res) => {
  const allEmployees = await employeeDB.getAll();
  if (allEmployees) {
    res.json({
      allEmployees: allEmployees.map(user => ({
        address: user.address,
        phone: user.phone,
        username: user.username
      }))
    });
  } else {
    res.json({ title: "Error", body: "No Data available." });
  }
};
exports.getById = async (req, res) => {
  const id = req.params.id;
  const employee = await employeeDB.getById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.json({ title: "Error", body: "Employee does not exist." });
  }
};
exports.getAllByResturantId = async (req, res) => {
  const allEmployees = await employeeDB.getAllByResturantId(req.params.id);
  if (allEmployees) {
    res.json({
      allEmployees: allEmployees.map(user => ({
        address: user.address,
        phone: user.phone,
        username: user.username
      }))
    });
  } else {
    res.json({ title: "Error", body: "No Data available." });
  }
};