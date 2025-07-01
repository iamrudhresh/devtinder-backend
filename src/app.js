const express = require('express');
const app = express();
require('./../config/database'); // Adjust the path as necessary
const user = require('./../models/user'); // Adjust the path as necessary
app.use(express.json());


app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new user({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.get('/users', async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await user.find({ email: userEmail });
    if (users.length === 0) { 
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

app.get('/feed',async (req, res) => {
  try {
    const users = await user.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching feed', error: error.message });
  }
});

app.delete('/user/delete', async (req, res) => {
  const userId = req.body.userId; // Assuming the user ID is sent in the request body
  try {
    const deletedUser = await user.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });    
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});