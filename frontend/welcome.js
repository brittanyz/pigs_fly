const Game = require("./game");
// const Tree = require("./trees");
// const Walker = require('./walker');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const welcome = new Welcome(document, ctx);
  // const playing = false;
  welcome.welcome();
  welcome.play();

});


class Welcome  {

  constructor(document, ctx) {
    this.document = document;
    this.ctx = ctx;
    this.playing = false;
  }

  welcome() {
    this.ctx.clearRect(0, 0, 800, 400);
    this.ctx.fillStyle = "#3366ff";
    this.ctx.fillRect(0, 0, 800, 400);
    this.ctx.fillStyle = '#cce6ff';
    this.ctx.font = '50px Inconsolata';
    this.ctx.fillText('Welcome to Tree Jumper!', 110, 80);
    this.ctx.font = '25px Inconsolata';
    this.ctx.fillStyle = '#cce6ff';
    this.ctx.fillText('Jump over the trees', 250, 170);
    this.ctx.fillText('and catch the birds for extra points!', 150, 210);
    this.ctx.font = '18px Inconsolata';
    this.ctx.fillStyle = '#cce6ff';
    this.ctx.fillText('Press the space bar to jump', 255, 325);
    this.ctx.font = '18px Inconsolata';
    this.ctx.fillText('Press Enter to begin...', 280, 350);
  }

  play(playing) {
    this.document.addEventListener('keypress', (e) => {
      // enter to play again, but disable once a round starts
      if (e.keyCode === 13) {
        return new Game(this.document, this.ctx);
      }
    });
  }
}

module.exports = Welcome;
