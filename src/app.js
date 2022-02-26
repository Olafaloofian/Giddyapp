let horseList = []
var finishOrder = []

window.onload = (event) => {
    horseList = Array.from(document.querySelectorAll(".horse")).map((horseElement) => new Horse(horseElement.id))
    console.log('------------ horselist', horseList)
}

function startRace() {
    horseList.forEach((horse) => {
        horse.run()
    })
    document.querySelectorAll(".temp-name").forEach((element) => {
        element.style.display = "none"
    })
    document.getElementById("start-button").disabled = true
}

function resetRace() {
    horseList.forEach((horse) => {
        horse.reset()
    })
    finishOrder = []
    document.getElementById("start-button").disabled = false
    document.querySelectorAll(".temp-name").forEach((element) => {
        element.style.display = "inherit"
    })
}

function checkForWin() {
    let winningHorse = finishOrder[0]
    alert(`${finishOrder[0].id} Won!`)
}

