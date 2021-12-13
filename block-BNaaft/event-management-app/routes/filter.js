let express = require('express');
let Event = require('../models/event');
let Category = require('../models/category');
let Remark = require('../models/remark');
let Location = require('../models/location');
let router = express.Router();

router.get('/oldest', (req, res) => {
  Event.find({}).sort({start_date: 1}).exec((err, events) => {
    if(err){
      return next(err);
    }
    Category.find({}, (err, categories) => {
      if(err){
        return next(err);
      }
      Location.find({}, (err, locations) => {
        if(err){
          return next(err);
        }
        res.render('eventsHome', { events: events, categories: categories, locations: locations });
      })
    })
  });
})

router.get('/latest', (req, res) => {
  Event.find({}).sort({start_date: -1}).exec((err, events) => {
    if(err){
      return next(err);
    }
    Category.find({}, (err, categories) => {
      if(err){
        return next(err);
      }
      Location.find({}, (err, locations) => {
        if(err){
          return next(err);
        }
        res.render('eventsHome', { events: events, categories: categories, locations: locations });
      })
    })
  });
})

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Location.findById(id).populate("eventId").exec((err, locationEvents) => {
    if(err){
      return next(err);
    }
    res.render('locationDetails', {locationEvents: locationEvents});
  })
});

module.exports = router;