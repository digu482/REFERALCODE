const express = require('express')
const router = express.Router()
const User = require("../model/user");
const controller = require("../controller/user.controoler")

router.post("/register",controller.register)

router.get("/find",controller.find)





module.exports = router