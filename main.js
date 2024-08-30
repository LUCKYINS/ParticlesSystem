/*
    Coder: LUCKYINS
*/

//Html Elements
const canvas = document.getElementById("canvas");
const particlesNumber = document.getElementById("particleNumber");

// Getting the canvas
let cWidth = window.innerWidth;
let cHeight = window.innerHeight;
canvas.width = cWidth;
canvas.height = cHeight

// Input Value
let particlesNumberValue = -1;
let velocityValue = -1;

// Canvas context
const ctx = canvas.getContext("2d");
color = Array("blue", "red", "cyan", "white", "pink", "green");
direction = Array() //TODO


// Uniform rectilinear movement
function URM(x, v){
    return x + v;
}

//Particle class
class Particle{
    constructor(x, y, radius, color,velocity){
        // Assure that the position doesn't go beyond the canvas limit
        this._x = (x+radius < cWidth && x-radius> 0) ? x : (x+radius> cWidth)  ? x-radius : x+radius; 
        this._y = (y+radius < cHeight && y-radius> 0) ? y : (y+radius> cHeight) ? y-radius : y+radius;

        this._radius = radius;
        this._color = color;
        this._velocity = velocity
    
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
    getVelocity(){
        return this._velocity;
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
            // Create an Array of particles
            this._particlesArray.push(new Particle(window.innerWidth*Math.random(), window.innerHeight*Math.random(), 20, color[i%5], 1))
        }
    }

    // Update particle position
    updateParticles(particle){
        //movement
        if (particle.getVelocity()> 0){
            if (particle._x+particle._radius < window.innerWidth){
                particle._x = URM(particle._x, particle.getVelocity())
            }
            else{
                particle._velocity *=-1
            }
        }
        if (particle.getVelocity()< 0){
            if (particle._x-particle._radius > 0){
                particle._x = URM(particle._x, particle.getVelocity())
            }
            else{
                particle._velocity *=-1
            }
        }
        // TODO height limit
    }

    //set Particles
    setParticles(){
        for (let i=0; i < this._number; i++){
            //Random color selection
            let particle = this._particlesArray[i]
            ctx.fillStyle = particle.getColor();

            //Create Balls
            let x = particle.getX()
            let y = particle.getY()
            ctx.beginPath()
            ctx.arc(x,y,particle.getRadius(), 0, 2*Math.PI , true)
            ctx.fill()
            this.updateParticles(particle)
        }
    }
}


// Create Particles
let P1 = new ParticlesGenerator(particlesNumberValue);

// Render Animation
function render(){
    // Change number value of particles
    if (particlesNumberValue != particlesNumber.value){
        P1 = new ParticlesGenerator(particlesNumberValue);
        particlesNumberValue = particlesNumber.value;
    }
    // Erase Frame
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight)// Erase
    // Draw
    P1.setParticles()
    // loop
    requestAnimationFrame(render)
}
render()