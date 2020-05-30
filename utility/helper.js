'use strict'

const fs = require('fs')
const logger = require('../utility/logger')
const { isEmpty } = require('../node_modules/underscore')
const CONSTANTS = require('../utility/constants')

module.exports = {

    /*
    * Read file from provided path
    * @param - (String) file
    * @return - Object or Null
    */
    readFile: function(filePath, cb) {
        fs.readFile(filePath, function(err, data) {
           if (err) return cb(err, null)

           try { return cb(null, JSON.parse(data)) }
           catch (e) { return cb(e, null) }
        })
    },

    /*
    * Parse the template with values from Object/Map/Dictionary
    * @param - (String) template, (Object) data
    * @return - String
    */
    parseTemplate: function(template, data) {
        if (typeof template !== 'string') {
            logger.trace(CONSTANTS.HELPER.NOT_STRING)
            return ''
        }

        if (isEmpty(data)) return template

        const regexExp = /{{([^{}]+)}}/g

        template = template.replace(regexExp, function(match) {

            match = match.slice(2,-2)

            const keys = match.trim().split('.')

            if (isEmpty(keys)) {
                if (!data[match]) return "{{" + match + "}}"
                return data[match]
            }

            let value = data

            for (const key of keys) { 
                if (!value[key]) return ""
                value = value[key] 
            }

            return value
        })

        return template
    }

}