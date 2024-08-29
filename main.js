/*
    Coder: LUCKYINS
*/

// Getting the canvas
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        this._x = x;
        this._y = y;
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
            this._particlesArray.push(new Particle(window.innerWidth*Math.random(), window.innerHeight*Math.random(), Math.random()*20+20, color[i%5], 2))
        }
    }

    // Update particle position
    updateParticles(particle){
        //movement
        if (particle._x < window.innerWidth){
            particle._x = URM(particle._x, particle.getVelocity())
        }
        if (particle._y < window.innerWidth){
            particle._y = URM(particle._y, particle.getVelocity())
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
            ctx.arc(x,y,particle.getRadius(), 0, 2*Math.PI , true)
            ctx.fill()
            this.updateParticles(particle)
        }
    }
}


P1 = new ParticlesGenerator(100)

// Render Animation
function render(){
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight)// Erase
    // Draw
    P1.setParticles()
    // Draw
    requestAnimationFrame(render)// loop
}
render()