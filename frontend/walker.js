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

    // this.jumped = false;
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
          // ctx.rotate(20 * Math.PI/180);
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

  die(ctx, img, width, height) {

    this.dead = true;
    this.jump(ctx, img, width, height);
    this.gameOver(ctx);
  }

  gameOver(ctx) {
   ctx.fillStyle = "gray";
   ctx.font = '75px Inconsolata';
   ctx.clearRect(215, 75, 75, 200);
   ctx.fillText('Game Over', 215, 150);
   ctx.font = '18px Inconsolata';
   ctx.fillText('Would you like to play again? (press "y")', 190 ,200);
  }
}

module.exports = Walker;
