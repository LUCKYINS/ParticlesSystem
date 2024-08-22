/*
    Coder: Luckyyyin
*/

// Getting the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Canvas context
const ctx = canvas.getContext("2d");
color = Array("blue", "red", "cyan", "white", "pink", "green")

class Particles{
    //Init
    constructor(number){
        this.number = number
    }

    //Particles
    makeParticles(){
        for (let i = 0; i < this.number; i++){
            ctx.beginPath()
            ctx.fillStyle = color[i % 10]
            ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight,
                    Math.random() * 100, 0, 360, true)
            ctx.fill()
        }
    }
}

function render(){
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight)// Erase
    // Draw
    
    // Draw
    requestAnimationFrame(render)// loop
}

render()