// Set user data
function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(userData))
}

// Generate a random number between to integers
function randomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Hide elements based on an array of ".class-names"
function hideElements(identifierArray) {
    identifierArray.forEach(className => {
        document.querySelectorAll(className).forEach((element) => {
            element.style.display = "none"
        })
    })
}

// Show elements based on an array of ".class-names"
function showElements(identifierArray) {
    identifierArray.forEach(className => {
        document.querySelectorAll(className).forEach((element) => {
            element.style.display = "flex"
        })
    })
}

// Loop sound
function loopSound() {
    this.play()
}

// Scroll along the x axis if the window isn't wide enough to fit the track
function scrollX() {
    if(window.innerWidth < 1735 && raceStarted) {
        window.scrollInterval = setInterval(() => {
            console.log('------------ AUTOSCROLL RUNNING')
            horseList.forEach((horse) => {
                let boundingBox = horse.horseElement.getBoundingClientRect()
                if(boundingBox.right > window.innerWidth) {
                    horse.horseElement.scrollIntoView()
                }
            })
        }, 10)
    }
}