var user = {
    funds: 1000, // Set starting cash here
    betHorse: null,
    betAmount: 0,

    placeHorseBet: function(horseId) {
        this.betHorse = horseId
        document.getElementById("user-bet-text").textContent = `You bet $${this.betAmount} on ${this.betHorse}!`
        showElements(["#start-button"])
        hideElements([".bet-button"])
    },

    placeDollarBet: function(amount) {
        if(!raceStarted) {
            this.betAmount += amount
            this.funds -= amount
            document.getElementById("user-funds-text").textContent = this.funds
            document.getElementById("user-bet-text").textContent = `You bet $${this.betAmount}!`
            showElements([".bet-button"])
        }
    }
}