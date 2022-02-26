// Generate a random number between to integers
function randomInteger(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Main horse class
class Horse {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.movementLoop = null
        this.horseElement = document.getElementById(this.id)
        this.finishedStatus = false
    }

    // Stop movement
    reset(){
        clearInterval(this.movementLoop);
        this.horseElement.src = `../assets/${this.id}/tile015.png`
        this.horseElement.style.left = "0px";
        this.finishedStatus = false
        document.getElementById("win-message").textContent = ''
    }

    stop(){
        clearInterval(this.movementLoop);
        this.horseElement.src = `../assets/${this.id}/tile015.png`
    }

    // Run across the screen at a random speed
    run(){
        this.horseElement.src = `../assets/${this.id}/run.gif` // Change the image to a running gif
        this.movementLoop = setInterval(() => {
            var step=5; // This changes how far right the horse will move each iteration
            var xPosition = this.horseElement.offsetLeft;

            if(xPosition < 700) { 
                xPosition = xPosition + step;
                this.horseElement.style.left= xPosition + "px"; //horizontal move
            } else {
                this.stop()
                this.finishedStatus = true
                if (!finishOrder.length) {
                    document.getElementById("win-message").textContent = `${this.id.toUpperCase()} WINS!`
                }
                finishOrder.push(this)
            }
        }, randomInteger(40, 70));
    }
}