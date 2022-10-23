
// ==========AIM==========

const aimBody = document.querySelector(`.aim`)
const startButton = document.querySelector(`.aim__button`)
const resetButton = document.querySelector(`#resetButton`)
const misses = document.querySelector(`.miss`)
const gameOver = document.querySelector(`.game-over`)
const diff = document.querySelector(`.difficulty`)
const diffButton = document.querySelectorAll(`.diff`)
let aimScore = document.querySelector(`.aim__score`)
let score = 0
let missScore = 0
let id = 0
let div = document.createElement(`div`)
let interval
let difficulty = 0



//============================LISTENER START 

for(let i = 0; i < diffButton.length; i++){
	diffButton[i].addEventListener(`click`,()=>{
		if(diffButton[i] == diffButton[0]){
			difficulty = 0
		}if(diffButton[i] == diffButton[1]){
			difficulty = 1
		}if(diffButton[i] == diffButton[2]){
			difficulty = 2
		}
	})
}

startButton.addEventListener(`click`, function(){
	score = 0
	if(difficulty == 0){
		start()
		createDivLow()
		interval = setInterval(() => {
		createDivLow()
		}, 1800)}
		if(difficulty == 1){
			start()
			createDivMiddle()
			interval = setInterval(() => {
			createDivMiddle()
			}, 1200);}
		if(difficulty == 2){
			start()
			createDivHigh()
			interval = setInterval(() => {
			createDivHigh()
			}, 900);}
})


//==================================LISTENER HIT

div.addEventListener(`click`, function(){
	aimBody.innerHTML = ``
	score++
	aimScore.innerText = `Score: ${score}`
})



//==================================LISTENER MISS

{aimBody.addEventListener(`click`,(event)=>{
	let miss = event.composedPath().includes(div)
	if(miss == false){
		missScore++
	}
	misses.innerText = `Miss: ${missScore}`
	if(missScore > 9){
		missScore = 9
		aimBody.innerHTML = ``
		gameOver.style.opacity = `0.3`
		gameOver.style.display = `block`
		clearInterval(interval)
		setTimeout(() => {
			reset()
		}, 1900);
	}
})}



//===================================LISTENER RESET

resetButton.addEventListener(`click`, function(){
	reset()
})




//========================LISTENER MOUSE OVER / OUT

diff.addEventListener(`mouseover`, function(){
	for(let item of diffButton){
		setTimeout(() => {
			item.style.opacity = `1`
		}, 500);
	}
})
diff.addEventListener(`mouseout`, function(){
	for(let item of diffButton){
			item.style.opacity = `0`
		}
	})



	//=============================CREATE DIV FUNCTION

function createDivLow(){
	let randomLeft = Math.ceil(Math.random() * 100)
	let randomTop = Math.ceil(Math.random() * 100)
	aimBody.append(div)
		div.style.marginLeft = `${randomLeft}%`
		div.style.marginTop = `${randomTop}%`
		div.classList.remove(`middle`)
		div.classList.remove(`high`)
		div.classList.add(`low`)
}

function createDivMiddle(){
	let randomLeft = Math.ceil(Math.random() * 100)
	let randomTop = Math.ceil(Math.random() * 100)
	aimBody.append(div)
		div.style.marginLeft = `${randomLeft}%`
		div.style.marginTop = `${randomTop}%`
		div.classList.remove(`low`)
		div.classList.remove(`high`)
		div.classList.add(`middle`)
}

function createDivHigh(){
	let randomLeft = Math.ceil(Math.random() * 100)
	let randomTop = Math.ceil(Math.random() * 100)
	aimBody.append(div)
		div.style.marginLeft = `${randomLeft}%`
		div.style.marginTop = `${randomTop}%`
		div.classList.remove(`middle`)
		div.classList.remove(`low`)
		div.classList.add(`high`)
}


//================================START FUNCTION

function start(){
	startButton.style.display = `none`
	resetButton.classList.remove(`aim__button_reset-dont-active`)
	resetButton.classList.add(`aim__button_reset`)
}


//-----===========================RESET FUNCTION

function reset(){
	clearInterval(interval)
	aimBody.innerHTML = ``
	resetButton.classList.remove(`im__button_reset`)
	resetButton.classList.add(`aim__button_reset-dont-active`)
	startButton.style.display = `block`
	aimScore.innerText = `Score: 0`
	misses.innerText = `Miss: 0`
	missScore = 0
	gameOver.style.opacity = `0`
	gameOver.style.display = `none`
}