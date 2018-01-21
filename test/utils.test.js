var expect = require('chai').expect;
const TempoUtils = require("../lib/utils.js");
const TempoTime = require("../lib/time.js");

describe('tempo utils tests', function() {

  it('should be defined', function() {
    expect(TempoUtils).to.not.be.undefined;
  });

  it('1 second should be 1000 ms', function() {
    expect(TempoUtils.secondsToMilliseconds(1)).to.equal(1000);
  });

  it('1 minute should be 60000 ms', function() {
    expect(TempoUtils.minutesToMilliseconds(1)).to.equal(60000);
  });

  it('1 hour should be 3600000 ms', function() {
    expect(TempoUtils.hoursToMilliseconds(1)).to.equal(3600000);
  });

  // it('tempo time to ms 1', function() {
  //   expect(TempoUtils.hoursToMilliseconds(1)).to.equal(3600000);
  // });
});
