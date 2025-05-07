const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Function to generate random attendance (80-100%)
const getRandomAttendance = () => Math.floor(Math.random() * 21) + 80;

// Define the Attendance Schema
const attendanceSchema = new mongoose.Schema({
  Sub1att: { type: Number, default: getRandomAttendance },
  Sub2att: { type: Number, default: getRandomAttendance },
  Sub3att: { type: Number, default: getRandomAttendance },
  Allatt: { type: Number, default: getRandomAttendance },
});

// Define the Internals Schema
const internalsSchema = new mongoose.Schema({
  T1: { type: Number, default: 0 },
  T2: { type: Number, default: 0 },
  T3: { type: Number, default: 0 },
  T4: { type: Number, default: 0 },
  T5: { type: Number, default: 0 },
});

// Define the User Schema
const userSchema = new mongoose.Schema({
  Regno: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  attendance: attendanceSchema, // Embed Attendance Schema
  internals: internalsSchema,   // Embed Internals Schema
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare the entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
