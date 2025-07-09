import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone , address, answer} = req.body;
    if (!name || !email || !password || !phone  || !address|| !answer ) {
      return res.status(401).send({
        success:false,
        message: "required all  filled",
      });
    }
    const alreadyExistsUser = await userModel.findOne({ email });
    if (alreadyExistsUser) {
      return res.status(200).send({
        success: false,
        message: "Already exist user",
      });
    }
    const hashedPassword = await hashPassword(password);
    //save
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    })
   await user.save();
    res.status(201).send({
        success: true,
        message: "user register successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
      message: "error in registeration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not exist",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "password is not correct",
      });
    }
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
        success: true,
        message: "succcessfully login",
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
        success: false,
        message: "error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  console.log("protected route");
  res.status(200).send({
    success: true,
    message: "hello from admin",
  });
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(404).send({
        success: false,
        message: "unauthorized access",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
        success: false,
      error,
    });
  }
};
export const forgotPasswordController = async (req, res) => {
  const { email, answer, newPassword } = req.body;
  try {
    if (!email || !answer || !newPassword) {
      console.log("wrong email")
       res.status(400).send({
        success: false,
        message: "All fields are required"
      });
    }

    // Find the user
    const user = await userModel.findOne({ email ,answer});
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer"
      });
    }

    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update user password
    await userModel.findByIdAndUpdate( user._id, {
      password: hashedNewPassword
    });

    return  res.status(200).send({
      success: true,
      message: "Password Reset Successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    });
  }
};
