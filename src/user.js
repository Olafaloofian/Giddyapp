var userData = {
    funds: 1000, // Set starting cash here
    betHorse: null,
    betAmount: 0,
}

function placeHorseBet(horseId) {
    userData.betHorse = horseId
    document.getElementById("user-bet-text").textContent = `You bet $${userData.betAmount} on ${userData.betHorse}!`
    showElements(["#start-button"])
    hideElements([".bet-button", "#dollar-container"])
}

function placeDollarBet(amount) {
    if(!raceStarted) {
        document.getElementById("tutorial-button").disabled = true
        if(amount > userData.funds) {
            clearTimeout(window.fundsAlert)
            document.getElementById("user-funds-container").innerHTML = `<div style='color: rgb(211, 0, 0)'>Not enough funds! $${userData.funds}</div>`
            window.fundsAlert = setTimeout(() => {
                document.getElementById("user-funds-container").innerHTML = `Your funds: $<div id="user-funds-text">${userData.funds}</div>`
            }, 2000);
            return
        }
        document.getElementById("user-funds-container").innerHTML = `Your funds: $<div id="user-funds-text">${userData.funds}</div>`

        userData.betAmount += amount
        userData.funds -= amount
        document.getElementById("user-funds-text").textContent = userData.funds
        document.getElementById("user-bet-text").textContent = `You bet $${userData.betAmount}!`
        showElements([".bet-button"])

        let damageText = document.createElement("div")
        damageText.textContent = `-$${amount}`
        damageText.className = "damage-text"
        document.getElementById("user-funds-text").appendChild(damageText)

    }
}

// var user = {


//     placeHorseBet: function(horseId) {
//         this.betHorse = horseId
//         document.getElementById("user-bet-text").textContent = `You bet $${this.betAmount} on ${this.betHorse}!`
//         showElements(["#start-button"])
//         hideElements([".bet-button", "#dollar-container"])
//     },

//     placeDollarBet: function(amount) {
//         if(!raceStarted) {
//             document.getElementById("tutorial-button").disabled = true
//             if(amount > user.funds) {
//                 clearTimeout(window.fundsAlert)
//                 document.getElementById("user-funds-container").innerHTML = `<div style='color: rgb(211, 0, 0)'>Not enough funds! $${this.funds}</div>`
//                 window.fundsAlert = setTimeout(() => {
//                     document.getElementById("user-funds-container").innerHTML = `Your funds: $<div id="user-funds-text">${this.funds}</div>`
//                 }, 2000);
//                 return
//             }
//             document.getElementById("user-funds-container").innerHTML = `Your funds: $<div id="user-funds-text">${this.funds}</div>`

//             this.betAmount += amount
//             this.funds -= amount
//             document.getElementById("user-funds-text").textContent = this.funds
//             document.getElementById("user-bet-text").textContent = `You bet $${this.betAmount}!`
//             showElements([".bet-button"])

//             let damageText = document.createElement("div")
//             damageText.textContent = `-$${amount}`
//             damageText.className = "damage-text"
//             document.getElementById("user-funds-text").appendChild(damageText)

//         }
//     }
// }