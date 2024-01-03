const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { username, birthdate } = req.body;

  const existingUser = await User.findOne({username,birthdate });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  

  const user = await User.create({ username, birthdate });
  const token = jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(StatusCodes.CREATED).json({ token });
};

const login = async (req, res) => {
    const { username } = req.body;
    
      if (!username) {
        throw new BadRequestError("Please provide username");
      }
  
      const user = await User.findOne({ username });
  
      if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
      }
      const token = jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
  
      res.status(StatusCodes.OK).json({ token });
    
   
  };
  
  module.exports = { login,register };
