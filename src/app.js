let horseList = []
var finishOrder = []
var scrollInterval = null

window.onload = (event) => {
    horseList = Array.from(document.querySelectorAll(".horse")).map((horseElement) => new Horse(horseElement.id))
    console.log('------------ horselist', horseList)
    clearInterval(scrollInterval)
    scrollX()
}

window.onresize = (event) => {
    clearInterval(scrollInterval)
    scrollX()
    console.log('------------ RESIZED')
}

function startRace() {
    horseList.forEach((horse) => {
        horse.run()
    })
    hideElements([".temp-name", ".bet-button"])
    document.getElementById("start-button").disabled = true
    document.getElementById("reset-button").style.display = "none"
}

function resetRace() {
    horseList.forEach((horse) => {
        horse.reset()
    })
    finishOrder = []
    document.getElementById("start-button").disabled = false
    showElements([".temp-name", ".bet-button"])
    document.getElementById("reset-button").style.display = "none"
}

