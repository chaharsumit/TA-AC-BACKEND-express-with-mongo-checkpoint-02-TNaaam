let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventSchema = new Schema({
  title: String,
  summary: String,
  start_date: Date,
  end_date: Date,
  host: String,
  event_categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  location: String,
  likes: { type: Number, default: 0 },
  remarks: [{ type: Schema.Types.ObjectId, ref: "Remark" }],
  locationId: [{ type: Schema.Types.ObjectId, ref: "Location" }]
}, { timestamps: true });

let Event = mongoose.model('Event', eventSchema);

module.exports = Event;