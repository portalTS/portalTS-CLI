
var colors = require('colors/safe');

function printHeader() {

    console.log(colors.yellow("          ____            _        _ _____ ____  "));
    console.log(colors.yellow("         |  _ \\ ___  _ __| |_ __ _| |_   _/ ___| "));
    console.log(colors.yellow("         | |_) / _ \\| '__| __/ _` | | | | \\___ \\ "));
    console.log(colors.yellow("         |  __/ (_) | |  | || (_| | | | |  ___) | "));
    console.log(colors.yellow("         |_|   \\___/|_|   \\__\\__,_|_| |_| |____/ "));
    console.log("");

}

module.exports = printHeader;
