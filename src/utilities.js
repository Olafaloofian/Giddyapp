// Special interval functions to allow minute control
window.defaultSetInterval = window.setInterval;
window.defaultClearInterval = window.clearInterval;
window.activeIntervals = 0;
window.setInterval = function (callback, delayMs) {
    if(callback && delayMs){
            window.activeIntervals++;
    }
    return window.defaultSetInterval(callback, delayMs);
};
window.clearInterval = function (intervalId) {
    if(intervalId){
        window.activeIntervals--;
    }
    // console.log('------------ window.activeIntervals', window.activeIntervals)
    // console.log('------------ intervalId', intervalId)
    return window.defaultClearInterval(intervalId);
};

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
        console.log('------------ document.querySelectorAll(identifierArray)', document.querySelectorAll(identifierArray))
        document.querySelectorAll(className).forEach((element) => {
            element.style.display = "block"
        })
    })
}

// Scroll along the x axis if the window isn't wide enough to fit the track
function scrollX() {
    if(window.innerWidth < 1735 && raceStarted) {
        window.scrollInterval = setInterval(() => {
            console.log('------------ RUNNING')
            horseList.forEach((horse) => {
                let boundingBox = horse.horseElement.getBoundingClientRect()
                if(boundingBox.right > window.innerWidth) {
                    horse.horseElement.scrollIntoView()
                }
            })
        }, 50)
    }
}

// Show win popup
function showWinPopup() {
    let winAmountElement = document.getElementById("win-amount")
    window.moneyInterval = setInterval(() => {
        console.log('------------ MONEY INTERVAL')
        if(Number(winAmountElement.textContent) < (user.betAmount * 5)) {
            winAmountElement.textContent = Number(winAmountElement.textContent) + 5
        }
    }, 70);
    showElements(["#win-popup"])
    confetti.start()
    setTimeout(() => {
        confetti.stop()
    }, 4000);
}