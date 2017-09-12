const Tree = require("./trees");
const Walker = require('./walker');
const Bird = require('./bird');

class Game {

  constructor(document, ctx, playing) {
    this.walker = new Walker();
    this.tree = new Tree();
    this.bird = new Bird();
    this.musicPlaying = false;
    this.audio = document.getElementById('playback');
    this.button = document.getElementById('music');
    this.button.addEventListener('click', (e) => this.handleClick(e).focus());
    this.playing = playing;
    this.xCord = Math.floor(Math.random() * (1500 - 780) + 780 );
    this.secondxCord = 400;
    this.birdY = 100;
    this.timer = 7;
    this.pixel = 3;
    this.points = 0;
    this.i = Math.floor(Math.random() * 6);
    this.document = document;
    this.ctx = ctx;
    this.treeInterval = {};
    this.birdInterval = {};
    this.count = 0;
    this.displayRoad();
    this.walker.walk(ctx);
    this.run();
  }

  run(){
    this.audio.play();
    this.musicPlaying = true;
    this.startTrees(this.i, this.xCord, this.timer, this.tree);
    this.startBird(this.xCord);
    this.document.addEventListener('keypress', (e) => {
      e.preventDefault();
      if (e.keyCode === 32) {
        this.walker.jump(this.ctx, this.walker.man[3], 30, 60, this.count);
      }
    });
  }

  handleClick(e) {
    if (this.musicPlaying) {
      this.musicPlaying = false;
      this.audio.pause();
      e.currentTarget.blur();
    } else {
      this.musicPlaying = true;
      this.audio.play();
      e.currentTarget.blur();
    }
  }

  resetGame(){
    this.audio = document.getElementById('playback');
    this.button = document.getElementById('music');
    this.xCord = Math.floor(Math.random() * (1500 - 780) + 780 );
    this.timer = 7;
    this.pixel = 3;
    this.points = 0;
    this.walker.y = 260;
    this.walker.dead = false;
    clearInterval(this.walker.jumping);
    clearInterval(this.walker.stroll);
    this.walker.walk(this.ctx);
    this.displayRoad();
    this.startBird(this.xCord);
    this.startTrees(this.i, this.xCord, this.timer, this.tree);
  }

  displayRoad() {
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, 800, 400);
    this.ctx.rect(0, 320, 800, 3);
    this.ctx.fill();
  }

  startTrees(i, x, timer, t) {
    this.treeInterval = setInterval( () => {
      this.ctx.clearRect(x, 220, 70, 100);
      x -= this.pixel;
      this.ctx.drawImage(t.trees[i], x, 220, 60, 100);

      // collision
      if ((x === 90 && this.walker.y + 55 > 220) ||
          ((x + 50 > 100 && x < 130) && this.walker.y + 55 > 220)) {
         clearInterval(this.treeInterval);
         clearInterval(this.birdInterval);
         this.ctx.clearRect(80, 220, 150, 100);
         this.playing = false;
         this.walker.die(this.ctx, this.walker.man[3], 30, 60);
         this.audio.pause();
         this.promptToPlayAgain(this.document);
       }
       // start new tree if current tree is off the canvas
      if (x < -70) {
        this.points += 10 * (Math.floor(this.count / 2) || 1);
        this.ctx.clearRect(0, 0, 200, 80);
        this.displayPoints(this.points);
        this.count++;
        if (this.count % 4 === 0) { this.pixel += 0.5; }
        clearInterval(this.treeInterval);
        this.xCord = Math.floor(Math.random() * (1500 - 780) + 780 );
        i = parseInt(Math.random() * 6);
        this.startTrees(i, this.xCord, timer, t);
      }
    }, this.timer);
  }

  startBird(x) {
    let i = 0;
    let counter = 0;
    this.birdInterval = setInterval( () => {
      this.ctx.clearRect(x, this.birdY, 55, 55);
      x--;
      if (counter % 10 === 0) i++;
      this.ctx.drawImage(this.bird.birds[i % 8], x, this.birdY, 55, 55);
      counter++;

      // caught bird
      if (((x >= 100 && x <= 160) && this.walker.y < 155)) {
            this.ctx.clearRect(x, this.birdY, 55, 100);
            this.points += 20;
            this.displayBirdPoints();
            this.ctx.clearRect(0, 0, 200, 80);
            this.displayPoints(this.points);
            clearInterval(this.birdInterval);
            this.startBird(this.xCord);
          }

      if (x < -70) {
        counter++;
        clearInterval(this.birdInterval);
        this.xCord = Math.floor(Math.random() * (1500 - 780) + 780 );
        this.birdY = 100;
        this.startBird(this.xCord);
      }
    }, 6);
  }

  displayPoints(points) {
    this.ctx.fillStyle = "black";
    this.ctx.font = '25px Inconsolata';
    this.ctx.fillText(`Points: ${points}`, 25, 25);
  }

  displayBirdPoints() {
    let ctx = this.ctx;
    let count = 0;
    let interval = setInterval(function () {
      count++;
      ctx.fillStyle = "black";
      ctx.font = '50px Inconsolata';
      ctx.fillText("20", 100, 125);
        if (count === 100) {
          clearInterval(interval);
          ctx.clearRect(70, 90, 80, 80);
        }
    }, 3);
  }

  promptToPlayAgain(document) {

    document.addEventListener('keypress', (e) => {
      e.preventDefault();
      if (e.keyCode === 121) {
        clearInterval(this.birdInterval);
        clearInterval(this.treeInterval);
        this.ctx.clearRect(0, 0, 1500, 400);
        this.resetGame();
      }
    });
  }
}

module.exports = Game;
