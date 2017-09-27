class Walker {

  constructor() {
    this.walker1 = new Image();
    this.walker1.src = './images/man1.png';
    this.walker2 = new Image();
    this.walker2.src = './images/man2.png';
    this.walker3 = new Image();
    this.walker3.src = './images/man3.png';
    this.walker4 = new Image();
    this.walker4.src = './images/man4.png';
    this.deadman = new Image();
    this.deadman.src = './images/deadman.png';

    this.jumping = null;
    this.stroll = null;
    this.dead = false;
    this.x = 100;
    this.y = 260;
    this.time = 10;

    this.man = [this.walker1, this.walker2, this.walker3, this.walker4];
  }

  jump (ctx, img, width, height) {
    let up = true;
    clearInterval(this.stroll);
    if (this.y === 260) {
      this.jumping = setInterval( () => {
        if (this.dead && this.y >= 400) {
          clearInterval(this.jumping);
          ctx.rect(0, 320, 800, 3);
          ctx.fill();
        }
        ctx.clearRect(this.x, this.y, width, height);
        if (this.y >= 90 && up) {
          if (this.y === 90) {up = false;}
          this.y -= 5;
        }
        else this.y += 5;
        ctx.drawImage(img, this.x, this.y, width, height);
        if (this.y === 260 && !this.dead) {
          this.walk(ctx);
          clearInterval(this.jumping);
        } else if (this.y === 260 && this.dead) {
          ctx.clearRect(100, 260, 30, 60);
          ctx.drawImage(this.deadman, 100, 295, 60, 30);
          clearInterval(this.jumping);
        }
      }, this.time);
    }
  }

  walk (ctx) {
    let i = 0;
    this.stroll = setInterval( () => {
      i = (i + 1) % 4;
      ctx.clearRect(100, 260, 30, 60);
      ctx.drawImage(this.man[i], 100, 260, 30, 60);
    }, 100);
  }

  die(points, ctx, img, width, height) {
    this.dead = true;
    this.jump(ctx, img, width, height);
    this.gameOver(ctx, points);
  }

  gameOver(ctx, points) {
    debugger
    let highScore = parseInt(localStorage.getItem("highScore")) || points
    if (highScore < points) { localStorage.setItem("highScore", `${points}`) }
    ctx.fillStyle = "gray";
    ctx.font = '75px Inconsolata';
    ctx.clearRect(0, 25, 800, 175);
    ctx.fillText('Game Over', 215, 150);
    ctx.font = '24px Inconsolata';
    ctx.fillText(`your points: ${points}`, 290, 200);
    ctx.font = '24px Inconsolata';
    ctx.fillText(`your high score: ${localStorage.getItem("highScore")}`, 250, 230)
    setTimeout( () => {
      location.reload();
    }, 2500);
  }
}

module.exports = Walker;
