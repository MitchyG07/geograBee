const BASE_URL = "http://localhost:3000"
const STATESGAME_URL = `${BASE_URL}/states_games`
const SCORE_URL = `${BASE_URL}/scores`
const USER_URL = `${BASE_URL}/users`
let userLoggedIn = false
let playing = false
let currentUser
let currentGame
login()

let score = 0

function handleLoginSubmit(e, username){
    e.preventDefault()
    fetch(USER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
    }, 
        body: JSON.stringify({'username': username}),
    })
    .then(resp => resp.json())
    .then(user => {
        currentUser = user 
        userLoggedIn = true
        document.getElementById("login-form").remove()
        document.getElementById('login').innerHTML = ''
        newGame()
    })
}

function postGame(difficulty) {
    fetch(STATESGAME_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
    }, 
        body: JSON.stringify({'difficulty': difficulty}),
    })
    .then(resp => resp.json())
    .then(statesGame => {
        startNewGame(statesGame)
        currentGame = statesGame
        playing = true
    })
}

function postScore(gameFinalScore) {
    console.log(gameFinalScore)
}

const states = [
    {symbol: "AL", name: "Alabama"},
    {symbol: "AK", name:  "Alaska"},
    {symbol: "AZ" , name: "Arizona"},
    {symbol: "AR" , name: "Arkansas"},
    {symbol: "CA" , name: "California"},
    {symbol: "CO" , name: "Colorado"},
    {symbol: "CT" , name: "Connecticut"},
    {symbol: "DE" , name: "Delaware"},
    {symbol: "FL" , name: "Florida"},
    {symbol: "GA" , name: "Georgia"},
    {symbol: "HI" , name: "Hawaii"}, 
    {symbol: "ID" , name: "Idaho"},
    {symbol: "IL" , name: "Illinois"},
    {symbol: "IN" , name: "Indiana"},
    {symbol: "IA" , name: "Iowa"},
    {symbol: "KS" , name: "Kansas"},
    {symbol: "KY" , name: "Kentucky"},
    {symbol: "LA" , name: "Louisiana"},
    {symbol: "ME" , name: "Maine"},
    {symbol: "MD" , name: "Maryland"}, 
    {symbol: "MA" , name: "Massachusetts"}, 
    {symbol: "MI" , name: "Michigan"},
    {symbol: "MN" , name: "Minnesota"},
    {symbol: "MS" , name: "Mississippi"},
    {symbol: "MO" , name: "Missouri"},
    {symbol: "MT" , name: "Montana"},
    {symbol: "NE" , name: "Nebraska"},
    {symbol: "NV" , name: "Nevada"},
    {symbol: "NH" , name: "New Hampshire"},
    {symbol: "NJ" , name: "New Jersey"},
    {symbol: "NM" , name: "New Mexico"},
    {symbol: "NY" , name: "New York"},
    {symbol: "NC" , name: "North Carolina"},
    {symbol: "ND" , name: "North Dakota"},
    {symbol: "OH" , name: "Ohio"},
    {symbol: "OK" , name: "Oklahoma"},
    {symbol: "OR" , name: "Oregon"},
    {symbol: "PA" , name: "Pennsylvania"},
    {symbol: "RI" , name: "Rhode Island"}, 
    {symbol: "SC" , name: "South Carolina"},
    {symbol: "SD" , name: "South Dakota"}, 
    {symbol: "TN" , name: "Tennessee"},
    {symbol: "TX" , name: "Texas"},
    {symbol: "UT" , name: "Utah"},
    {symbol: "VT" , name: "Vermont"},
    {symbol: "VA" , name: "Virginia"},
    {symbol: "WA" , name: "Washington"},
    {symbol: "WV" , name: "West Virginia"},
    {symbol: "WI" , name: "Wisconsin"},
    {symbol: "WY" , name: "Wyoming"},
]

//JS hit by JQuery event 
function convertStateName(symbol) {
    //global variable 
    selectedState = symbol
    selectedState.id = symbol.name
    let currentState = states.find(state => state.symbol == symbol.name)
    let state = currentState.name
    handleClick(state)
}

function handleClick(state) {
    console.log(state)
    let div = document.getElementById('state-form-block')
    div.innerHTML = ''
    let form = document.createElement('form')
    let input = document.createElement('input')
    let submit = document.createElement('input')
    form.innerHTML = ''
    input.type = "text"
    input.name = "state"
    submit.type = "submit"
    submit.value = "Submit" 
    form.addEventListener('submit', (e) => handleSubmit(e, state))

    div.appendChild(form)
    form.appendChild(input)
    form.appendChild(submit)
}

function handleSubmit(e, state) {
    e.preventDefault()
    let scoreKeeper = document.getElementById('score-keeper')
    if (e.target.state.value.toLowerCase() == state.toLowerCase()) {
        score++
        scoreKeeper.innerText = `Current Score: ${score}`
        checkGameOver()
        correctAnswer()
    }
}

function correctAnswer() {
    let map = document.getElementById('map')
    let svg = document.createElement('svg')
    svg.height = "300"
    svg.width = "300"
    svg.xmlns = "http://www.w3.org/2000/svg"
    svg.viewBox="0 0 1077 630"
    let path = document.createElement('path')
    path = selectedState.hitArea[0]
    path.style = 'fill: pink'
    map.appendChild(svg)
    svg.appendChild(path)
    debugger
}



function login() {  
    if (!userLoggedIn) {
        let loginDiv = document.getElementById('login')   
        let loginForm = document.createElement('form')        
        
        loginForm.id = "login-form"
        input = document.createElement('input')
        input.type = "text"
        input.name = "username"
        input.placeholder = "username"
        submit = document.createElement('input')
        submit.type = "submit"
        submit.value = "Submit" 
        
        loginDiv.innerText = 'Log in to Play!'

        loginForm.addEventListener('submit', (e) => handleLoginSubmit(e, input.value))
        
        loginForm.appendChild(input)
        loginForm.appendChild(submit)
        loginDiv.appendChild(loginForm)
    }
}

function newGame() {
    if (userLoggedIn && !playing) {
        let newGameDiv = document.getElementById("new-game")
        let newGameBtn = document.createElement('button')
        newGameBtn.innerText = 'Start New Game'
        newGameBtn.addEventListener('click', handleNewGameClick)
        
        newGameDiv.appendChild(newGameBtn)
    } 
}


function handleNewGameClick() {
    let newGameDiv = document.getElementById("new-game")
    newGameDiv.innerHTML = ''
    newGameDiv.innerText = 'Choose Difficulty Level!'
    let easyBtn = document.createElement('button')
    let medBtn = document.createElement('button')
    let hardBtn = document.createElement('button')
    
    let br1 = document.createElement('br')
    let br2 = document.createElement('br')
    let br3 = document.createElement('br')

    easyBtn.innerText = 'Easy'
    medBtn.innerText = 'Medium'
    hardBtn.innerText = 'Hard'

    easyBtn.addEventListener('click', () => postGame('Easy'))
    medBtn.addEventListener('click', () => postGame('Medium'))
    hardBtn.addEventListener('click', () => postGame('Hard'))

    newGameDiv.append(br1, easyBtn, br2, medBtn, br3, hardBtn)
}


function startNewGame(statesGame) {
    let timeLimit = 0
    let newGameDiv = document.getElementById('new-game')
    newGameDiv.innerHTML = ''
    let timer = document.getElementById('timer')
    let startBtn = document.createElement('button')
    startBtn.innerText = 'Start!'
    startBtn.id = "start-btn"
    newGameDiv.append(startBtn)

    if (statesGame.difficulty === "Easy") {
        //3 min for easy game
        timeLimit = 60 * 3 
    } else if (statesGame.difficulty === "Medium") {
        //2 min for med game
        timeLimit = 60 * 2
    } else {
        // 1 min for hard game
        //currently set to a few seconds for testing only
        timeLimit = 60 * 0.2
    }

    minutes = parseInt(timeLimit / 60, 10);
    seconds = parseInt(timeLimit % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    timer.innerText = minutes + ":" + seconds

    startBtn.addEventListener('click', () => startTimer(timeLimit))
}

function startTimer(duration) {
    display = document.getElementById('timer')
    let newGameDiv = document.getElementById('new-game')
    newGameDiv.innerHTML = '' 
    let timer = duration, minutes, seconds;
    let countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds

        if (--timer < 0) {
            clearInterval(countdown)
            endGame()
            //trigger a function here to stop the game and send the score
        }
    }, 1000);
}

function checkGameOver() {
    //a call to this function is included in state handleSubmit
    //currently line 134
    if (score === 50) {
        endGame()
    }
}

function endGame(){
    let div = document.getElementById('state-form-block')
    div.innerHTML = ''
    let scoreKeeper = document.getElementById('score-keeper')
    scoreKeeper.innerText = `Final Score: ${score}`

    let gameFinalScore = {
        total: score,
        user_id: currentUser.id,
        states_game_id: currentGame.id
    }
    //add toggle for form no longer being avail when game ends
    //also determine where playing should be set to false
    //and current user + game set to undefined
    postScore(gameFinalScore)
}

// Go Mariners 

