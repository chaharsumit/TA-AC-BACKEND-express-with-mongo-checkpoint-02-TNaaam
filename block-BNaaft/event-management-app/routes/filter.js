let express = require('express');
let Event = require('../models/event');
let Category = require('../models/category');
let Remark = require('../models/remark');
let router = express.Router();

router.get('/oldest', (req, res) => {
  Event.find({}).sort({start_date: 1}).exec((err, events) => {
    if(err){
      return next(err);
    }
    Category.find({}, (err, categories) => {
      res.render('eventsHome', { events: events, categories: categories });
    })
  });
})

router.get('/latest', (req, res) => {
  Event.find({}).sort({start_date: -1}).exec((err, events) => {
    if(err){
      return next(err);
    }
    Category.find({}, (err, categories) => {
      res.render('eventsHome', { events: events, categories: categories });
    })
  });
})

module.exports = router;