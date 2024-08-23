/*
    Coder: LUCKYINS
*/

// Getting the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Canvas context
const ctx = canvas.getContext("2d");
color = Array("blue", "red", "cyan", "white", "pink", "green")

//Particle class
class Particle{
    constructor(x, y, radius, color){
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
    }
    getX(){
        return this._x;
    }
    getY(){
        return this._y;
    }
    getRadius(){
        return this._radius;
    }
    getColor(){
        return this._color;
    }
}

//Particle class
class ParticlesGenerator{
    //Init
    constructor(number){
        this._number = number;
        this._particlesArray = Array();
        this.makeParticles();
    }

    //make Particles
    makeParticles(){
        for (let i= 0; i < this._number; i++){
            this._particlesArray.push(new Particle(window.innerWidth*Math.random(), window.innerHeight*Math.random(), Math.random()*20+20, color[i%5]))
        }
    }

    //set Particles
    setParticles(){
        for (let i=0; i < this._number; i++){
            //Random color selection
            let particle = this._particlesArray[i]
            ctx.fillStyle = particle.getColor();
            //Create Balls
            ctx.beginPath()
            ctx.arc(particle.getX(),particle.getY(), particle.getRadius(), 0, 2*Math.PI , true)
            ctx.fill()
        }
    }
}

//P1 = new ParticlesGenerator(60)

// Render Animation
function render(){
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight)// Erase
    // Draw
    P1.setParticles()
    // Draw
    requestAnimationFrame(render)// loop
}
//render()