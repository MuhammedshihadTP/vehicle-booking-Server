const { Router } = require("express");
const router = Router();
const user = require("../controller/users");
router.get("/vehicle", user.getAllVehicles);
router.post("/addvehicle", user.addVehicle);
router.post("/booking", user.addBooking);

module.exports = router;
