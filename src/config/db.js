const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Reffercode",{

}).then(() =>{
    console.log("connection succesfull")
}).catch((e) => {
    console.log("no connection");
})