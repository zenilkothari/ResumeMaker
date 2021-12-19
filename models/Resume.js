const mongoose = require("mongoose");
const User = require("./User");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const resumeObj = {
  fullName: {
    type: String,
    default: "Name",
  },
  institute: {
    type: String,
    default: "Institute Name",
  },
  profile: {
    type: String,
    default: "Your Information",
  },
  email: {
    type: String,
    default: "youremail@example.xyz",
  },
  DOB: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
    default: "Address",
  },
  education: { type: Array, default: [] },
  // expertiseArea: { type: String, default: "" },
  // programmingLanguage: { type: String, default: "" },
  // toolsAndTechnology: { type: String, default: "" },
  // technicalElective: { type: String, default: "" },
  skills: { type: Array, default: [] },
  internships: { type: Array, default: [] },
  projects: { type: Array, default: [] },
  positionOfResponiblity: { type: Array, default: [] },
  intrestAndHobbies: { type: Array, default: [] },
  achievements: { type: Array, default: [] },
  others: { type: Array, default: [] },
  templateType: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User" },

  created: { type: String, default: "" },
  updated: { type: String, default: "" },
};

const resumeSchema = new Schema(resumeObj);
const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;

// CV related
// /api/resumeData POST <--
// /api/resumeData/:resumeId GET, PUT <--