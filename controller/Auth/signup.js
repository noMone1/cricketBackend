const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const Tokens = require("../../models/Tokens")
const { userJoiSchema } = require("../../validations/user");
const logger = require("../../config/logger");
const {ObjectId} = require("mongoose").Types
const generateToken = require("../../helper/generateToken");
const { api_secret } = require("../../config/keys");
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      metaData,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.info("there is already a user entity registerd with this email");
      return res
        .status(400)
        .json({
          message: "There is already a user entity registerd with this email",
        });
    }
    const { error } = userJoiSchema.validate({
      name,
      email,
      phone,
      address,
      password,
      planId:"648adbc07521b64d982ec8dd",
      metaData,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      planId:new ObjectId("648adbc07521b64d982ec8dd"),
      metaData
    });

    await user.save();
    // const accessToken =await  generateToken(user,api_secret); 
    // await Tokens.create({userId:user.id, token:accessToken})
    res.status(201).json({ message: "User created successfully",user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signup;
