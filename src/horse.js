// Main horse class
class Horse {
    constructor(id) {
        this.id = id
        this.speedMilliseconds = 40 // The lower this is, the faster the horse will go
        this.movementInterval = null
        this.randomizeSpeedTimer = null
        this.horseElement = document.getElementById(this.id)
        this.finishedStatus = false
    }

    // Reset race
    reset(){
        clearInterval(this.movementInterval);
        clearInterval(window.scrollInterval);
        this.horseElement.src = `../assets/${this.id}/tile015.png`
        this.horseElement.style.left = "0px";
        this.finishedStatus = false
        document.getElementById("win-message").textContent = ''
        document.getElementById("main").scrollLeft = 0
    }

    // Stop horse movement
    stop(){
        if (!finishOrder.length) {
            document.getElementById("win-message").textContent = `${this.id.toUpperCase()} WINS!`
            if(user.betHorse === this.id) {
                showWinPopup()
                user.funds += (user.betAmount * 5)
                document.getElementById("user-funds-text").textContent = user.funds
                document.getElementById("user-bet-text").textContent = "WINNER!"
            } else {
                document.getElementById("user-bet-text").textContent = "Better luck next time!"
            }
        }
        finishOrder.push(this)
        clearInterval(this.movementInterval);
        clearTimeout(this.randomizeSpeedTimer);
        clearInterval(window.scrollInterval);
        this.horseElement.src = `../assets/${this.id}/tile015.png`
        this.finishedStatus = true
        if (finishOrder.length === horseList.length) {
            document.getElementById("reset-button").style.display = "initial"
        }
        console.log('------------ finishOrder', finishOrder)
    }

    // Will be called repeatedly to randomize speed across the course
    setMovementSpeed() {
        clearInterval(this.movementInterval);
        var xPosition = this.horseElement.offsetLeft;
        this.movementInterval = setInterval(() => {
            var step = 5; // This changes how far right the horse will move each iteration
            if(xPosition < 1350) {
                xPosition = xPosition + step;
                this.horseElement.style.left= xPosition + "px"; // Horizontal movement
            } else {
                this.stop()
            }
        }, this.speedMilliseconds);

        if(xPosition < 1350) { 
            this.randomizeSpeedTimer = setTimeout(() => {
                this.speedMilliseconds = randomInteger(20, 60)
                this.setMovementSpeed()
            }, randomInteger(200, 1200));
        }
    }

    // Run across the screen at a random speed
    run(){
        this.horseElement.src = `../assets/${this.id}/run.gif` // Change the image to a running gif
        this.setMovementSpeed()
        scrollX()
    }
}