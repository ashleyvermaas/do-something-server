const express = require('express');
const authRoutes = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

// Signup
authRoutes.post('/signup', (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(400).json({
      message: 'Please provide username, email and password.'
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.text(password)) {
    res.status(400).json({
      message: 'Password must contain a number, lowercase and uppercase letters and be at least 8 characters long.'
    })
    return;
  }

  User.findOne({ email }), (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong with the email check.'});
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'This email is already taken. Please try a different one.'});
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email: email,
      username: username,
      password: hashPash
    })

    newUser.save(err => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong while trying to save the user to the database.'});
        return;
      }

      req.logIn(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Unable to login after signup due to an error.'});
          return;
        }
        res.status(200).json(newUser);
      })
    })
  }
});

// Login
authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'A problem occurred during user authentication.'});
      return;
    }
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Unable to save the user in session.'});
        return;
      }
      res.status(200).json(theUser);
    })
  })(req, res, next);
});

// Logout
authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Succesful logout.'})
})

// Authorization
authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized access.'})
})

module.exports = authRoutes;