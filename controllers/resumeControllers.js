// express related
const express = require("express");

// mongoose related
const mongoose = require("mongoose");
const User = require("../models/User.js");
const Resume = require("../models/Resume.js");
ObjectId = require('mongodb').ObjectID;

// bcrypt related
const bcryptjs = require("bcryptjs");

// jwt related
const jwt = require("jsonwebtoken");

// passport related
const passport = require("passport");

const giveCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
};

const get_resume = (req, res, next) => {
  const { resumeID } = req.params;
  if (!resumeID) res.sendStatus(500).json();
  Resume.findOne({ _id: resumeID })
    .then((resumeData) => {
      User.findById(resumeData["user"])
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      res.json({
        success: true,
        data: {
          resumeData,
        },
        error: null,
      });
    })
    .catch((err) => console.log(err));
};

const new_resume = async (req, res, next) => {
  // const resumeData = { ...req.body };
  // const resumeDataKeys = Object.keys(resumeData);
  // const attributes = Object.keys(Resume.schema.paths);
  
  
  const newResumeInstance = new Resume({
    fullName: "Enter Your Name",
    institute: "DA-IICT",
    email: "user@emample.xyz",
    profile: "Enter your profile Information",
    DOB: Date.now(),
    address: "Enter Your Address",
    education:  [],
    skills: "",
    internships:  [],
    projects: [],
    positionOfResponiblity: [],
    intrestAndHobbies: [],
    achievements: [],
    templateType: req.body.index,
    others: {},
    created: giveCurrentDate(),
    updated: giveCurrentDate(),
  });

   let userId = req.user.id;
  if(req.user?.provider) {
    const user = await User.findOne({username: req.user?.emails[0].value.slice(0, -10)});
    // //("hehehheheehhe--------------------",user);
    userId = user._id;
  }
  
  newResumeInstance.user = userId;
  console.log(newResumeInstance);


  ("hereeeee---------------",req.user.id);

  const newData = await User.findById(userId);
  newData.resumes = newResumeInstance._id;
  await newData.save();

  // const currUser1 = await User.findById(userId);
  // //({ currUser1 });

  try {
    const data = await newResumeInstance.save();
    //(data);
    res.json({
      success: true,
      data: {
        resumeId: data._id,
      },
      error: null,
    });
  } catch (err) {
    // //(err);
    res.sendStatus(500).json();
  }
};

const edit_resume = async (req, res, next) => {
  const { resumeID } = req.params;
  const resumeData = { ...req.body };
  const resumeDataKeys = Object.keys(resumeData);
  const attributes = Object.keys(Resume.schema.paths);
  let obj1 = {};
  let otherObj = {};
  resumeDataKeys.forEach((key) => {
    if (attributes.indexOf(key) != -1) {
      Object.defineProperty(obj1, key, { value: resumeData[key] });
    } else {
      Object.defineProperty(otherObj, key, { value: resumeData[key] });
    }
  });

  try {
    // //(obj1);
    const updatedResumeInstance = await Resume.findByIdAndUpdate(
      resumeID,
      {
        fullName: obj1?.fullName || "",
        institute: obj1?.institute || "",
        email: obj1?.email || "",
        profile: obj1?.profile || "",
        DOB: obj1?.DOB || Date.now(),
        address: obj1?.address || "",
        education: obj1?.education || [],
        skills: obj1?.skills || [],
        internships: obj1?.internships || [],
        projects: obj1?.projects || [],
        positionOfResponiblity: obj1?.positionOfResponiblity || [],
        intrestAndHobbies: obj1?.intrestAndHobbies || [],
        achievements: obj1?.achievements || [],
        templateType: obj1?.templateType || 0,
        others: otherObj,
        updated: giveCurrentDate(),
      },
      { new: true }
    );

    // //(updatedResumeInstance);
    res.json({
      success: true,
      data: {
        msg: "Saved Succesfully",
      },
      error: null,
    });
  } catch (err) {
    // //(err);
    res.sendStatus(500).json();
  }
};

module.exports = { get_resume, new_resume, edit_resume };