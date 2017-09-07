const Tree = require("./frontend/trees");
const Walker = require('./frontend/walker');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(document, ctx);
  game.displayRoad();
  game.displayWalker();
  game.run();
  window.drawMan = (i) => {
    // debugger
    ctx.drawImage(game.walker.man[i], 20, 260, 30, 60);
  };
  window.ctx = ctx;
  window.walker = game.walker.man;
});


class Game {

  constructor(document, ctx) {
    this.walker = new Walker();
    this.tree = new Tree();
    this.xCord = 780;
    this.secondxCord = 400;
    this.yCord = 320;
    this.timer = 5;
    this.i = Math.floor(Math.random() * 6);

    this.document = document;
    this.ctx = ctx;
    this.interval = {};
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
    });
  }

  displayRoad() {
    //##### random rocks #####
    // for (let i = 0; i < 60; i++) {
      // let x = Math.random() * 800;
      // let y = Math.random() * (340 - 322) + 322;
      // this.ctx.rect(x, y, 5, 1);
      // this.ctx.fill();
    // }
    this.ctx.rect(0, 320, 800, 3);
    this.ctx.fill();
  }

  displayWalker() {
    let i = 0;
    this.interval = setInterval( () => {
      i = (i + 1) % 4;
      this.ctx.drawImage(this.walker.man[i], 20, 260, 30, 60);
    }, 500);
  }

  start(i, x, timer, t) {
    this.interval = setInterval( () => {
      this.ctx.clearRect(x, 220, 70, 100);
      this.ctx.drawImage(t.trees[i], x--, 220, 60, 100);
      if (x === -70) {
        clearInterval(this.interval);
        this.xCord = 695;
        i = parseInt(Math.random() * 6);
        console.log(i);
        this.start(i, this.xCord, timer, t);
      }
    }, timer);
  }

}
