'use strict'

const CONSTANTS = require('../utility/constants')
const logger = require('../utility/logger')

const { readFile } = require('../utility/helper')
const { isEmpty } = require('../node_modules/underscore')

const { HttpAgent, PrintAgent } = require('../class/agent')

console.clear() // Just to clear logs

logger.print("##### Welcome to Tiny Tines #####")

const main  = function() {
    /*
    To remove the unnecessary argument
    that is the script's interpreter and file path which are still considered arguments to the shell you're using

    Path to node: '../.nvm/versions/node/v10.5.0/bin/node',
    Path to index.js file: '../tiny_Tines/bin/index.js',
    */
    let argv = process.argv.slice(2)
    logger.trace(argv)

    if (argv.length === 0 || argv.length > 1) {
        logger.error(CONSTANTS.ARGUMENTS.INVALID)
        return
    }

    // Get JSON file
    readFile(argv[0], function(err, content) {

        if (err) {
            logger.error(CONSTANTS.ARGUMENTS.INVALID)
            return
        }

        if (isEmpty(content[CONSTANTS.kAGENTS])) {
            logger.error(CONSTANTS.AGENT.NOT_AVAILABLE)
            return
        }

        const agents = content[CONSTANTS.kAGENTS]
        const fetchedData = {}

        createAndRunAgentsFrom(agents, fetchedData)
    })
}

/*
* Create and execute agents from provided JSON
* @param - (Object) file
* @return - None
*/
const createAndRunAgentsFrom = async function(agents, fetchedData) {
    for (const info of agents) {
        let agent

        switch (info.type) {
            case CONSTANTS.AGENT_TYPES.HTTP:
                agent = new HttpAgent(info, fetchedData)

                let response
                try {
                    response = await agent.getInfo()
                    logger.trace(response)
                } catch (err) {
                    logger.error(err)
                    return                          // stop the execution
                }

                fetchedData[agent.name] = response
                break
            case CONSTANTS.AGENT_TYPES.PRINT:
                agent = new PrintAgent(info, fetchedData)
                agent.printMessage(fetchedData)
                break
            default:
                throw CONSTANTS.AGENT.INVALID
        }
    }
}

main()