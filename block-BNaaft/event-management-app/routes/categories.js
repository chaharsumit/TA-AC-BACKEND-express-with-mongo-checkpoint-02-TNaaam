let express = require('express');
let Category = require('../models/category');

let router = express.Router();

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Category.findById(id).populate('eventId').exec((err, category) => {
    if(err){
      return next(err);
    }
    res.render('categoryDetails', { category: category });
  });
})

module.exports = router;