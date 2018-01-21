var expect = require('chai').expect;
const TempoState = require("../lib/state.js");

describe('tempo state tests', function() {

  it('should be defined', function() {
    expect(TempoState).to.not.be.undefined;
  });

  it('should contains STARTED', function() {
    expect(TempoState.STARTED).to.not.be.undefined;
    expect(TempoState.STARTED).to.be.equal("STARTED");
  });

  it('should contains PAUSED', function() {
    expect(TempoState.PAUSED).to.not.be.undefined;
    expect(TempoState.PAUSED).to.be.equal("PAUSED");
  });

  it('should contains STOPED', function() {
    expect(TempoState.STOPED).to.not.be.undefined;
    expect(TempoState.STOPED).to.be.equal("STOPED");
  });

  it('should contains ENDED', function() {
    expect(TempoState.ENDED).to.not.be.undefined;
    expect(TempoState.ENDED).to.be.equal("ENDED");
  });
});
