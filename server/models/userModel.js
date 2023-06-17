const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String
  }
});

userSchema.statics.validate = async function validate(username, email, password) {
  // input validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  return exists;
};

userSchema.statics.signup = async function signup(
  inputCode,
  otvUsername,
  otvEmail,
  otvPass,
  otvCode
) {
  if (!inputCode) {
    throw Error("Field must be filled");
  }

  if (inputCode !== otvCode) {
    throw Error("Invalid or Expired code");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(otvPass, salt);

  const user = await this.create({ username: otvUsername, email:otvEmail, password: hash });
  return user;
};

userSchema.statics.login = async function login(email, password) {
  // input validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email.");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password.");
  } 
  return user;
};

userSchema.statics.edit = async function edit(email, username, user_id) {
  if(!username || !email) {
    throw Error("All fields must be filled")
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  
  const update = await this.findOneAndUpdate({_id: user_id}, {
      username: username,
      email: email
    }, { new: true})
    
    return update
}

module.exports = mongoose.model("User", userSchema);
