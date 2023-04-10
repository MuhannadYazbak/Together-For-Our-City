const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const userModel = require("./models/userModel");
const organizationModel = require("./models/organizationModel");
const activityModel = require("./models/activityModel");
const UserFeedbackModel = require("./models/feedBackModelForUser");
const OrganizationFeedbackModel = require("./models/feedbackModelForOrganization");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://yazbakm:muhannad123@togetherfornazareth.3x9t2iv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.post("/Register", async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const type = req.body.type;
    const password = req.body.password;
    const status = req.body.status;
    const birthDate = req.body.birthDate;
    const registerDate = new Date();
    const gender = req.body.gender;
    const address = req.body.address;
    const newPassword = await bcrypt.hash(password, 10)
    const user = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: newPassword,
      type: type,
      status: status,
      birthDate: birthDate,
      registerDate: registerDate,
      gender: gender,
      address: address,

    });
    try {
      await user.save();
      res.send(200, ["Inserted user", user]);
    } catch (err) {
      console.log(err);
    }
  });


app.listen(3001, ()=>{
    console.log("Server running on port 3001 ...");
})