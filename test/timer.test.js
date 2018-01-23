const sinon = require('sinon');
const expect = require('chai').expect;

// const TempoTime = require("../lib/time.js");
const Tempo = require("../lib/timer.js");
const TempoState = require("../lib/state.js");

const onIntervalSpy = sinon.spy();
const onStartSpy = sinon.spy();

describe('timer tests', function() {

  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

  it('Tempo should be defined', function() {
    expect(Tempo).to.not.be.undefined;
  });

  it('timer should be defined', function() {
    var timer = new Tempo({});
    expect(timer).to.not.be.undefined;
  });

  it('settings should be defined', function() {
    var timer = new Tempo({
      interval: {
        seconds: 1
      }
    });

    expect(timer.settings).to.not.be.undefined;
  });

  it('settings.startTime should be defined', function() {
    var timer = new Tempo({
      startTime: {
        seconds: 1
      }
    });

    expect(timer.settings.startTime).to.not.be.undefined;
  });

  it('settings.startTime should be equal to _currentSmartTime', function() {
    var timer = new Tempo({
      startTime: {
        seconds: 1
      }
    });

    expect(timer._currentSmartTime).to.equal(timer.settings.startTime);
  });

  it('_currentTime should be equal to 1000', function() {
    var timer = new Tempo({
      startTime: {
        seconds: 1
      }
    });

    expect(timer._currentTime).to.equal(1000);
  });

  it('settings.endTime should be defined', function() {
    var timer = new Tempo({
      endTime: {
        seconds: 1
      }
    });

    expect(timer.settings.endTime).to.not.be.undefined;
  });

  it('_endTimeMs should be equal to 1000', function() {
    var timer = new Tempo({
      endTime: {
        seconds: 1
      }
    });

    expect(timer._endTimeMs).to.equal(1000);
  });

  it('settings.onSpecificTimes should be defined', function() {
    var timer = new Tempo({
      onSpecificTimes: [
				{
					when: {
						seconds: 6
					}
				}]
    });

    expect(timer.settings.onSpecificTimes).to.not.be.undefined;
    expect(timer.settings.onSpecificTimes).to.be.an('array');
  });

  it('settings.onIntervals should be defined', function() {
    var timer = new Tempo({
      onIntervals: [
				{
					interval: {
						seconds: 6
					}
				}]
    });

    expect(timer.settings.onIntervals).to.not.be.undefined;
    expect(timer.settings.onIntervals).to.be.an('array');
  });

  it('_getStartMs should be 1200', function() {
    var timer = new Tempo({
      startTime: {
        seconds: 1,
        milliseconds: 200
			}
    });

    expect(timer._getStartMs()).to.equal(1200);
  });

  it('start() should change state to STARTED', function() {
    var timer = new Tempo({
      startTime: {
        seconds: 1,
        milliseconds: 200
			}
    });

    timer.start();
    expect(timer.state).to.equal(TempoState.STARTED);
  });

  it('a timer test', function() {
    var stopTime = 0;
    var timer = new Tempo({
      interval: {
        seconds: 1
      },
      onInterval: onIntervalSpy,
      onStart: onStartSpy,
      onStop: function(time) {
        stopTime = time.seconds;
      }
    });

    timer.start();
    expect(onStartSpy.called).to.be.true;
    expect(onIntervalSpy.called).to.be.false;

    this.clock.tick(500);
    expect(onIntervalSpy.called).to.be.false;

    this.clock.tick(500);
    expect(onIntervalSpy.called).to.be.true;
    onIntervalSpy.called = false;

    this.clock.tick(1000);
    expect(onIntervalSpy.called).to.be.true;

    timer.stop();
    expect(onIntervalSpy.called).to.be.true;
    expect(stopTime).to.equal(2);

  });
});
