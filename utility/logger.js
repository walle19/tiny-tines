const CONSTANTS = require('../utility/constants')

module.exports = {
    print: function(msg) {
        console.log(msg)
    },

    error: function(msg) {
        console.log("[ERROR] " + msg)
    },

    trace: function(msg) {
        if (!CONSTANTS.IS_DEBUG) { return }
        console.log("[TRACE]")
        console.log(msg)
        console.log("[END]")
    }
    
}