let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let locationSchema = new Schema({
  locationName: String,
  eventId: [{type: Schema.Types.ObjectId, ref: "Event"}],
}, {timestamps: true});

let Location = mongoose.model("Location", locationSchema);

module.exports = Location;