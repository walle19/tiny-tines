module.exports = {
    /*
    To be set to FALSE in production
    For purpose of development only
    To view trace logs of request call(s) and output(s) passed between agent(s)
     */
    IS_DEBUG: false,

    kAGENTS: "agents",

    ARGUMENTS: {
        INVALID: "Please provide a valid path to JSON file",
        UNNECESSARY: "Please provide only JSON file path as an argument"
    },

    AGENT_TYPES: {
        "HTTP": "HTTPRequestAgent",
        "PRINT": "PrintAgent"
    },

    AGENT: {
        INVALID: "Found an invalid agent",
        NOT_AVAILABLE: "No agent(s) found"
    },

    HTTP_AGENT: {
        URL_INVALID: "Invalid URL encountered",
        STATUS: "Request failed",
        INVALID_RESPONSE: "Invalid response received"
    },

    PRINT_AGENT: {
        NO_MESSAGE: "No message to print"
    },

    HELPER: {
        NOT_STRING: "Template is not a string"
    }

}


