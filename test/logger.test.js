const logger = require('../utility/logger')
const sinon = require("sinon")
const chai = require('chai')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('[Test] Logger', () => {

    before(() => { sandbox = sinon.createSandbox() })

    beforeEach(() => { sandbox.restore() })

    it('should call print once', () => {
        const log = sandbox.spy(console, 'log')
        logger.print('test')
        expect(log).to.have.been.calledOnceWith('test')
    })

    it('should call error once', () => {
        const log = sandbox.spy(console, 'log')
        logger.error('test')
        expect(log).to.have.been.calledOnceWith('[ERROR] test')
    })

    it('should call trace once', () => {    // As in production, flag is false
        const log = sandbox.spy(console, 'log')
        logger.trace('test')
        expect(log).to.not.have.been.called
    })

})

