[![Build Status](https://travis-ci.org/brendonbarreto/tempojs.svg?branch=master)](https://travis-ci.org/brendonbarreto/tempojs)
[![Coverage Status](https://coveralls.io/repos/github/brendonbarreto/tempojs/badge.svg?branch=master&service=github)](https://coveralls.io/github/brendonbarreto/tempojs?branch=master&service=github)
[![npm version](https://badge.fury.io/js/tempojs.svg)](https://badge.fury.io/js/tempojs)

# tempojs
tempojs is a JavaScript library for building smart timers

* **Precise:** You will not get broken values like 999ms when you were waiting for 1s
* **Configurable:** You have several options to create your timer

## Installation

tempojs is available on [npm](https://www.npmjs.com/package/tempojs)

```shell
npm install tempojs
```

And you may get it from [rawgit](https://cdn.rawgit.com/brendonbarreto/tempojs/master/dist/tempo.min.js)
```html
<script type="text/javascript" src="https://cdn.rawgit.com/brendonbarreto/tempojs/master/dist/tempo.min.js"></script>
```

## Usage
If you're using `node`, first `require` tempojs
```js
const Tempo = require("tempojs");
```

That's all you need to get it working. To test if everything is fine, execute this small example
```js
let timer = new Tempo({
  onInterval:(time) => {
    console.log(time.toString());
  }
});

timer.start();
```

## Time Object
tempojs uses a more **human representation** of time as an object. This object will be used at some points, named `timeObj`, and it looks like this:

```js
{
  milliseconds: 1,
  seconds: 1,
  minutes: 1,
  hours: 1
}
```

### empty
The term empty `timeObj` refers to `{}`, or:
```js
{
  milliseconds: 0,
  seconds: 0,
  minutes: 0,
  hours: 0
}
```

### toString()
converts a `timeObj` into string (hh:mm:ss:fff). `{ hours: 2, minutes: 30, seconds: 45, milliseconds: 500 }` will return **02:30:45:500**

## Settings
You can configure your timer, by passing a object as first argument when creating a new `Tempo` instance
```js
let timer = new Tempo(settings);
```

### interval
* Represents the **delay** between timer ticks.
* Default value: `{ seconds: 1 }`
```js
let timer = new Tempo({
  interval:{
    minutes: 1,
    seconds: 30
  }
});
```
On this example timer will call `onInterval` every 1 minute and 30 seconds after started. It will also, search for `onIntervals` and `onSpecificTimes`.

### decreasing
* Determines if the timer will increase or decrease
* Default value: `false`

If set to `true`, timer will end at `endTime` or empty `timeObj`

### startTime
* Represents the time that your timer will start.
* Default value: empty `timeObj`

### endTime
* Represents the time that your timer will end.
* Default value: empty `timeObj`
