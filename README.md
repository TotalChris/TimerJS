# Timer Class

> JS implementation of a timer using an optional limit and custom DOM events. Allows a developer to:
- Create a timer explicitly linked to a DOM element
- Attach events to fire on start, stop, reset, and tick
- Set an optional limit for the timer duration and intercept a specific event when that happens
- Read an in-progress timer or its remaining time relative to its limit

# Usage:

1.) Add the Timer.js file to page:

```
<script src="Timer.js"></script>
```

2.) Create a DOM element to catch Timer events:

```
<body>
...
    <div id="myTimerElement">
    ...
    </div>
...
</body>
```

3.) Write a script to attach the Timer object to the element:

```
let myTimer = new Timer(document.querySelector('#myTimerElement'));
```

4.) Write event handlers on the Timer host element to catch timer events:

```
document.querySelector('#myTimerElement').addEventListener('timerTick', () => {
    //set the element text to the time elapsed
    document.querySelector('#myTimerElement').innerText = myTimer.getElapsed();
})
```