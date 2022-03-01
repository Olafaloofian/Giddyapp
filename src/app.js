let horseList = []
var finishOrder = []
var raceStarted = false

window.onload = (event) => {
    horseList = Array.from(document.querySelectorAll(".horse")).map((horseElement) => new Horse(horseElement.id))
    console.log('------------ horselist', horseList)
    clearInterval(window.scrollInterval)
    scrollX()
    document.getElementById('user-funds-text').textContent = user.funds
}

window.onresize = (event) => {
    clearInterval(window.scrollInterval)
    scrollX()
    console.log('------------ RESIZED')
}

document.addEventListener('mouseup', function(e) {
    var popup = document.getElementById('win-popup');
    if (!popup.contains(e.target)) {
        popup.style.display = 'none';
        clearInterval(window.moneyInterval)
    }
});

function startRace() {
    raceStarted = true
    horseList.forEach((horse) => {
        horse.run()
    })
    hideElements([".bet-button", "#start-button", "#reset-button"])
}

function resetRace() {
    raceStarted = false
    horseList.forEach((horse) => {
        horse.reset()
    })
    finishOrder = []
    user.betAmount = 0
    user.betHorse = null
    document.getElementById("start-button").disabled = false
    hideElements(["#reset-button"])
    document.getElementById("user-bet-text").textContent = "Make a bet!"
}

