const path = require('path');
const fs = require("fs");

var logger = {};

logger.log = function (message) {
    let prefix = "[" + (new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')) + "] ";
    try {
        console.log(prefix + message);
        fs.appendFile(path.dirname(process.mainModule.filename) + "/bot.log", prefix + message + "\n", function (error) {if (error) throw error;});
    } catch (e) {
        console.log(prefix + "Error on logging (yes, seriously - logging logger error): " + e);
    }
}
module.exports = logger;