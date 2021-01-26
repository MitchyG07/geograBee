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

const states = [
    {'AL' : "Alabama"},
    {'AK' : "Alaska"},
    {'AZ' : "Arizona"},
    {'AR' : "Arkansas"},
    {'CA' : "California"},
    {'CO' : "Colorado"},
    {'CT' : "Connecticut"},
    {'DE' : "Delaware"},
    {'FL' : "Florida"},
    {'GA' : "Georgia"},
    {'HI' : "Hawaii"}, 
    {'ID' : "Idaho"},
    {'IL' : "Illinois"},
    {'IN' : "Indiana"},
    {'IA' : "Iowa"},
    {'KS' : "Kansas"},
    {'KY' : "Kentucky"},
    {'LA' : "Louisiana"},
    {'ME' : "Maine"},
    {'MD' : "Maryland"}, 
    {'MA' : "Massachusetts"}, 
    {'MI' : "Michigan"},
    {'MN' : "Minnesota"},
    {'MS' : "Mississippi"},
    {'MO' : "Missouri"},
    {'MT' : "Montana"},
    {'NE' : "Nebraska"},
    {'NV' : "Nevada"},
    {'NH' : "New Hampshire"},
    {'NJ' : "New Jersey"},
    {'NM' : "New Mexico"},
    {'NY' : "New York"},
    {'NC' : "North Carolina"},
    {'ND' : "North Dakota"},
    {'OH' : "Ohio"},
    {'OK' : "Oklahoma"},
    {'OR' : "Oregon"},
    {'PA' : "Pennsylvania"},
    {'RI' : "Rhode Island"}, 
    {'SC' : "South Carolina"},
    {'SD' : "South Dakota"}, 
    {'TN' : "Tennessee"},
    {'TX' : "Texas"},
    {'UT' : "Utah"},
    {'VT' : "Vermont"},
    {'VA' : "Virginia"},
    {'WA' : "Washington"},
    {'WV' : "West Virginia"},
    {'WI' : "Wisconsin"},
    {'WY' : "Wyoming"},
]

function handleClick(state) {
    console.log(state.name)
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
    if (e.target.state.value === state.name) {
        score++
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

