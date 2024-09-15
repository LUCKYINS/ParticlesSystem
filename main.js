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
canvas.height = cHeight;

// Input Value
let particlesNumberValue = -1;

// Canvas context
const ctx = canvas.getContext("2d");


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
    // Get functions
    getX(){return this._x;}
    getY(){return this._y;}
    getRadius(){return this._radius;}
    getColor(){return this._color;}
    getVX(){return this._vx;}
    getVY(){return this._vy;}

    // Set functions
    setX(value){this._x = value;}
    setY(value){ this._y = value;}
    setRadius(value){ this._radius = value;}
    setColor(value){ this._color = value;}
    setVX(value){ this._vx = value;}
    setVY(value){ this._vy = value;}


}

//Particle class
class ParticlesGenerator{
    //Init
    constructor(number){
        this._number = number;
        this._particlesArray = Array();
        this._pX,this._pY,this._pRadius, this._pColor, this._pVX, this._pVY
        this.makeParticles();

    }

    //make Particles
    makeParticles(){
        for (let i= 0; i < this._number; i++){
            // Create an Array of particles
            this._pX = window.innerWidth*Math.random();
            this._pY = window.innerHeight*Math.random();
            this._pRadius = 15 + Math.random()*20;
            this._pColor = `hsl(${this._pX}, 100%, ${40+ Math.random()*50}%)`;
            this._pVX = (Math.random() >= 0.5) ? Math.random()*5 : - Math.random()*5;
            this._pVY = (Math.random() >= 0.5) ? Math.random()*5 : - Math.random()*5;
            this._particlesArray.push(new Particle(this._pX,this._pY,this._pRadius, this._pColor, this._pVX, this._pVY));
        }
    }

    // Update particle position
    updateParticles(particle){
        //movement
        if (particle.getVX()> 0){
            if (particle.getX()+particle.getRadius() < cWidth){
                particle.setX(URM(particle.getX(), particle.getVX()))
            }
            else{
                particle.setVX(-particle.getVX())
            }
        }
        if (particle.getVX()< 0){
            if (particle.getX()-particle.getRadius() > 0){
                particle.setX(URM(particle.getX(), particle.getVX())) 
            }
            else{
                particle.setVX(-particle.getVX())
            }
        }
        if (particle.getVY()> 0){
            if (particle.getY()+particle.getRadius() < cHeight){
                particle.setY(URM(particle.getY(), particle.getVY()))
            }
            else{
                particle.setVY(-particle.getVY())
            }
        }
        if (particle.getVY()< 0){
            if (particle.getY()-particle.getRadius() > 0){
                particle.setY(URM(particle.getY(), particle.getVY()))
            }
            else{
                particle.setVY(-particle.getVY())
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