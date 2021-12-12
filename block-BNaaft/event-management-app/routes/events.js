let express = require('express');
let Category = require('../models/category');
let Event = require('../models/event');
let Remark = require('../models/remark');

let router = express.Router();

router.get('/', (req, res) => {
  Event.find({}, (err, events) => {
    if(err){
      return next(err);
    }
    Category.find({}, (err, categories) => {
      res.render('eventsHome', { events: events, categories: categories });
    })
  });
})

router.get('/new', (req, res) => {
  res.render('createEvent');
})

router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id).populate('event_categories remarks').exec((err, event) => {
    if(err){
      return next(err);
    }
    res.render('eventDetails', { event: event });
  });
})

router.post('/', (req, res, next) => {
  Event.create(req.body, (err, event) => {
    if(err){
      return next(err);
    }
    req.body.categories = req.body.categories.trim().split(' ');
    for(let i = 0; i < req.body.categories.length; i++){
      Category.findOneAndUpdate({categoryName: req.body.categories[i]}, {$push: {eventId: event.id}}, (err, updatedCategory) => {
        if(err){
          return next(err);
        }
        Event.findByIdAndUpdate(event.id, {$push: {event_categories: updatedCategory.id}}, (err, event) => {
          if(err){
            return next(err);
          }
        })
      })
    }
    res.redirect('/events');
  })
});

router.post('/:id/remarks', (req, res, next) => {
  let id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body, (err, remark) => {
    if(err){
      return next(err);
    }
    Event.findByIdAndUpdate(id, {$push: { remarks: remark.id }}, (err, updatedEvent) =>{
      if(err){
        return next(err);
      }
      res.redirect('/events/' + id);
    })
  });
});

//Get requests on likes dislikes for event

router.get('/:id/like', (req, res) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, {$inc: { likes: 1 }} ,(err, updatedEvent) => {
    if(err){
      return next(err);
    }
    res.redirect('/events/' + id);
  });
});

router.get('/:id/dislike', (req, res) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, {$inc: { likes: -1 }} ,(err, updatedEvent) => {
    if(err){
      return next(err);
    }
    res.redirect('/events/' + id);
  });
});

module.exports = router;