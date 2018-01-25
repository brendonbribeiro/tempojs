'use strict'

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

const TempoUtils = require("./utils.js");
