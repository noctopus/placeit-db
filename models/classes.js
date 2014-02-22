'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema

/**
 * User Schema
 */
var ClassSchema = new Schema({
    name : String,
    max_enrollment : Number,
    instructor : String,
    group : String,
    id : Number ,
    enrollment : [{pid : String, major : String, year : String}]
}, { collection : 'Classes' });

mongoose.model('Class', ClassSchema);