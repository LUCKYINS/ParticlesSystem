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
let vxValue = -1;

// Canvas context
const ctx = canvas.getContext("2d");
color = Array("blue", "red", "cyan", "white", "pink", "green");


// Uniform rectilinear movement
function URM(x, v){
    return x + v;
}

//Particle class
class Particle{
    constructor(x, y, radius, color,vx, vy){
        // Assure that the position doesn't go beyond the canvas limit
        this._x = (x+radius < cWidth && x-radius> 0) ? x : (x+radius> cWidth)  ? x-radius : x+radius; 
        this._y = (y+radius < cHeight && y-radius> 0) ? y : (y+radius> cHeight) ? y-radius : y+radius;

        this._radius = radius;
        this._color = color;
        this._vx = vx;
        this._vy = vy;
    
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
    getVX(){
        return this._vx;
    }
    getVY(){
        return this._vy;
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
            let x = window.innerWidth*Math.random()
            let y = window.innerHeight*Math.random()
            let radius = 15 + Math.random()*20 
            let pColor = color[i%5]
            let vx = (Math.random() >= 0.5) ? Math.random()*5 : - Math.random()*5
            let vy = (Math.random() >= 0.5) ? Math.random()*5 : - Math.random()*5
            this._particlesArray.push(new Particle(x, y, radius, pColor , vx, vy))
        }
    }

    // Update particle position
    updateParticles(particle){
        //movement
        if (particle.getVX()> 0){
            if (particle._x+particle._radius < window.innerWidth){
                particle._x = URM(particle._x, particle.getVX())
            }
            else{
                particle._vx *=-1
            }
        }
        if (particle.getVX()< 0){
            if (particle._x-particle._radius > 0){
                particle._x = URM(particle._x, particle.getVX())
            }
            else{
                particle._vx *=-1
            }
        }
        if (particle.getVY()> 0){
            if (particle._y+particle._radius < window.innerHeight){
                particle._y = URM(particle._y, particle.getVY())
            }
            else{
                particle._vy *=-1
            }
        }
        if (particle.getVY()< 0){
            if (particle._y-particle._radius > 0){
                particle._y = URM(particle._y, particle.getVY())
            }
            else{
                particle._vy *=-1
            }
        }

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
            ctx.arc(x,y,particle.getRadius(), 0, 2 * Math.PI , true)
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