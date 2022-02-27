// Generate a random number between to integers
function randomInteger(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
        this.horseElement.src = `../assets/${this.id}/tile015.png`
        this.horseElement.style.left = "0px";
        this.finishedStatus = false
        document.getElementById("win-message").textContent = ''
        document.getElementById("main").scrollLeft = 0
    }

    // Stop horse movement
    stop(){
        clearInterval(this.movementInterval);
        clearTimeout(this.randomizeSpeedTimer);
        clearInterval(scrollInterval);
        this.horseElement.src = `../assets/${this.id}/tile015.png`
        this.finishedStatus = true
        if (!finishOrder.length) {
            document.getElementById("win-message").textContent = `${this.id.toUpperCase()} WINS!`
        }
        finishOrder.push(this)
        if (finishOrder.length === horseList.length) {
            document.getElementById("reset-button").style.display = "initial"
        }
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
    }
}