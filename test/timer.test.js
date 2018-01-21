const sinon = require('sinon');
const expect = require('chai').expect;

const TempoTime = require("../lib/time.js");
const Tempo = require("../lib/timer.js");

const onIntervalSpy = sinon.spy();
const onStartSpy = sinon.spy();

describe('timer tests', function() {

  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

  it('a timer test', function() {
    var stopTime = 0;
    var timer = new Tempo({
      interval: new TempoTime({
        seconds: 1
      }),
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

    // Advance clock again (1s since start)
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
