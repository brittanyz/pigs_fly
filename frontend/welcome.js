const Game = require("./game");
// const Tree = require("./trees");
// const Walker = require('./walker');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const welcome = new Welcome(document, ctx);
  welcome.welcome();
  welcome.play();

});


class Welcome  {

  constructor(document, ctx) {
    this.document = document;
    this.ctx = ctx;
  }

  welcome() {
    this.ctx.clearRect(0, 0, 800, 400);
    this.ctx.fillStyle = "#b3d9ff";
    this.ctx.fillRect(0, 0, 800, 400);
    this.ctx.fillStyle = "#808080";
    this.ctx.font = '50px Inconsolata';
    this.ctx.fillText('Welcome to Tree Jumper!', 110, 100);
    this.ctx.font = '25px Inconsolata';
    this.ctx.fillText('Press the space bar to jump', 200, 150);
    this.ctx.fillText('Avoid the trees and the birds!', 185, 200);
    this.ctx.font = '18px Inconsolata';
    this.ctx.fillText('Press Enter to begin...', 280, 350);
  }

  play() {
    this.document.addEventListener('keypress', (e) => {
      // enter to play again, but disable once a round starts
      if (e.keyCode === 13) {
        return new Game(this.document, this.ctx);
      }
    });
  }
}

module.exports = Welcome;
