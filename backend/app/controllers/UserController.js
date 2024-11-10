// Import necessary modules
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { EncodeToken } from '../utility/tokenUtility.js';
import crypto from "crypto";
import moment from 'moment-timezone';
 

import EmailSend from '../utility/emailUtility.js'; // Import the email utility
// UserController function
const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// UserController function for logging in a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate a JWT token using the utility
    const token = EncodeToken(user.email, user._id);
    // Send the token as response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




// Profile function to retrieve user info
const profile = async (req, res) => {
  try {
    const userId = req.user.user_id;  // `user` will be set by the auth middleware

    // Find the user by ID
    const user = await User.findById(userId).select('-password');  // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user profile data
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const alluser = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Fetch all users excluding password field
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



// UserController function to handle password reset email sending
const userResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Generate a unique reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;

    // Set resetTokenExpiration to 1 hour from the current BST time
    const expirationTimeBST = moment().tz('Asia/Dhaka').add(1, 'hour').toDate();
    user.resetTokenExpiration = expirationTimeBST;
    
    await user.save();

    // Create the reset link
    const resetLink = `https://mern-stack-frontend-ochre.vercel.app/reset/${token}`;

    // Email body and subject
    const emailHTML = `
      <p>You requested a password reset</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
    `;

    // Send the reset email
    const emailSent = await EmailSend(user.email, 'Password Reset Request', 'Reset Your Password', emailHTML);
    if (emailSent) {
      res.send('Reset link sent to your email');
    } else {
      res.status(500).send('Error sending email');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;  // Get token and new password from the body

  try {
    // Find the user with the reset token and check if the token is still valid (not expired)
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },  // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear the reset token and expiration
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}



export { create, login, profile, alluser, userResetPassword, resetPassword };
