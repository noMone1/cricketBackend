
const router = require("express").Router();
const employeeRoute = require('./tenantUser')

router.use('/users',employeeRoute);



module.exports = router;
