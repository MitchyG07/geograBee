const BASE_URL = "http://localhost:3000"
const STATESGAME_URL = `${BASE_URL}/states_game`
const SCORE_URL = `${BASE_URL}/scores`
const USER_URL = `${BASE_URL}/users`

//load map 
// addMap() 

function handleClick(state) {
    console.log(state.name)
    
    form = document.getElementById('state-input')
    input = document.createElement('input')
    input.type = "text"
    input.name = "state"
    submit = document.createElement('input')
    submit.type = "submit"
    submit.value = "Submit" 

    form.appendChild(input)
    form.appendChild(submit)
}
// function addMap() {
//     map = document.getElementById('map')
//     map.usmap({})
// }