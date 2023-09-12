const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
require("./src/config/db")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



const userRouters = require("./src/router/user.route")
app.use("/user",userRouters)
    
// const adminRouters = require("./src/route/admin.route")
// app.use("/admin",adminRouters)


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
}); 