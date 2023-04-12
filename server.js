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
const nodemailer = require('nodemailer');

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

  app.post("/ForgotPassword", async (req, res) => {
    const email = req.body.email;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).send("Email exists in the database");
    } else {
      res.status(401).send("Email does not exist in the database");
    }
  });

  app.post("/SendEmail", async (req, res) => {
    const email = req.body.to;
    const user = await userModel.findOne({ email });
    if (user) {
      // Generate a unique token for the user
      const token = await bcrypt.genSalt(10);
      // Store the token in the database for the user
      await userModel.updateOne({ email }, { resetPasswordToken: token });
      // Send an email with the reset password link
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'finalProjectResetPW@gmail.com',
          pass: 'voxlgaondzmwexke'
        }
      });

      // wont work on local host
      const resetPasswordLink = `http://localhost:3000/ResetPassword/${encodeURIComponent(token)}`; // Replace with your reset password page URL

      const mailOptions = {
        from: 'finalProjectResetPW@gmail.com',
        to: email,
        subject: req.body.subject,
        text: `${req.body.text} ${resetPasswordLink}`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).send("Email not sent");
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send("An email was sent, follow instructions to change password");
        }
      });
    } else {
      res.status(401).send("Email does not exist in the database");
    }
  });

  // app.get("/ResetPassword/:token", async (req, res) => {
  //   const token = req.params.token;
  //   const user = await userModel.findOne({ resetPasswordToken: token });
  //   if (!user) {
  //     return res.status(401).send("Invalid or expired reset token");
  //   }
  //   res.status(200).send("Reset password page");
  // });
  
// app.post("/SendEmail", async (req, res) => {

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'finalProjectResetPW@gmail.com',
//       pass: 'voxlgaondzmwexke'
//     }
//   });

//   const mailOptions = {
//     from: 'finalProjectResetPW@gmail.com',
//     to: req.body.to,
//     subject: req.body.subject,
//     text: req.body.text
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//       res.status(500).send("Email not sent");
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.status(200).send("An email was sent, follow instructions to change password");
//     }
//   });
// });



app.listen(3001, ()=>{
    console.log("Server running on port 3001 ...");
})