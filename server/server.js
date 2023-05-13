const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('./dataModels/userModel');
const organizationModel = require('./dataModels/organizationModel');
const activityModel = require('./dataModels/activityModel');
const {requireAuth, requireAdmin} = require('./auth');
const nodemailer = require('nodemailer')
require('dotenv').config();

const userTypes = ['NormalUser', 'ContactPerson', 'Admin'];


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://yazbakm:muhannad123@togetherfornazareth.3x9t2iv.mongodb.net/LetsVolunteer?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});


app.post("/register", async (req, res) => {
    console.log("User to be added ", req.body);
    const firstName = req.body.personalDetails.firstName;
    const lastName = req.body.personalDetails.lastName;
    const email = req.body.personalDetails.email;
    const phone = req.body.personalDetails.phone;
    const password = req.body.passwordDetails.password;
    const repassword = req.body.passwordDetails.repassword;
    const city = req.body.addressDetails.city;
    const neighborhood = req.body.addressDetails.neighborhood;
    const postalCode = req.body.addressDetails.postalCode;
    const hashedPassword = await bcrypt.hash(password, 10);  //hash the password with salt factor of 10
    const passmatch = (password === repassword);
    if (!passmatch){
        res.status(401).send(["Passwords does not match"]);
    }
    const user =new userModel ({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: {
        city: city,
        neighborhood: neighborhood,
        postalCode: postalCode,
      },
      password: hashedPassword,
    });
    try {
        await user.save();
        // Create JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json(token);
        console.log("Inserted");
      } catch (err) {
        console.log(err, user);
        res.status(406).send(["Failed to Add new user"]);
      }
});

app.post("/addOrganization", async (req, res) => {
  const assocDetails = {
    assocName: req.body.assocDetails.assocName,
    assocDescription: req.body.assocDetails.assocDescription,
    assocSpeciality: req.body.assocDetails.assocSpeciality,
    assocWebsite: req.body.assocDetails.assocWebsite
  }
  const addressDetails = {
      city: req.body.addressDetails.city,
      neighborhood: req.body.addressDetails.neighborhood,
      street: req.body.addressDetails.street,
      postalCode: req.body.addressDetails.postalCode
  };
  const contactDetails = {
    firstName: req.body.contactDetails.firstName,
    lastName : req.body.contactDetails.lastName,
    email : req.body.contactDetails.email,
    phone : req.body.contactDetails.phone,
    password : req.body.contactDetails.password
  }
  const hashedPassword = await bcrypt.hash(contactDetails.password, 10); // hash the password with salt factor of 10
  const passmatch = (contactDetails.password === req.body.contactDetails.repassword);
  if (!passmatch){
      res.status(401).send(["Passwords does not match"]);
  }
  contactDetails.password = hashedPassword;
  const organization =new organizationModel ({
    assocDetails: assocDetails,
    addressDetails: addressDetails,
    contactDetails: contactDetails,
  });
  try {
      await organization.save();
      res.status(200).send(["Inserted organization", organization]);
      console.log("Inserted Organization");
    } catch (err) {
      console.log(err, organization);
      res.status(406).send(["Failed to Add new user"]);
    }
});

app.get('/users',requireAuth, requireAdmin, async (req, res) => {

  await userModel.find()
    .then((response) => {
      console.log('Data = ', response);
      res.json(response);
    })
    .catch((error) => {
      console.log('ERROR Fetching Data', error);
      res.status(500).send('Error fetching data');
    });
});

app.get('/organizations',requireAuth, async (req, res) => {

  await organizationModel.find()
    .then((response) => {
      console.log('Data = ', response);
      res.json(response);
    })
    .catch((error) => {
      console.log('ERROR Fetching Data', error);
      res.status(500).send('Error fetching data');
    });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const ru = await userModel.findOne({ email });
  if (!ru) {
    return res.status(401).send("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, ru.password);
  if (!passwordMatch) {
    return res.status(401).send("Invalid email or password");
  }

  // Create JWT
  const tkn = jwt.sign({ userId: ru._id, userType: ru.userType }, process.env.JWT_SECRET);
  console.log('JWT : ', tkn, ' user: ', ru);
  res.status(200).json({tkn, ru});
});

app.post("/forgotPassword", async (req, res) => {
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

app.post('/joinActivity', requireAuth, async (req, res) => {
  const { signedUser, activityId } = req.body;
  console.log("userId = ", signedUser._id, " activity = ", activityId);
  try {
    const user = await userModel.findById(signedUser);
    const activity = await activityModel.findById(activityId);

    console.log("The user: " + user);
    console.log("The Activity: " + activity);

    if (!user || !activity) {
      console.log("yes");
      return res.status(404).send("User or activity not found");
    }

    if (!user.joinedActivities.find(a => a.toString() === activityId)) {
      user.joinedActivities.push(activityId);
      await user.save();
    }

    res.status(200).send("Activity joined successfully.");
  } catch (error) {
    console.log("This is the error ", error);
    res.status(500).send("Server error.");
  }
});

app.put('/users/:id', async (req, res) => {
  console.log("req.body = ", req.body);
  const { firstName, lastName, email, phone } = req.body.personalDetails;
  const { city, neighborhood, postalCode } = req.body.addressDetails;
  const {password} = req.body.passwordDetails;
  try {
    const newuser = await userModel.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      phone,
      password: await bcrypt.hash(password,10),
      address: { city, neighborhood, postalCode }
    }, { new: false });
    console.log("Updated to: ", newuser);
    res.status(200).json({ newuser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// app.put('/users/:id', async (req, res) => {
//   console.log('req = ', req);
//   const { firstName, lastName, email, phone, password } = req.body;
//   const {city, neighborhood, postalCode} = req.body.addressDetails;
//   try {
//     const newuser = await userModel.findByIdAndUpdate(req.params.id, {
//       firstName,
//       lastName,
//       email,
//       phone,
//       password,
//       city,
//       neighborhood,
//       postalCode
//     }, { new: true });
//     console.log("Updated to: ", newuser);
//     res.status(200).json({  newuser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.listen(3001, ()=>{
    console.log("Server running on port 3001 ...");
})

module.exports = app;