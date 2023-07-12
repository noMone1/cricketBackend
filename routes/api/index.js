const router = require("express").Router();
const authRoutes = require("./auth/Auth.route");
const planRoutes = require("./plans/Plan.route");
const companyRoute = require("./tenantRoute")

router.use("/auth", authRoutes);
router.use("/plans", planRoutes);
router.use("/tenant", companyRoute);





module.exports = router;