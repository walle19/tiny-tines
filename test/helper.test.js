const { expect } = require('chai')
const { readFile, parseTemplate } = require('../utility/helper')
const path = require('path')
const tinyTinesJSON = require('../stubs/tiny-tines-sunset')
const ipResponse = require('../stubs/ip_response')
const sunsetResponse = require('../stubs/sunset_response')
const worldtimeResponse = require('../stubs/worldtime_response')

describe('[Test] Helper', () => {

    describe('[Test] readFile', () => {
        it('should readFile with correct path', () => {
            const validPath = '../stubs/tiny-tines-sunset.json'
            readFile(path.resolve(__dirname, validPath), function(err, content) {
                expect(typeof content ).to.equal('object')
                expect(content).to.eql(tinyTinesJSON)
            })
        })

        it('should return err for incorrect file path', () => {
            readFile('../stubs', function(err, content) {
                expect(err).to.be.not.null
                expect(content).to.be.null
            })
        })

        it('should return error for non JSON file', () => {
            const validPath = '../tiny_tines.iml'
            readFile(path.resolve(__dirname, validPath), function(err, content) {
                expect(err).to.be.not.null
                expect(content).to.be.null
            })
        })
    })

    describe('[Test] parseTemplate', () => {
        it('should return correct parsed URL with valid URL param', () => {
            const urlTemplate = "https://api.sunrise-sunset.org/json?lat={{ location.latitude }}&lng={{ location.longitude }}"
            const expectedURL = "https://api.sunrise-sunset.org/json?lat=53.3165322&lng=-6.3425318"
            const data = { location: ipResponse }

            const parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)
        })

        it('should return correct parsed message with valid message param', () => {
            const urlTemplate = "Sunset in {{ location.city }}, {{ location.country }} is at {{ sunset.results.sunset }}."
            const expectedURL = "Sunset in Dublin, Ireland is at 7:30:37 PM."
            const data = {
                location: ipResponse,
                sunset: sunsetResponse
            }

            const parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)
        })

        it('should return empty string with template being not string type', () => {
            const urlTemplate = {}
            const expectedURL = ""
            const data = { location: ipResponse }

            const parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)
        })

        it('should return unmodified template with empty data', () => {
            const urlTemplate = "Sunset in {{ location.city }}, {{ location.country }} is at {{ sunset.results.sunset }}."
            const expectedURL = "Sunset in {{ location.city }}, {{ location.country }} is at {{ sunset.results.sunset }}."
            const data = {}

            const parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)
        })

        it('should return template with empty space replacing not matching k/v in data', () => {
            const urlTemplate = "Sunset in {{ location.city }}, {{ location.country }} is at {{ sunset.results.sunset }}."
            const expectedURL = "Sunset in ,  is at ."
            const data = { datetime: worldtimeResponse }

            const parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)
        })

        it('should return template with extra closing curly brace(s)', () => {
            const urlTemplate = "Sunset in {{ location.city }}}}, {{ location.country }} }} is at {{ sunset.results.sunset }}}."
            const expectedURL = "Sunset in Dublin}}, Ireland }} is at 7:30:37 PM}."
            const data = {
                location: ipResponse,
                sunset: sunsetResponse
            }

            const parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)
        })

        it('should return unmodified template with invalid closing curly brace', () => {
            const urlTemplate = "Sunset in {{ location.city }"
            const expectedURL = "Sunset in {{ location.city }"
            const data = {
                location: ipResponse,
                sunset: sunsetResponse
            }

            let parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)

            const urlTemplate1 = "Sunset in {{ location.city }}}"
            const expectedURL1 = "Sunset in Dublin}"

            parsedURL = parseTemplate(urlTemplate1, data)
            expect(parsedURL).to.equal(expectedURL1)

            const urlTemplate2 = "Sunset in {{ location.city }} }}"
            const expectedURL2 = "Sunset in Dublin }}"

            parsedURL = parseTemplate(urlTemplate2, data)
            expect(parsedURL).to.equal(expectedURL2)
        })

        it('should return unmodified template with invalid opening curly brace', () => {
            const urlTemplate = "Sunset in { {{ location.city }}"
            const expectedURL = "Sunset in { Dublin"
            const data = {
                location: ipResponse,
                sunset: sunsetResponse
            }

            let parsedURL = parseTemplate(urlTemplate, data)
            expect(parsedURL).to.equal(expectedURL)

            const urlTemplate1 = "Sunset in {{ {{ location.city }}"
            const expectedURL1 = "Sunset in {{ Dublin"

            parsedURL = parseTemplate(urlTemplate1, data)
            expect(parsedURL).to.equal(expectedURL1)

            const urlTemplate2 = "Sunset in {{{ location.city }}"
            const expectedURL2 = "Sunset in {Dublin"

            parsedURL = parseTemplate(urlTemplate2, data)
            expect(parsedURL).to.equal(expectedURL2)
        })
    })

})

