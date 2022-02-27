let horseList = []
var finishOrder = []
var isMobile = true
var scrollInterval = null

window.onload = (event) => {
    isMobile = (window.innerWidth < 1500)
    horseList = Array.from(document.querySelectorAll(".horse")).map((horseElement) => new Horse(horseElement.id))
    console.log('------------ horselist', horseList)
    clearInterval(scrollInterval)
    scrollX()
}

window.onresize = (event) => {
    isMobile = (window.innerWidth < 1500)
    clearInterval(scrollInterval)
    scrollX()
    console.log('------------ RESIZED')
}

function startRace() {
    horseList.forEach((horse) => {
        horse.run()
    })
    document.querySelectorAll(".temp-name").forEach((element) => {
        element.style.display = "none"
    })
    document.getElementById("start-button").disabled = true
    document.getElementById("reset-button").style.display = "none"
}

function resetRace() {
    horseList.forEach((horse) => {
        horse.reset()
    })
    finishOrder = []
    document.getElementById("start-button").disabled = false
    document.querySelectorAll(".temp-name").forEach((element) => {
        element.style.display = "initial"
    })
    document.getElementById("reset-button").style.display = "none"
}

function scrollX() {
    if(isMobile) {
        scrollInterval = setInterval(() => {
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

