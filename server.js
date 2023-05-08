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

  app.post('/UpdatePassword', async (req, res) => {
    const email = 'kk@gmail.com';
    const pw = req.body.password;
    const hashedPassword = await bcrypt.hash(pw, 10); // hash the password with salt factor of 10

    try {
      // Find the user with the specified email
      const user = await userModel.findOne({ email });
      if (!user) {
          res.status(401).send("User not found!");
      }
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      // Send a success response
      res.status(200).send("Password updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

  // add activity
  app.post("/AddActivity", async (req, res) => {
    const {
      associationName,
      associationSpeciality,
      associationDescription,
      activityName,
      activityDate,
      associationAddress,
      associationWebsite,
      associationContact,
    } = req.body;
  
    const activity = new activityModel({
      associationName,
      associationSpeciality,
      associationDescription,
      activityName,
      activityDate,
      associationAddress,
      associationWebsite,
      associationContact,
    });
  
    try {
      await activity.save();
      res.status(200).send(["Inserted Activity", activity]);
      console.log("Inserted Activity");
      // res.status(201).send(activity);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // fetch activities
  app.get("/GetActivities", async (req, res) => {
    try {
      const activities = await activityModel.find({});
      res.status(200).send(activities);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // update activity
  app.patch("/activity/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "associationName",
      "associationSpeciality",
      "associationDescription",
      "activityName",
      "activityDate",
      "associationAddress",
      "associationWebsite",
      "associationContact",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
  
    try {
      const activity = await activityModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!activity) {
        return res.status(404).send();
      }
  
      res.send(activity);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // delete activity
  app.delete("/activity/:id", async (req, res) => {
    try {
      const activity = await activityModel.findByIdAndDelete(req.params.id);
  
      if (!activity) {
        res.status(404).send();
      }
  
      res.send(activity);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.post('/joinActivity', async (req, res) => {
    const { userId, activityId } = req.body;
    try {
      const user = await userModel.findById(userId);
      const activity = await activityModel.findById(activityId);
  
      console.log("The user: " + user);
      console.log("The Activity: " + activity);

      if (!user || !activity) {
        console.log("yes");
        return res.status(404).send("User or activity not found");
      }
  
      if (!user.joinedActivities.includes(activityId)) {
        user.joinedActivities.push(activityId);
        await user.save();
      }
  
      res.status(200).send("Activity joined successfully.");
    } catch (error) {
      res.status(500).send("Server error.");
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