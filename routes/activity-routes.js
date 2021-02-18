const express = require('express');
const mongoose = require('mongoose');
const activityRoutes = express.Router();
const User = require('../models/user-model');
const Activity = require('../models/activity-model');


// Get list of all activities
activityRoutes.get('/activities', (req, res, next) => {
  Activity.find()
    .then((activities) => {
      res.status(200).json(activities)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Get specific activity
activityRoutes.get('/activities/:activityId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.activityId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Activity.findById(req.params.activityId)
    .then((activity) => {
      res.json(activity)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Create activity
activityRoutes.post('/activities/create', (req, res, next) => {
  Activity.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      owner: req.user._id
    })
    .then((newActivity) => {
      res.status(200).json(newActivity)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});

// Update specific activity
activityRoutes.post('/activities/:activityId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.activityId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Activity.findByIdAndUpdate(req.params.activityId, req.body, {
      new: true
    })
    .then((updatedActivity) => {
      res.status(200).json(updatedActivity)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Delete specific activity
activityRoutes.delete('/activities/:activityId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.activityId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Activity.findByIdAndRemove(req.params.activityId)
    .then(() => {
      res.json({
        message: `Activity with the id ${req.params.activityId} has been removed`
      })
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});

module.exports = activityRoutes;