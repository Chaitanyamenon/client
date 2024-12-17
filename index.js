const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');  
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/User', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
  
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ status: 'ok', message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: 'error', message: 'User not found' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ status: 'error', message: 'Invalid password' });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },  
      'secret123',
      { expiresIn: '1h' }
    );

    return res.json({ status: 'ok', user: token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decodedToken = jwt.verify(token, 'secret123');
    req.user = decodedToken;  
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    return res.status(403).send('Invalid Token');
  }
};

app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }


    res.json({ name: user.name });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.listen(1337, () => {
  console.log('Server running on port 1337');
});

app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});
