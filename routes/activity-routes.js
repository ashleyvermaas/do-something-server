const express = require('express');
const activityRoutes = express.Router();
const User = require('../models/user-model');
const Activity = require('../models/activity-model');

// Get list of all activities
activityRoutes.get('/activities', (req, res, next) => {
  
})

// Get activities from specific owner
activityRoutes.get('/activities/:ownerId', (req, res, next) => {

})

// Get specific activity
activityRoutes.get('/activities/:activityId', (req, res, next) => {

})


// Create activity
activityRoutes.post('/activities/create', (req, res, next) => {

})

// Update specific activity
activityRoutes.post('/activities/:activityId', (req, res, next) => {

})

// Delete specific activity
activityRoutes.post('/activities/:activityId', (req, res, next) => {

})

module.exports = activityRoutes;