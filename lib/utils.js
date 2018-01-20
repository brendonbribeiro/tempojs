'use strict';
const TempoTime = require("./time.js")

class TempoUtils {
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
		return t.milliseconds
			+ TempoUtils.secondsToMilliseconds(t.seconds)
			+ TempoUtils.minutesToMilliseconds(t.minutes)
			+ TempoUtils.hoursToMilliseconds(t.hours);
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

module.exports = TempoUtils;
