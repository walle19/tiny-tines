'use strict'

const { isEmpty } = require('../node_modules/underscore')
const CONSTANTS = require('../utility/constants')
const logger = require('../utility/logger')
const XMLHttpRequest = require('../node_modules/xmlhttprequest').XMLHttpRequest
const { parseTemplate } = require('../utility/helper')

/*
* Base Class Agent
* @param - (Object) details, (Object) response
*/
class Agent {
    constructor(details, response) {
        if (isEmpty(details)) {
            throw logger.error(CONSTANTS.AGENT.INVALID)
        }

        this.name = isEmpty(details.name) ? '' : details.name
        this.response = isEmpty(response) ? {} : response
    }
}

/*
* Base Class HttpAgent
* Extends Agent
* @param - (Object) details, (Object) response
* @return - Object

Example Input::
    {
        "type": "HTTPRequestAgent",
        "name": "location",
        "options": {
            "url": "http://free.ipwhois.io/json/"
    }
*/
class HttpAgent extends Agent {
    constructor(details, response) {
        super(details, response)
        this.type = CONSTANTS.AGENT_TYPES.HTTP
        this.url = isEmpty(details.options) && isEmpty(details.options.url) ? '' : parseTemplate(details.options.url, response)
    }

    getInfo() {
        let URL = this.url,
              request = new XMLHttpRequest()

        return new Promise(function(resolve, reject) {
            if (URL.length === 0) return reject(CONSTANTS.HTTP_AGENT.URL_INVALID)
            request.responseType = 'json'
            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        const responseJSON = JSON.parse(request.responseText)
                        
                        if (isEmpty(responseJSON)) reject(CONSTANTS.HTTP_AGENT.INVALID_RESPONSE)
                        
                        resolve(responseJSON)
                    }
                    else {
                        reject(request.status+' : '+CONSTANTS.HTTP_AGENT.STATUS)
                    }
                }
            }
            request.open( 'get', URL, true )
            request.send()
        })
    }
}

/*
* Base Class PrintAgent
* Extends Agent
* @param - (Object) details, (Object) response
* @return - Object

Example Input::
    {
        "type": "PrintAgent",
        "name": "print",
        "options": {
            "message": "Sunset in {{ location.city }}"
    }
*/
class PrintAgent extends Agent {
    constructor(details, response) {
        super(details, response)
        this.type = CONSTANTS.AGENT_TYPES.PRINT
        this.message = isEmpty(details.options) && isEmpty(details.options.message) ? '' : parseTemplate(details.options.message, response)
    }

    printMessage() {
        if (isEmpty(this.message)) {
            logger.trace(CONSTANTS.PRINT_AGENT.NO_MESSAGE)
            return ""
        }

        return this.message
    }
}

module.exports = { HttpAgent, PrintAgent }