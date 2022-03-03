// Special interval functions to allow minute control REMOVE LATER
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

// Show win popup
function showWinPopup() {
    let winAmountElement = document.getElementById("win-amount")
    window.moneyInterval = setInterval(() => {
        console.log('------------ MONEY INCREMENT RUNNING')
        if(Number(winAmountElement.textContent) < (userData.betAmount * 5)) {
            winAmountElement.textContent = Number(winAmountElement.textContent) + 5
        }
    }, (userData.betAmount < 100 ? 70 : userData.betAmount < 350 ? 30 : userData.betAmount < 500 ? 10 : 4));
    showElements(["#win-popup"])
    confetti.start()
    setTimeout(() => {
        confetti.stop()
    }, 4000);
    document.addEventListener('mouseup', function hidePopup(e) {
        var popup = document.getElementById('win-popup');
        if (!popup.contains(e.target)) {
            popup.style.display = 'none';
            document.getElementById("win-amount").textContent = 0
            clearInterval(window.moneyInterval)
            userData.betHorse = null
            userData.betAmount = 0
            saveUserData()
            this.removeEventListener('mouseup', hidePopup);
        }
    });
}