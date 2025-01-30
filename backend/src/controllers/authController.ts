import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';  // Import bcryptjs
import User from '../models/User'; // Import the User model

// Register User Method
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    // Check if the user already exists (by username or email)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for the new user
    const payload = { userId: newUser._id }; // You can add more data if needed
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });

    // Send back the JWT token
    return res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Login User Method
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }); 
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the plain password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const userData = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      friends: user.friends.map((id) => id.toString()),
      friendRequests: {
        sent: user.friendRequests.sent.map((id) => id.toString()),
        received: user.friendRequests.received.map((id) => id.toString()),
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Generate a JWT token 
    const token = jwt.sign(userData, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });

    // Send back the JWT token
    return res.status(200).json({
      user: userData,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// src/controllers/authController.ts

export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
 
    // res.clearCookie('token');  // Clears the cookie if you use cookies 
    
    return res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
