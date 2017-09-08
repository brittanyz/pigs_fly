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
    this.skull = new Image();
    this.skull.src = './images/skull.png';

    // this.jumped = false;
    this.stroll = null;
    this.dead = false;
    this.x = 100;
    this.y = 260;
    this.time = 10;

    this.man = [this.walker1, this.walker2, this.walker3, this.walker4];
  }

  jump (ctx, img, width, height, count) {
    // console.log(count);
    let up = true;
    clearInterval(this.stroll);
    if (this.y === 260) {
      const jumping = setInterval( () => {
        if (this.dead) {
          ctx.rect(0, 320, 800, 3);
          ctx.fill();
          // ctx.rotate(20 * Math.PI/180);
        }
        ctx.clearRect(this.x, this.y, width, height);
        if (this.y >= 100 && up) {
          if (this.y === 100) {up = false;}
          this.y -= 5;
        }
        else this.y += 5;
        ctx.drawImage(img, this.x, this.y, width, height);
        if (this.y === 260 && !this.dead) {
          this.walk(ctx);
          clearInterval(jumping);
        }
        // if (count % 5 === 1) {
        //   this.time -= 0.002;
        // }
      }, this.time);
    }
  }

  walk (ctx) {
    let i = 0;
    this.stroll = setInterval( () => {
      i = (i + 1) % 4;
      ctx.clearRect(50, 260, 30, 60);
      ctx.drawImage(this.man[i], 100, 260, 30, 60);
    }, 100);
  }

  die(ctx, img, width, height) {
    this.jump(ctx, img, width, height);
    this.dead = true;
    this.gameOver(ctx);
  }

  gameOver(ctx) {
   ctx.fillStyle = "gray";
   ctx.font = '75px Inconsolata';
   ctx.fillText('Game Over', 215, 150);
  }


}

module.exports = Walker;
