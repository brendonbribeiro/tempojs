var expect = require('chai').expect;
const TempoTime = require("../lib/time.js");

describe('tempo time tests', function() {

  it('should be defined', function() {
    const time = new TempoTime({});
    expect(time).to.not.be.undefined;
  });

  it('should have 0 values', function() {
    const time = new TempoTime({});
    expect(time.hours).to.equal(0);
    expect(time.minutes).to.equal(0);
    expect(time.seconds).to.equal(0);
    expect(time.milliseconds).to.equal(0);
  });

  it('1 second should be 00:00:01:000', function() {
    const time = new TempoTime({
      seconds: 1
    });
    expect(time.toString()).to.equal("00:00:01:000");
  });

  it('1 hour and 100 ms should be 01:00:00:100', function() {
    const time = new TempoTime({
      hours: 1,
      milliseconds: 100
    });
    expect(time.toString()).to.equal("01:00:00:100");
  });
});
