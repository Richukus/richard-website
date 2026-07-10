let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('pointer-events', 'none');
  canvas.style('position', 'fixed');

  clear();
}

function draw() {

  clear();

  // Emit particles
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }

  // Update backwards so removal is safe
  for (let i = particles.length - 1; i >= 0; i--) {

    particles[i].update();
    particles[i].display();

    if (particles[i].dead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {

  constructor(x, y) {

    this.pos = createVector(x, y);

    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));

    this.acc = createVector();

    this.life = 255;

    this.size = random(3, 8);

  }

  update() {

    // Attraction toward cursor
    let target = createVector(mouseX, mouseY);

    let force = p5.Vector.sub(target, this.pos);

    let d = constrain(force.mag(), 20, 300);

    force.normalize();

    force.mult(1 / d * 20);

    this.acc.add(force);

    this.vel.add(this.acc);

    this.vel.limit(3);

    this.pos.add(this.vel);

    this.acc.mult(0);

    this.life -= 3;

  }

  display() {

    noStroke();

    fill(255, this.life);

    circle(this.pos.x, this.pos.y, this.size);

  }

  dead() {

    return this.life < 0;

  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}