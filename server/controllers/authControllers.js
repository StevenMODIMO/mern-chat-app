require("dotenv").config();
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const otp = crypto.randomInt(1000000).toString().padStart(6, "0");



const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET)
}

// validate controller
const validateUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.validate(username, email, password)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Confirmation",
      text: `Your OTP is ${otp}`,
    };
  
    transporter.sendMail(message, (err, info) => {
      if (err) {
        throw Error(err);
      } else {
        console.log(info);
      }
    });
    res.status(200).json({username, email, password, otp})
  } catch(error) {
    res.status(400).json({error: error.message})
  }
};
 // signup user
const signupUser = async(req, res) => {
  const { inputCode, otvUsername, otvEmail, otvPass, otvCode} = req.body
  try {
    const user = await User.signup(inputCode, otvUsername, otvEmail, otvPass, otvCode)
    const token = createToken(user._id)
    const id = user._id
    const email = otvEmail
    const username = user.username
    res.status(200).json({username, token, id })
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}
 // login user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    const id = user._id
    const username = user.username
    res.status(200).json({username, token, id})

  } catch(error) {
   res.status(400).json({error: error.message})
  }
}

module.exports = { validateUser,signupUser, loginUser}
