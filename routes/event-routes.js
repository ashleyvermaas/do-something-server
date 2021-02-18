const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = express.Router();
const User = require('../models/user-model');
const Activity = require('../models/activity-model');
const Event = require('../models/event-model');


// View all events
eventRoutes.get('/events', (req, res, next) => {
  Event.find()
  .populate('activities')
  .then((event) => {
    res.status(200).json(event)
  })
  .catch((error) => {
    res.status(500).json(error)
  })
});


// View specific event
eventRoutes.get('/events/:eventId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Event.findById(req.params.eventId)
    .populate('activities')
    .then((event) => {
      res.json(event)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});


// Create event
eventRoutes.post('/events/create', (req, res, next) => {
  Event.create({
    title: req.body.title,
    description: req.body.description,
    activities: [],
    owner: req.user._id
  })
  .then((newEvent) => {
    res.status(200).json(newEvent)
  })
  .catch((error) => {
    res.status(500).json(error)
  })
});


// Update event
eventRoutes.post('/events/:eventId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Event.findByIdAndUpdate(req.params.eventId, req.body, {
    new: true
  })
  .then((updatedEvent) => {
    res.status(200).json(updatedEvent)
  })
  .catch((error) => {
    res.status(500).json(error)
  })

});


// Delete event
eventRoutes.delete('/events/:eventId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Event.findByIdAndRemove(req.params.eventId)
    .then(() => {
      res.json({
        message: `Event with the id ${req.params.eventId} has been removed`
      })
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});

module.exports = eventRoutes;