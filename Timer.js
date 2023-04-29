export default class Timer {
    #timeElapsed = 0;
    #timeLimit = -1;
    #isRunning = false;
    #timerHasLimit = false;
    timer = null;
    timerEvents = {
        start: {functions: [], listeners: [], eventLiteral: new CustomEvent('timer-start', {bubbles: true})},
        stop: {functions: [], listeners: [], eventLiteral: new CustomEvent('timer-stop', {bubbles: true})},
        reset: {functions: [], listeners: [], eventLiteral: new CustomEvent('timer-reset', {bubbles: true})},
        done: {functions: [], listeners: [], eventLiteral: new CustomEvent('timer-done', {bubbles: true})},
        tick: {functions: [], listeners: [], eventLiteral: new CustomEvent('timer-tick', {bubbles: true})},
    };

    subscribe(element, eventType){
        if(eventType){
            this.timerEvents[eventType].listeners.push(element);
        } else {
            for (let eType in this.timerEvents){
                this.timerEvents[eType].listeners.push(element);
            }
        }
    }

    unsubscribe(element, eventType) {
        if(eventType){
            this.timerEvents[eventType].listeners = this.timerEvents[eventType].listeners.filter((l) => l !== element)
        } else {
            for (let eType in this.timerEvents){
                this.timerEvents[eType].listeners = this.timerEvents[eType].listeners.filter((l) => l !== element);
            }
        }
    }

    on(eventType, func){
        this.timerEvents[eventType].functions.push(func);
    }

    off(eventType, func){
        if(func){
            this.timerEvents[eventType].functions = this.timerEvents[eventType].functions.filter((f) => f !== func)
        } else {
            this.timerEvents[eventType].functions = [];
        }
    }

    #runEvents(eventType){
        this.timerEvents[eventType].functions.forEach((f, i) => {
            f();
        })
        this.timerEvents[eventType].listeners.forEach((l, i) => {
            l.dispatchEvent(this.timerEvents[eventType].eventLiteral)
        })
    }

    start(){
        this.#isRunning = true;
        this.timer = setInterval(() => {
            this.#runTimer();
        }, 1000);
        this.#runEvents('start');
    }

    stop(){
        clearInterval(this.timer);
        this.#isRunning = false;
        this.#runEvents('stop');
    }

    reset(){
        this.#timeElapsed = 0;
        this.#runEvents('reset');
    }

    #runTimer(){
        this.#timeElapsed++;
        this.#runEvents('tick');
        if(this.#timerHasLimit && (this.#timeElapsed === this.#timeLimit)){
            this.stop();
            this.#runEvents('done');
        }
    }

    getElapsed(){
        return this.#timeElapsed;
    }

    setLimit(limit){
        limit ? (this.#timerHasLimit = true) : (this.#timerHasLimit = false);
        limit ? (this.#timeLimit = limit) : (this.#timeLimit = -1);
    }

    getLimit(){
        return this.#timeLimit;
    }

    getRemaining(){
        return this.#timeLimit - this.#timeElapsed;
    }

    hasLimit(){
        return this.#timerHasLimit;
    }
}