let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categorySchema = new Schema({
  categoryName: String,
  eventId: [{ type: Schema.Types.ObjectId, ref: "Event" }],
}, { timestamps: true });

let Category = mongoose.model('Category', categorySchema);

Category.countDocuments({ bookId: {$exists: true}}, (err, count) => {
  if(count === 0){
    Category.create({categoryName: "programming"}, {categoryName: "sports"}, {categoryName: "trekking"});
  }
})

module.exports = Category;