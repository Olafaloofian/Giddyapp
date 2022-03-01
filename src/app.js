let horseList = []
var finishOrder = []
var raceStarted = false
let isTutorialActive = false

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
        document.getElementById("win-amount").textContent = 0
        clearInterval(window.moneyInterval)
    }
});

function startRace() {
    raceStarted = true
    horseList.forEach((horse) => {
        horse.run()
    })
    hideElements([".bet-button", "#start-button", "#reset-button"])
    scrollX()
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

function toggleMenu() {
    let menuElement = document.querySelector(".user-container")
    let menuButton = document.getElementById("menu-button")
    if(menuElement.classList.contains("expanded")) {
        menuElement.classList.remove("expanded")
        menuElement.classList.add("retracted")
        menuButton.textContent = "▲"
    } else {
        menuElement.classList.add("expanded")
        menuElement.classList.remove("retracted")
        menuButton.textContent = "▼"
    }
}

async function showTutorial() {
    if(!isTutorialActive) {
        isTutorialActive = true
        let tutorialButton = document.getElementById("tutorial-button")
        let menuButton = document.getElementById("menu-button")
        tutorialButton.disabled = true
        menuButton.style.display = "none"
        toggleMenu()

        let dollarContainerElement = document.getElementById("dollar-container")
        let dollarTooltip = document.createElement("div")
        dollarTooltip.textContent = `Bet an amount by tapping one or more of these bills`
        dollarTooltip.className = "tooltip arrow-down"
        dollarContainerElement.appendChild(dollarTooltip)
        await new Promise(resolve => {
            dollarContainerElement.addEventListener('mouseup', function(e) {
                dollarTooltip.remove()
                resolve()
            }, {once:true})
        })

        let userContainerElement = document.querySelector(".user-container")
        let horseTooltip = document.createElement("div")
        horseTooltip.textContent = `Choose the horse you think will win`
        horseTooltip.className = "tooltip arrow-up"
        userContainerElement.prepend(horseTooltip)
        await new Promise(resolve => {
            document.querySelector("#raceway").addEventListener('mouseup', function(e) {
                horseTooltip.remove()
                resolve()
            }, {once:true})
        })

        let startTooltip = document.createElement("div")
        startTooltip.textContent = `Tap to start!`
        startTooltip.className = "tooltip arrow-down start-tooltip"
        dollarContainerElement.appendChild(startTooltip)
        await new Promise(resolve => {
            dollarContainerElement.addEventListener('mouseup', function(e) {
                startTooltip.remove()
                resolve()
            }, {once:true})
        })

        let displayContainerElement = document.getElementById("user-display-container")
        let displayTooltip = document.createElement("div")
        displayTooltip.textContent = `View your funds and bet status here`
        displayTooltip.className = "tooltip arrow-down display-tooltip"
        displayContainerElement.appendChild(displayTooltip)
        await new Promise(resolve => {
            setTimeout(() => {
                displayTooltip.remove()
                resolve()
            }, 4000);
        })

        tutorialButton.disabled = false
        menuButton.style.display = "initial"
        isTutorialActive = false
    }
}

