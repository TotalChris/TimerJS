class Timer {
    constructor(timerElement){
        this.timeElapsed = 0;
        this.timeLimit = 0;
        this.isRunning = false;
        this.hasLimit = false;
        this.timer = null;
        this.timerEl = timerElement;

        this.timerStartEv = new CustomEvent('timerStart', {bubbles: true});
        this.timerStopEv = new CustomEvent('timerStop', {bubbles: true});
        this.timerResetEv = new CustomEvent('timerReset', {bubbles: true});
        this.timerCompleteEv = new CustomEvent('timerComplete', {bubbles: true});
        this.timerTickEv = new CustomEvent('timerTick', {bubbles: true});
    }

    start(){
        this.isRunning = true;
        this.timer = setInterval(() => {
            this.runTimer();
        }, 1000);
        this.timerEl.dispatchEvent(this.timerStartEv);
    }

    stop(){
        clearInterval(this.timer);
        this.isRunning = false;
        this.timerEl.dispatchEvent(this.timerStopEv);
    }

    reset(){
        this.stop();
        this.timeElapsed = 0;
        this.timerEl.dispatchEvent(this.timerResetEv);
    }

    runTimer(){
        this.timeElapsed++;
        this.timerEl.dispatchEvent(this.timerTickEv);
        if(this.hasLimit && (this.timeElapsed === this.timeLimit)){
            this.stop();
            this.timerEl.dispatchEvent(this.timerCompleteEv);
        }
    }

    getElapsed(){
        return this.timeElapsed;
    }

    setLimit(limit){
        limit && (this.hasLimit = true);
        limit && (this.timeLimit = limit);
    }

    getLimit(){
        return this.timeLimit;
    }

    hasLimit(){
        return this.hasLimit;
    }

    getRemaining(){
        return this.timeLimit - this.timeElapsed;
    }
}