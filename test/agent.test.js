const { expect } = require('chai')
const { HttpAgent, PrintAgent } = require('../class/agent')
const ipResponse = require('../stubs/ip_response')
const sunsetResponse = require('../stubs/sunset_response')
const nock = require('nock')
const CONSTANTS = require('../utility/constants')
const sinon = require("sinon")

describe('[Test] Agent', () => {

    describe('[Test] HttpAgent', () => {
        let agentInfo = {},
            httpAgent,
            data = {}

        beforeEach(() => {
            agentInfo = {
                "type": "HTTPRequestAgent",
                "name": "location",
                "options": {
                    "url": "http://free.ipwhois.io/json/"
                }
            }

            data = {
                location: ipResponse
            }

            httpAgent = new HttpAgent(agentInfo, data)
        })

        it('should create HttpAgent object extends base Agent class', () => {
            expect(typeof httpAgent).to.equal('object')
            expect(httpAgent.type).to.be.equal(agentInfo.type)
            expect(httpAgent.url).to.be.equal(agentInfo.options.url)

            expect(httpAgent.name).to.be.equal(agentInfo.name)
            expect(httpAgent.response).to.be.eql(data)
        })

        it('should create HttpAgent object having no parsed URL', () => {
            agentInfo = {
                "type": "HTTPRequestAgent",
                "name": "sunset",
                "options": {
                    "url": "https://api.sunrise-sunset.org/json?lat={{ location.latitude }}&lng={{ location.longitude }}"
                }
            }
            data = {}
            httpAgent = new HttpAgent(agentInfo, data)

            expect(httpAgent.url).to.be.equal(agentInfo.options.url)
            expect(httpAgent.response).to.be.eql({})
        })

        it('should create HttpAgent object having parsed URL', () => {
            agentInfo = {
                "type": "HTTPRequestAgent",
                "name": "sunset",
                "options": {
                    "url": "https://api.sunrise-sunset.org/json?lat={{ location.latitude }}&lng={{ location.longitude }}"
                }
            }
            httpAgent = new HttpAgent(agentInfo, data)

            expect(httpAgent.url).to.be.not.equal(agentInfo.options.url)
            expect(httpAgent.url).to.be.equal("https://api.sunrise-sunset.org/json?lat=53.3165322&lng=-6.3425318")
            expect(httpAgent.response).to.be.eql(data)
        })
    })

    describe('[Test] HttpAgent Request', () => {
        let agentInfo = {},
            httpAgent,
            data = {}

        beforeEach(() => {
            agentInfo = {
                "type": "HTTPRequestAgent",
                "name": "location",
                "options": {
                    "url": "http://free.ipwhois.io/json/"
                }
            }

            data = {
                location: ipResponse
            }

            httpAgent = new HttpAgent(agentInfo, data)
        })

        afterEach(() => {
            nock.cleanAll()
        })

        it('should return response for GET', (done) => {
            nock('http://free.ipwhois.io')
                .intercept('/json/', 'GET')
                .reply(200, {
                    status: 200,
                    text: ipResponse})

            httpAgent.getInfo().then(function(res) {
                expect(res.status).to.be.eql(200)
                expect(res.text).to.be.eql(ipResponse)
                done()
            })
        })

        it('should return rejection(204 http error) for GET', (done) => {
            nock('http://free.ipwhois.io')
                .intercept('/json/', 'GET')
                .reply(204, {
                    status: 204
                })

            httpAgent.getInfo().catch(function(rej) {
                expect(rej).to.match(/204/)
                done()
            })
        })

        it('should return invalid URL for GET', (done) => {
            httpAgent.url = ''
            httpAgent.getInfo().catch(function(rej) {
                expect(rej).to.be.equal(CONSTANTS.HTTP_AGENT.URL_INVALID)
                done()
            })
        })

        it('should return invalid response error for GET', (done) => {
            nock('http://free.ipwhois.io')
                .intercept('/json/', 'GET')
                .reply(200, {})

            httpAgent.getInfo().catch(function(rej) {
                console.log("rej")
                expect(rej).to.equal(CONSTANTS.HTTP_AGENT.INVALID_RESPONSE)
                done()
            })
        })
    })

    describe('[Test] PrintAgent', () => {

        let printAgent,
            agentInfo,
            data

        before(() => { sandbox = sinon.createSandbox() })

        beforeEach(() => {
            agentInfo = {
                "type": "PrintAgent",
                "name": "print",
                "options": {
                    "message": "Sunset in {{ location.city }}, {{ location.country }} is at {{ sunset.results.sunset }}."
                }
            }

            data = {
                location: ipResponse,
                sunset: sunsetResponse
            }

            printAgent = new PrintAgent(agentInfo, data)
        })

        it('should create PrintAgent object and extends base Agent class', () => {
            expect(typeof printAgent).to.equal('object')
            expect(printAgent.type).to.be.equal(agentInfo.type)
            expect(agentInfo.options.message).to.be.equal(agentInfo.options.message)

            expect(printAgent.name).to.be.equal(agentInfo.name)
            expect(printAgent.response).to.be.eql(data)
        })

        it('should create PrintAgent object having no parsed Message', () => {
            printAgent = new PrintAgent(agentInfo, {})

            expect(printAgent.message).to.be.equal(agentInfo.options.message)
            expect(printAgent.response).to.be.eql({})
        })

        it('should PrintAgent object and have parsed Message', () => {
            expect(printAgent.message).to.be.not.equal(agentInfo.options.message)
            expect(printAgent.message).to.be.equal("Sunset in Dublin, Ireland is at 7:30:37 PM.")
            expect(printAgent.response).to.be.eql(data)
        })

        it('should PrintAgent display the parsed message', () => {
            const log = sandbox.spy(console, 'log')
            printAgent.printMessage()
            expect(log).to.have.been.calledOnceWith("Sunset in Dublin, Ireland is at 7:30:37 PM.")
        })

        after(() => sandbox.restore())
    })

    describe('[Test] Different JSON file', () => {
        let agentInfo = {},
            httpAgent,
            data = {}

        beforeEach(() => {
            agentInfo = {
                "type": "HTTPRequestAgent",
                "name": "location",
                "options": {
                    "url": "http://free.ipwhois.io/json/"
                }
            }

            data = {
                location: ipResponse
            }

            httpAgent = new HttpAgent(agentInfo, data)
        })

        it('should create HttpAgent object extends base Agent class', () => {
            expect(typeof httpAgent).to.equal('object')
            expect(httpAgent.type).to.be.equal(agentInfo.type)
            expect(httpAgent.url).to.be.equal(agentInfo.options.url)

            expect(httpAgent.name).to.be.equal(agentInfo.name)
            expect(httpAgent.response).to.be.eql(data)
        })

        it('should create HttpAgent object having no parsed URL', () => {
            agentInfo = {
                "type": "HTTPRequestAgent",
                "name": "sunset",
                "options": {
                    "url": "https://api.sunrise-sunset.org/json?lat={{ location.latitude }}&lng={{ location.longitude }}"
                }
            }
            data = {}
            httpAgent = new HttpAgent(agentInfo, data)

            expect(httpAgent.url).to.be.equal(agentInfo.options.url)
            expect(httpAgent.response).to.be.eql({})
        })

        it('should create HttpAgent object having parsed URL', () => {
            agentInfo = {
                "type": "HTTPRequestAgent",
                "name": "sunset",
                "options": {
                    "url": "https://api.sunrise-sunset.org/json?lat={{ location.latitude }}&lng={{ location.longitude }}"
                }
            }
            httpAgent = new HttpAgent(agentInfo, data)

            expect(httpAgent.url).to.be.not.equal(agentInfo.options.url)
            expect(httpAgent.url).to.be.equal("https://api.sunrise-sunset.org/json?lat=53.3165322&lng=-6.3425318")
            expect(httpAgent.response).to.be.eql(data)
        })
    })
})

