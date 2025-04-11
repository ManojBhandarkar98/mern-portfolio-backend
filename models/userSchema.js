import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required..!"],
  },
  email: {
    type: String,
    required: [true, "Email Required..!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number Required..!"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me field is Required..!"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [8, "Password must contain at least 8 characters..!"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL is required"],
  },
  linkedInUrl: String,
  githubURL: String,
  twitterURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



export const User = new mongoose.model("User", userSchema);
