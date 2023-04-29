# TimerJS
> *"I made this while I was drunk and high" -- me, probably.*

Javascript implementation of a timer using an optional limit and custom DOM events. <br />

Allows a developer to:
- Create a timer that can be optionally linked to a single or multiple DOM elements
- Attach multiple actions to fire on start, stop, reset, and tick.
- Set an optional limit for the timer duration and intercept a specific event when that happens
- Read an in-progress timer or its remaining time relative to its limit

# Usage:
## Importing the library
To add the Timer.js file to your page markup:

```html
<script src="Timer.js" type="module"></script>
```
Or to your Javascript code:
```js
import Timer from './Timer.js';
```

## Creating a Timer

```js
const myTimer = new Timer();
```

## Running actions

Timer Parameter Methods:
```js
myTimer.setLimit(num) // Sets a limit on the timer. If no number is provided, limit is unset.
myTimer.getLimit() // Returns the limit
myTimer.getElapsed() // Returns the elapsed time on the timer
myTimer.getRemaining() // Returns the difference between the limit and the elapsed time
myTimer.hasLimit() // Returns true if a limit has been set. Returns false otherwise.
```

Timer Lifecycle Methods:
```js
myTimer.start() // begins ticking
myTimer.stop() // stops ticking
myTimer.reset() // sets timer back to 0
```

## Event Listening and Handling

There are two methods for firing events during timer actions. These are made to accommodate both an element-listening model and an action-firing model. Both work the same but take different routes.

### Method 1: Firing simple actions on events

Connecting a function to an event is simple, just use the `on()` and `off()` methods on your timer:
```js
//create a function to fire
function startProcess() {
    console.log('Timer started!');
    //more code....
}
//attach the function to the event on myTimer
myTimer.on('start', startProcess);

//when an event needs to be disposed, use
myTimer.off('start', startProcess);
```

You can also define your function in the call to `Timer.on()`:
```js
myTimer.on('start', () => { console.log('myTiimer started!') })
```
When you need to dispose the event, but have no reference, use off with just the event type as an argument:
```js
myTimer.off('start') //this removes all actions added to start
```
> Warning: This removes ALL the actions associated with the `start` event! For this reason, named functions are recommended for timer actions.
> 
### Method 2: Adding DOM elements as 'listeners' to events

Define a DOM element that can be queried, then query it:
```html
<body>
...
    <div id="myTimerElement">
    ...
    </div>
...
</body>
```
```js
const timerElement = document.querySelector('#myTimerElement');
```

Use the `subscribe()` method to attach the element to the event

```js
myTimer.subscribe(timerElement, 'start');
```

The element can now listen for the `timer-start` event with the standard `addEventListener()` method.
```js
timerElement.addEventListener('timer-start', () => {
    //event
});
```

When you need to unsubscribe the element from the event, use `unsubscribe()`
```js
myTimer.unsubscribe(timerElement, 'start');
```

Elements can subscribe to all events using one `subscribe()` with no event type argument, and can similarly unsubscribe using one `unsubscribe()` with no event type argument.
```js
myTimer.subscribe(timerElement);
timerElement.addEventListener('timer-tick', () => {
    //event
});

//unsubscribe when done
myTimer.unsubscribe(timerElement);
```