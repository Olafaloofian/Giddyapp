
# Giddyapp: Milestone Project 1

## Main concept

An online game where users can bet simulated money on a virtual horse race.

---

### Project Requirements

- Solo project
- This game cannot be a game or assignment we've already done in class
- This game must run in a web browser
- This game must be tracked in Github, with a minimum on 10 commits
- This game must be deployed on Github Pages or another location
- This game should be winnable or it should keep score (whichever makes more sense)
- When a player wins or loses, the game status and/or score should display visually to the player in a way that does not rely on console.logs or alerts
- HTML, CSS, and JavaScript should live in separate files
- Effort must be spent on styling and appearance
- The HTML code should use sematic tags
- The game should have a Readme.md file in the Github repository that describes the inspiration for the game, explains the controls and how to play the game, lists the technologies used to build the game, and addresses any outstanding bugs or unfinished functionality

### Functional pieces

- User must be able to submit a bet before each race
- User must be able to keep track of their current funds
  - user object
    - wallet
    - current bet amount
    - current bet horse number
- Horses must move along a track
- Horses must move at randomized speeds and with enough variation that the race stays exciting
  - horse class? or multiple horse objects
    - speed method
      - randomly changes throughout race
    - id
    - asset
- When the horse the user bets on wins, there should be a visual/auditory celebration of some kind
  - event
    - adds temporary html

### Styling ideas

- Use green CSS background or maybe image of grass
- Use image of dirt for racetrack texture
- Show clickable dollar bills for the user to place their bet
- Visual celebration on a win - confetti? Flashing lights?
- Use different images for each horse - put numbers on their sides in photoshop?
- Gif sprite showing horse running
- HORSE GIF SETTINGS: Frame 1-11, Delay Time 8, Don't Stack

### Hosting ideas

- giddyapp.buzz
- Buzz Games
- Websockets multiplayer
- Account with one daily play