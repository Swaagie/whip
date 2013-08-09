'use strict';

//
// Required third party modules.
//
var cli = require('commander')
  , colors = require('colors')
  , path = require('path')
  , fs = require('fs');

//
// Setup options for the client.
//
cli
   .version(require('./package.json').version)
   .option('-d, --debug', 'enable debugging and verbose logging');

//
// Register command to start the specified schedule.
//
cli
  .command('schedule [name]')
  .description('start specified schedule, should be available in ' + 'schedules'.grey + ' directory')
  .action(runSchedule);

cli
  .command('list')
  .description('list all available schedules')
  .action(list);

cli
  .on('--help', help);

//
// Let commander parse the arguments.
//
cli.parse(process.argv);

/**
 * Load schedule from available schedules and start it.
 *
 * @param {String} name
 * @api private
 */
function runSchedule(name) {
  console.log(name);
}

/**
 * List all available schedules.
 *
 * @api private
 */
function list() {
  var lines = [
      ''
    , '  List of available schedules:'.green
    , ''
  ];

  //
  // Read .js schedules and filter other files.
  //
  lines.concat(fs.readdirSync('./schedules').map(function removeDirs(schedule) {
    if (path.extname(schedule) === '.js') return '   - ' + path.basename(schedule, '.js');
  }).filter(Boolean)).forEach(output);
}

/*
 * Display custom help information.
 *
 * @api private
 */
function help() {
  [
      ''
    , '  Example:'
    , ''
    , '  # Start intermittent 30 minutes work/play schedule, named thirty-thirty'.grey
    , '    whip schedule thirty-thirty'.white
    , ''
  ].forEach(output);
}

/**
 * Simple helper function for displaying lines.
 *
 * @param {String} line
 * @api private
 */
function output(line) {
  console.log(line);
}
