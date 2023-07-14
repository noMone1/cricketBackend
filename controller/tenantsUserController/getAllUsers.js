const CompanyEmployee = require("../../models/TenantUser");
const { createUserSchema } = require("../../validations/tenantUser");
const ObjectId = require("mongoose").Types.ObjectId;
const getEmployees = async (req, res) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  const query = {};
  // if using our hrms then fetch from hrms database
  
  if (req.query.search) {
    query.$or = [];
    query.$or.push({ name: { $regex: req.query.search, $options: "i" } });
    query.$or.push({ email: { $regex: req.query.search, $options: "i" } });
    query.$or.push({ id: { $regex: req.query.search, $options: "i" } });
  }
  const { status, employee_id } = req.query;
  if (status) {
    query.status = status;
  }
  if (employee_id) {
    query.employee_id = employee_id;
  }
  query.userRefAccount = new ObjectId(req.user.userId);
  try {
    const users = await CompanyEmployee.find(query).skip(start).limit(limit);
    const totalCount = await CompanyEmployee.countDocuments(query);
    res.status(200).json({ start, limit, totalCount, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getEmployees;
