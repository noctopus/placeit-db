'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

/**
 * Place-It Schema
 */
var PlaceItSchema = new Schema({
    title : String,
    description : String,
    latitude : Number,
    longitude : Number,
    active_date : Number,
    start_week : Number,
    day : Number,
    week : Number,
    category : String,
    user_id : String,
});

module.exports = 
mongoose.model('Place-It', PlaceItSchema);