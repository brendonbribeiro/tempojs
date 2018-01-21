'use strict'
const TempoState = require("./state.js");
const TempoUtils = require("./utils.js");
const TempoTime = require("./time.js");

class Tempo {
  constructor(settings) {
    settings.interval = settings.interval
      ? new TempoTime(settings.interval)
      : new TempoTime({ seconds: 1 });

    settings.startTime = settings.startTime
      ? new TempoTime(settings.startTime)
      : new TempoTime({});

    this._currentSmartTime = settings.startTime;

    settings.endTime = settings.endTime
      ? new TempoTime(settings.endTime)
      : null;
    this._endTimeMs = settings.endTime ? TempoUtils.toMilliseconds(settings.endTime) : 0;

    if(settings.onSpecificTimes && settings.onSpecificTimes){
      settings.onSpecificTimes.forEach(st => st.when = new TempoTime(st.when));
    }

    if(settings.onIntervals && settings.onIntervals){
      settings.onIntervals.forEach(st => st.interval = new TempoTime(st.interval));
    }

    this.settings = settings;
    this._currentTime = this._getStartMs();
  }

  _getStartMs() {
    return this.settings.startTime ? TempoUtils.toMilliseconds(this.settings.startTime) : 0;
  }

  _runSpecificTimes() {
    var $this = this;
    var specificTimes = this.settings.onSpecificTimes;
    if (specificTimes && specificTimes.length) {
      specificTimes.forEach((st) => {
        var ms = TempoUtils.toMilliseconds(st.when);
        if (ms == $this._currentTime) {
          st.event($this._currentSmartTime);
        }
      });
    }
  }

  _runIntervals() {
    var $this = this;
    var intervals = this.settings.onIntervals;
    if (intervals && intervals.length) {
      var startTime = $this._getStartMs();
      intervals.forEach((interval) => {
        var ms = TempoUtils.toMilliseconds(interval.interval);
        if (($this._currentTime - startTime) % ms == 0) {
          interval.event($this._currentSmartTime);
        }
      });
    }
  }

  start() {
    var $this = this;
    if (this.state != TempoState.STARTED) {
      this.state = TempoState.STARTED;
      $this.settings.onStart && $this.settings.onStart(this._currentSmartTime);

      var ms = TempoUtils.toMilliseconds(this.settings.interval);
      this._intervalInstance = setInterval(function() {
        $this._currentTime = $this.settings.decreasing ? ($this._currentTime - ms) : ($this._currentTime + ms);
        $this._currentSmartTime = TempoUtils.msToSmartTime($this._currentTime);
        $this._runSpecificTimes();
        $this._runIntervals();


        if (($this.settings.endTime && $this._currentTime == $this._endTimeMs) || ($this.settings.decreasing && $this._currentTime == 0)) {
          $this.end();
        } else {
          $this.settings.onInterval && $this.settings.onInterval($this._currentSmartTime);
        }


      }, ms);
    }
  }

  end() {
    if (this.state != TempoState.ENDED) {
      this.state = TempoState.ENDED;
      this.settings.onEnd && this.settings.onEnd(this._currentSmartTime);

      this._currentTime = this._getStartMs();
      this._currentSmartTime = TempoUtils.msToSmartTime(this._currentTime);
      clearInterval(this._intervalInstance);
    }
  }

  pause() {
    if (this.state != TempoState.PAUSED) {
      this.state = TempoState.PAUSED;
      this.settings.onPause && this.settings.onPause(this._currentSmartTime);
      clearInterval(this._intervalInstance);
    }

  }

  stop() {
    if (this.state != TempoState.STOPED) {
      this.state = TempoState.STOPED;
      this.settings.onStop && this.settings.onStop(this._currentSmartTime);

      this._currentTime = this._getStartMs();
      this._currentSmartTime = TempoUtils.msToSmartTime(this._currentTime);
      clearInterval(this._intervalInstance);
    }
  }
}

module.exports = Tempo;
