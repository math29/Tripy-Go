'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PromoSchema = new Schema({
  type: {type: String, required: true},
  url: {type: String, required: true},
  vendor: {type: String, required: true},
  discount: {type: Number, required: true},
  initial_price: {type: Number, required: true},
  end_date: {type: Date},
  img: {type: String, required: true},
  active: {type: Boolean, required: true},
  archived: {type: Boolean, required: true},
  clicks:{
    anonymous: {type: Number, required: true},
    connected : [
      {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
  }
});

module.exports = mongoose.model('Promo', PromoSchema);
