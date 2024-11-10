import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: {                // New field for the reset token
    type: String,
    default: null              // Initially null, will be populated when user requests a reset
  },
  resetTokenExpiration: {       // New field for the reset token expiration
    type: Date,
    default: null              // Initially null, will be populated with expiration time
  }
});

export default mongoose.model('User', userSchema);
