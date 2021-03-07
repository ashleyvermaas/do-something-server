const express = require('express');
const mongoose = require('mongoose');
const activityRoutes = express.Router();
const User = require('../models/user-model');
const Activity = require('../models/activity-model');


// View all activities
activityRoutes.get('/activities', (req, res, next) => {
  Activity.find()
    .populate('experiences')
    .then((activities) => {
      res.status(200).json(activities)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// View specific activity
activityRoutes.get('/activities/:activityId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.activityId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Activity.findById(req.params.activityId)
    .populate('experiences')
    .then((activity) => {
      res.status(200).json(activity)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Create activity
activityRoutes.post('/activities', (req, res, next) => {
  Activity.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    experiences: [],
    //owner: req.user._id
  })
    .then((newActivity) => {
      res.status(200).json(newActivity)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Update specific activity
activityRoutes.put('/activities/:activityId', (req, res, next) => {
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
      res.status(200).json({
        message: `Activity with the id ${req.params.activityId} has been removed`
      })
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});

module.exports = activityRoutes;