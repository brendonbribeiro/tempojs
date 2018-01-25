/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const TempoUtils = module.exports = class TempoUtils {
  static secondsToMilliseconds(s) {
    return s * 1000;
  }

  static minutesToMilliseconds(m) {
    return m * 60000;
  }

  static hoursToMilliseconds(h) {
    return h * (3.6 * Math.pow(10, 6));
  }

  static toMilliseconds(t) {
    return t.milliseconds +
      TempoUtils.secondsToMilliseconds(t.seconds) +
      TempoUtils.minutesToMilliseconds(t.minutes) +
      TempoUtils.hoursToMilliseconds(t.hours);
  }

  static msToSmartTime(ms) {
    var milliseconds = parseInt(ms % 1000);
    var seconds = parseInt((ms / 1000) % 60);
    var minutes = parseInt(((ms / (1000 * 60)) % 60));
    var hours = Math.floor(ms / (1000 * 60 * 60));

    return new TempoTime({
      milliseconds: milliseconds,
      seconds: seconds,
      minutes: minutes,
      hours: hours
    });
  }

  static padLeft(num, padSize = 2) {
    const str = num.toString();
    const pad = "0".repeat(padSize);
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  }
}

const TempoTime = __webpack_require__(1)


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TempoTime = class TempoTime {
	constructor(time) {
		this.milliseconds = time.milliseconds || 0;
		this.seconds = time.seconds || 0;
		this.minutes = time.minutes || 0;
		this.hours = time.hours || 0;
	}

	toString() {
		return TempoUtils.padLeft(this.hours) + ":" + TempoUtils.padLeft(this.minutes)
			+ ":" + TempoUtils.padLeft(this.seconds) + ":" + TempoUtils.padLeft(this.milliseconds, 3);
	}
};

module.exports = TempoTime;

const TempoUtils = __webpack_require__(0);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Tempo = __webpack_require__(3);
window.Tempo = Tempo;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const TempoState = __webpack_require__(4);
const TempoUtils = __webpack_require__(0);
const TempoTime = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// exports.SmartTimerState = {
// 	STARTED: 'STARTED',
// 	PAUSED: 'PAUSED',
// 	STOPED: 'STOPED',
// 	ENDED: 'ENDED'
// };

module.exports = {
	STARTED: 'STARTED',
	PAUSED: 'PAUSED',
	STOPED: 'STOPED',
	ENDED: 'ENDED'
};


/***/ })
/******/ ]);