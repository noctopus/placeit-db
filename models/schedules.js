	'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * User Schema
 */
var ScheduleSchema = new Schema({
    lecture_time : [{day : String, time : String}],
    discussion_time : [{day : String, time : String}],
    prereqs : [String],
    cape_review : String
},{ collection : 'Schedules' });

mongoose.model('Schedule', ScheduleSchema);