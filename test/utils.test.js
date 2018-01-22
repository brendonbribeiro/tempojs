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

  it('120543 ms to TempoTime', function() {
    const time = TempoUtils.msToSmartTime(120543);

    expect(time.hours).to.equal(0);
    expect(time.minutes).to.equal(2);
    expect(time.seconds).to.equal(0);
    expect(time.milliseconds).to.equal(543);
  });

  it('354058001 ms to TempoTime', function() {
    const time = TempoUtils.msToSmartTime(35405800);
    
    expect(time.hours).to.equal(9);
    expect(time.minutes).to.equal(50);
    expect(time.seconds).to.equal(5);
    expect(time.milliseconds).to.equal(800);
  });
});
