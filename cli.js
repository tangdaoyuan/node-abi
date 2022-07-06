const yargs = require('yargs');
const { getAbi, getTarget } = require('./index')
const { cyan, bold, red } = require('picocolors')

function log(content) {
  console.log(cyan(content));
}

function error(content) {
  console.log(red(bold(content)));
}


yargs
  .scriptName('node-abi')
  .usage('$0 <mode> [options]')
  .command(
    '$0 <mode>',
    'Show Node ABI',
    yargs => {
      return yargs
        .positional('mode', {
          describe: 'Mode to search',
          choices: ['abi', 'target'],
          default: 'abi',
          demandOption: true,
        })
        .option('semver', {
          alias: 's',
          describe: 'Version to search',
          type: 'string',
        })
        .option('runtime', {
          alias: 'r',
          describe: 'Target runtime',
          choices: ['node', 'electron'],
          default: 'node',
        })
    },
    (args) => {
      const { mode, semver, runtime } = args;
      try {
        if (mode === 'abi') {
          log(getAbi(semver, runtime));
        } else if (mode === 'target') {
          log(getTarget(semver, runtime));
        }
      } catch (err) {
        error(err.stack);
      }

    })
  .example('$0 abi -', 'Show Node ABI')
  .showHelpOnFail(true)
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv
