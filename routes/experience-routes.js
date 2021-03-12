const express = require('express');
const mongoose = require('mongoose');
const experienceRoutes = express.Router();
const Experience = require('../models/experience-model');
const Activity = require('../models/activity-model');

// View all experiences
experienceRoutes.get('/experiences', (req, res, next) => {
  const userInSession = req.user;
  const userId = userInSession ? userInSession._id : null;


  Experience.find({user: {$nin: userId}})
    .then((experiences) => {
      res.status(200).json(experiences)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// View all experiences of specific activity
experienceRoutes.get('/activities/:activityId/experiences', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.activityId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }
  Experience.find({ activity: req.params.activityId })
    .then((experiences) => {
      res.status(200).json(experiences)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})


// View specific experience
experienceRoutes.get('/experiences/:experienceId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.experienceId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }
  Experience.findById(req.params.experienceId)
    .then((experience) => {
      res.status(200).json(experience)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})


// Create experience
experienceRoutes.post('/activities/:activityId/experiences', (req, res, next) => {
  Experience.create({
    date: req.body.date,
    description: req.body.description,
    rating: req.body.rating,
    imageUrl: req.body.imageUrl,
    activity: req.params.activityId,
    owner: req.user._id
  })
    .then((newExperience) => {
      return Activity.findByIdAndUpdate(req.params.activityId, {
        $push: { experiences: newExperience }
      })
    })
    .then((newExperience) => {
      res.status(200).json(newExperience)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Update specific experience
experienceRoutes.put('/experiences/:experienceId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.experienceId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Experience.findByIdAndUpdate(req.params.experienceId, req.body, {
    new: true
  })
    .then((updatedExperience) => {
      res.status(200).json(updatedExperience)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Delete specific experience
experienceRoutes.delete('/experiences/:experienceId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.experienceId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Experience.findByIdAndRemove(req.params.experienceId)
    .then(() => {
      res.json({
        message: `Experience with the id ${req.params.experienceId} has been removed`
      })
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


module.exports = experienceRoutes;