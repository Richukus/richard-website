let particles = [];
let sketch = function (p) {
  p.setup = function () {
    let hero = document.querySelector(".hero");

    let canvas = p.createCanvas(hero.offsetWidth, hero.offsetHeight);

    canvas.parent("particle-canvas");

    canvas.position(0, 0);
  };

  p.windowResized = function () {
    let hero = document.querySelector(".hero");

    p.resizeCanvas(hero.offsetWidth, hero.offsetHeight);
  };

  p.draw = function () {
    p.clear();

    // Only draw while hero visible

    if (window.scrollY > window.innerHeight) {
      return;
    }

    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(p.mouseX, p.mouseY));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();

      particles[i].display();

      if (particles[i].life < 0) {
        particles.splice(i, 1);
      }
    }
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;

      this.vx = p.random(-1, 1);
      this.vy = p.random(-1, 1);

      this.life = 255;

      this.size = p.random(1, 3);
    }

    update() {
      let dx = p.mouseX - this.x;
      let dy = p.mouseY - this.y;

      let d = Math.sqrt(dx * dx + dy * dy) + 1;

      this.vx += (dx / d) * 0.02;
      this.vy += (dy / d) * 0.02;

      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;

      this.life -= 2.5;
    }

    display() {
      p.noStroke();

      p.fill(0, p.random(50, 255), 255, this.life);
      p.circle(this.x, this.y, this.size);
    }
  }
};

new p5(sketch);
