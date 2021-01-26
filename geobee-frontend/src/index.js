const BASE_URL = "http://localhost:3000"
const STATESGAME_URL = `${BASE_URL}/states_game`
const SCORE_URL = `${BASE_URL}/scores`
const USER_URL = `${BASE_URL}/users`
let userLoggedIn = false
let currentUser
login()

//load map 
// addMap() 
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
    .then(console.log)
}

function handleClick(state) {
    console.log(state.name)
    form = document.getElementById('state-input')
    form.innerHTML = ''
    input = document.createElement('input')
    input.type = "text"
    input.name = "state"
    submit = document.createElement('input')
    submit.type = "submit"
    submit.value = "Submit" 
    form.addEventListener('submit', (e) => handleSubmit(e, state))

    form.appendChild(input)
    form.appendChild(submit)
}

function handleSubmit(e, state) {
    e.preventDefault()
    scoreKeeper = document.getElementById('score-keeper')
    if (e.target.state.value == state.name) {
        score++
        scoreKeeper.innerText = `Current Score: ${score}`
    } else {
        scoreKeeper.innerText = `Current Score: ${score}`
    }
}
// function addMap() {
//     map = document.getElementById('map')
//     map.usmap({})
// }

function login() {  
    if (!userLoggedIn) {
        let loginDiv = document.getElementById('login')   
        let loginForm = document.createElement('form')        
        
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

