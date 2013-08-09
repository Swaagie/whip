'use strict';

function Schedule(whip) {
  if (!(this instanceof Schedule)) return new Schedule(whip);
  if (!whip) throw new Error('Missing whip instance');
}

//
// Make the plugin extendible so every thing inherits from this `class`.
//
Schedule.extend = require('extendable');

//
// Expose the module.
//
module.exports = Schedule;
