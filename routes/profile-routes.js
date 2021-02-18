const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const profileRoutes = express.Router();

// View profile
profileRoutes.get('/my-profile', (req, res, next) => {
  User.findById(req.user._id)
  .then((userInfo) => {
    res.status(200).json(userInfo);
  })
  .catch((error) => {
    res.status(500).json(error);
  })
})


// Update profile
profileRoutes.post('/my-profile', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body)
  .then((updatedUserInfo) => {
    res.status(200).json(updatedUserInfo)
  })
  .catch((error) => {
    res.status(500).json(error)
  })
})


// Delete profile
profileRoutes.delete('/my-profile', (req, res, next) => {
  User.findByIdAndRemove(req.user._id)
  .then(() => {
    res.json({
      message: `User profile with the id ${req.user._id} has been removed`
    })
  })
  .catch((error) => {
    res.status(500).json(error)
  })
})


module.exports = profileRoutes;