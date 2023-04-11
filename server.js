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

mongoose.connect('mongodb+srv://yazbakm:muhannad123@togetherfornazareth.3x9t2iv.mongodb.net/LetsVolunteer?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.post("/Register", async (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const type = req.body.type;
    const password = req.body.password;
    const status = req.body.status;
    const birthDate = req.body.birthdate;
    const registerDate = new Date();
    const gender = req.body.gender;
    const address = req.body.residence;
    const hashedPassword = await bcrypt.hash(password, 10); // hash the password with salt factor of 10
    const user = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: hashedPassword,
      type: type,
      status: status,
      birthDate: birthDate,
      registerDate: registerDate,
      gender: gender,
      address: address,

    });
    try {
      await user.save();
      // res.send(200, ["Inserted user", user]);
      res.status(200).send(["Inserted user", user]);
      console.log("Inserted");
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }
    res.status(200).send("Login successful");
  });


app.listen(3001, ()=>{
    console.log("Server running on port 3001 ...");
})