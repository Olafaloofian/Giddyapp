let horseList = []
var finishOrder = []
var raceStarted = false
let isTutorialActive = false
let isMenuUp = false

window.onload = (event) => {
    // Set scroll position correctly on mobile
    document.getElementById("raceway").scrollIntoView();
    document.getElementById("main").scrollLeft = 0
    // Create a horse object for each element on the page
    horseList = Array.from(document.querySelectorAll(".horse")).map((horseElement) => new Horse(horseElement.id))
    // Set up auto-scroll
    scrollX()
    // Check for tutorial URL
    if(/\?show_tutorial=true/g.test(window.location.href)) {
        showTutorial()
    } 
    //Route user
    router()
    // Load user funds
    document.getElementById('user-funds-text').textContent = userData.funds
    // Get local storage
    if(localStorage.getItem("user")) {

    }
}

window.onresize = (event) => {
    clearInterval(window.scrollInterval)
    scrollX()
    console.log('------------ RESIZED')
}

function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    console.log('------------ url', url)
};

function startRace() {
    raceStarted = true
    horseList.forEach((horse) => {
        horse.run()
    })
    if(isMenuUp) {
        toggleMenu()
    }
    hideElements([".bet-button", "#start-button", "#reset-button", "#menu-button"])
    scrollX()
}

function resetRace() {
    raceStarted = false
    horseList.forEach((horse) => {
        horse.reset()
    })
    finishOrder = []
    userData.betAmount = 0
    userData.betHorse = null
    document.getElementById("start-button").disabled = false
    document.getElementById("tutorial-button").disabled = false
    document.getElementById("user-bet-text").textContent = "Make a bet!"
    document.getElementById("user-funds-container").innerHTML = `Your funds: $<span id="user-funds-text">${userData.funds}</span>`
    document.getElementById("main").scrollLeft = 0
    hideElements(["#reset-button"])
    showElements(["#dollar-container"])
}

function toggleMenu() {
    let menuElement = document.querySelector(".user-container")
    let menuButton = document.getElementById("menu-button")
    if(menuElement.classList.contains("expanded")) {
        menuElement.classList.remove("expanded")
        menuElement.classList.add("retracted")
        menuButton.textContent = "▲"
        isMenuUp = false
    } else {
        menuElement.classList.add("expanded")
        menuElement.classList.remove("retracted")
        menuButton.textContent = "▼"
        isMenuUp = true
    }
}

async function showTutorial() {
    if(!isTutorialActive) {
        isTutorialActive = true
        let tutorialButton = document.getElementById("tutorial-button")
        let menuButton = document.getElementById("menu-button")
        tutorialButton.disabled = true
        menuButton.style.display = "none"
        if(isMenuUp) {
            toggleMenu()
        }

        let multiContainerElement = document.getElementById("multi-container")
        let dollarContainerElement= document.getElementById("dollar-container")
        let dollarTooltip = document.createElement("div")
        dollarTooltip.textContent = `Bet an amount by tapping one or more of these bills`
        dollarTooltip.className = "tooltip arrow-down"
        multiContainerElement.appendChild(dollarTooltip)
        await new Promise(resolve => {
            dollarContainerElement.addEventListener('mouseup', function checkTarget(e) {
                console.log('------------ DOLLAR CONTAINER LISTENER')
                if(e.target.className.split(' ').includes("dollar-button")) {
                    dollarTooltip.remove()
                    this.removeEventListener('mouseup', checkTarget);
                    resolve()
                }
            })
        })

        let userContainerElement = document.querySelector(".user-container")
        let horseTooltip = document.createElement("div")
        horseTooltip.textContent = `Choose the horse you think will win`
        horseTooltip.className = "tooltip arrow-up"
        userContainerElement.prepend(horseTooltip)
        await new Promise(resolve => {
            document.querySelector("#raceway").addEventListener('mouseup', function checkTarget(e) {
                console.log('------------ RACEWAY CONTAINER LISTENER')
                if(e.target.className.split(' ').includes("bet-button")) {
                    horseTooltip.remove()
                    this.removeEventListener('mouseup', checkTarget);
                    resolve()
                }
            })
        })

        let startTooltip = document.createElement("div")
        startTooltip.textContent = `Tap to start!`
        startTooltip.className = "tooltip arrow-down start-tooltip"
        multiContainerElement.appendChild(startTooltip)
        await new Promise(resolve => {
            multiContainerElement.addEventListener('mouseup', function checkTarget(e) {
                console.log('------------ MULTI CONTAINER LISTENER')
                if(e.target.id === "start-button") {
                    startTooltip.remove()
                    this.removeEventListener('mouseup', checkTarget);
                    resolve()
                }
            })
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

