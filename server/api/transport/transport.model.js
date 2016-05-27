'use strict';

var Location = require('../location/location.model');
var geo = require('node-geo-distance');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransportSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'TransportType'
  },
  distance: {type: Number},
  departure: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  arrival: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  class: String,
  cost: Number,
  date_departure: {type: Date, required: true}
});

TransportSchema.pre('save', function(next){
  var self = this;
  Location.find({_id: {$in: [self.departure, self.arrival]}}, function(err, locations){
    if(!locations[1])locations[1] = locations[0];
    geo.vincenty({latitude: locations[0].loc[0], longitude: locations[0].loc[1]},
      {latitude: locations[1].loc[0], longitude: locations[1].loc[1]}, function(dist) {
        self.distance = dist / 1000;
        next();
    });
  })
});

module.exports = mongoose.model('Transport', TransportSchema);
