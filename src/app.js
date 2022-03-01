let horseList = []
var finishOrder = []
var raceStarted = false

window.onload = (event) => {
    // Set scroll position correctly on mobile
    document.getElementById("raceway").scrollIntoView();
    document.getElementById("main").scrollLeft = 0
    // Create a horse object for each element on the page
    horseList = Array.from(document.querySelectorAll(".horse")).map((horseElement) => new Horse(horseElement.id))
    // Set up auto-scroll
    scrollX()
    // Load user funds
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
    showElements([".dollar-button"])
    document.getElementById("user-bet-text").textContent = "Make a bet!"
    document.getElementById("user-funds-container").innerHTML = `Your funds: $<span id="user-funds-text">${user.funds}</span>`
    document.getElementById("main").scrollLeft = 0
}

