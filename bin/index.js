#!/usr/bin/env node
process.env.TZ = 'america/mexico_city';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { newProject } = require('./commands');

yargs(hideBin(process.argv))
.command('new [app_name]', 'create a new snow app', (yargs) => {
  return yargs.positional('app_name', {
    describe: 'name for new snowy app',
  });
}, (argv) => {
  console.log(argv);
  if (!argv.app_name) {
    console.error('Error > app_name is required');
    return;
  }

  newProject(argv);
  return;
})
.option('install', {
  alias: 'i',
  describe: 'Install dependencies',
  type: 'boolean',
})
.option('database', {
  alias: 'd',
  describe: 'Enable database',
  type: 'boolean',
})
.demandCommand()
.help()
.argv;

// yargs(hideBin(process.argv))
// .command('test [some_arg]', 'description', (yargs) => {
//   return yargs.positional('some_arg', {
//     describe: 'name for new snowy app',
//   });
// })


// yargs(hideBin(process.argv))
//   .command('serve [port]', 'start the server', (yargs) => {
//     return yargs
//       .positional('port', {
//         describe: 'port to bind on',
//         default: 5000
//       })
//   }, (argv) => {
//     if (argv.verbose) console.info(`start server on :${argv.port}`)
//     serve(argv.port)
//   })
//   .option('verbose', {
//     alias: 'v',
//     type: 'boolean',
//     description: 'Run with verbose logging'
//   })
//   .parse()

// const yargs = require('yargs');
// // const { validators } = require('./utils');
// // const { create } = require('./commands');

// const options = yargs
// .usage('Snowy CLI')
// .option('new', {
//   describe: 'Create new snowy project',
//   type: 'boolean',
//   demandOption: false
// })
// .option('alter', {
//   alias:'a',
//   describe: 'Create migration to alter existent table',
//   type: 'boolean',
//   demandOption: false
// })
// .help(true)
// .argv;

// console.log('>>', options);
// const validOptions = validators.validateOptions(options);
// console.log('>>', validOptions);

// if (validOptions) {
//   if (options.c) {
//     create(options.tableName);
//   }
// }

// const options = yargs
// .usage('Snowy CLI')
// .option('create', {
//   alias:'c',
//   describe: 'Create migration for new table',
//   type: 'boolean',
//   demandOption: false
// })
// .option('alter', {
//   alias:'a',
//   describe: 'Create migration to alter existent table',
//   type: 'boolean',
//   demandOption: false
// })
// .help(true)
// .argv;

// console.log('>>', options);
// const validOptions = validators.validateOptions(options);
// console.log('>>', validOptions);

// if (validOptions) {
//   if (options.c) {
//     create(options.tableName);
//   }
// }
