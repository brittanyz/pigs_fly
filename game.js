const Tree = require("./frontend/trees");
const Walker = require('./frontend/walker');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const walker = new Walker();
  const game = new Game(document, ctx, walker);
  game.displayRoad();
  walker.walk(ctx);
  game.run();
});


class Game {

  constructor(document, ctx, walker) {
    this.walker = walker;
    this.tree = new Tree();
    this.xCord = Math.floor(Math.random() * (1500 - 780) + 780 );
    this.secondxCord = 400;
    this.yCord = 320;
    this.timer = 7;
    this.pixel = 3;
    this.points = 0;
    this.i = Math.floor(Math.random() * 6);
    this.document = document;
    this.ctx = ctx;
    this.interval = {};
    this.count = 0;
  }

  run(){
    this.document.addEventListener('keypress', (e) => {
      if (e.keyCode === 115) {
        this.start(this.i, this.xCord, this.timer, this.tree);
      }
      if (e.keyCode === 113) {
        // s to start, q to quit
        clearInterval(this.interval);
        this.ctx.clearRect(0, 0, 800, 320);
      }
      if (e.keyCode === 32) {
        this.walker.jump(this.ctx, this.walker.man[3], 30, 60, this.count);
      }
    });
  }

  displayRoad() {
    //##### random rocks #####
    // for (let i = 0; i < 60; i++) {
    //   let x = Math.random() * 800;
    //   let y = Math.random() * (340 - 322) + 322;
    //   this.ctx.rect(x, y, 5, 1);
    //   this.ctx.fill();
    // }
    this.ctx.rect(0, 320, 800, 3);
    this.ctx.fill();
  }

  start(i, x, timer, t) {
    this.interval = setInterval( () => {
      console.log(x);
      this.ctx.clearRect(x, 220, 70, 100);
      this.ctx.drawImage(t.trees[i], x -= this.pixel, 220, 60, 100);
      // collision
      if ((Math.floor(x) === (this.walker.x + 30) && this.walker.y - 60 > 220) &&
          (Math.floor(x) + 60 === (this.walker.x) && this.walker.y - 60 > 220)) {
         clearInterval(this.interval);
         this.ctx.clearRect(x, 220, 70, 100);
         this.walker.die(this.ctx, this.walker.man[3], 30, 60);
       }

       // start new tree if current tree is off the canvas
      if (x < -70) {
        this.points += 10 * (Math.floor(this.count / 2) || 1);
        this.ctx.clearRect(700, 20, 100, 100);
        this.displayPoints(this.points);
        this.count++;
        if (this.count % 4 === 0) { this.pixel += 0.5; }
        clearInterval(this.interval);
        this.xCord = Math.floor(Math.random() * (1500 - 780) + 780 );
        i = parseInt(Math.random() * 6);
        this.start(i, this.xCord, timer, t);
      }
    }, this.timer);
  }

  displayPoints(points) {
    this.ctx.fillStyle = "#ff4d4d";
    this.ctx.font = '25px Inconsolata';
    this.ctx.fillText(`Points: ${points}`, 620, 75);
  }

}
