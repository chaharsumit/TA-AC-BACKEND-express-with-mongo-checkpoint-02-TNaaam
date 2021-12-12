let express = require('express');
const Remark = require('../models/remark');

let router = express.Router();

router.get('/:id/like', (req, res, next) => {
  let id = req.params.id;
  Remark.findByIdAndUpdate(id, {$inc: {remarkLikes: 1}} ,(err, updatedRemark) => {
    if(err){
      return next(err);
    }
    res.redirect('/events/' + updatedRemark.eventId);
  })
})

router.get('/:id/dislike', (req, res) => {
  let id = req.params.id;
  Remark.findByIdAndUpdate(id, {$inc: {remarkLikes: -1}} ,(err, updatedRemark) => {
    if(err){
      return next(err);
    }
    res.redirect('/events/' + updatedRemark.eventId);
  })
})

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if(err){
      return next(err);
    }
    res.render('editRemark', { remark: remark });
  })
})

router.post('/:id/edit', (req, res) => {
  let id = req.params.id;
  Remark.findByIdAndUpdate(id, req.body, (err, updatedRemark) => {
    if(err){
      return next(err);
    }
    res.redirect('/events/' + updatedRemark.eventId);
  })
})

module.exports = router;