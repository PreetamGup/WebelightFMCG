"use strict";
const express_1 = require("express");
const { registerController, loginController } = require('../controllers/userController');
const router = (0, express_1.Router)();
router.post("/register", registerController);
router.post("/login", loginController);
module.exports = router;
