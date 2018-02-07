const chalk = require('chalk');

module.exports = {
    info (...args) {
        args.forEach(arg => {
            console.log(`${chalk.green('[flyswatter]')} ${arg}`);
        });
    },

    warn (...args) {
        args.forEach(arg => {
            console.log(`${chalk.yellow('[flyswatter]')} ${arg}`);
        });
    },

    error (...args) {
        args.forEach(arg => {
            console.log(`${chalk.red('[flyswatter]')} ${arg}`);
        });
    }
};
