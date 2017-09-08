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
    this.jumped = false;
    this.stroll = null;
    this.dead = false;
    this.x = 100;
    this.y = 260;

    this.man = [this.walker1, this.walker2, this.walker3, this.walker4];
  }

  jump (ctx, img, width, height) {
    let up = true;
    clearInterval(this.stroll);
    if (this.y === 260) {
      const jumping = setInterval( () => {
        if (this.dead) {
          ctx.rect(0, 320, 800, 3);
          ctx.fill();
          // ctx.rotate(20 * Math.PI/180);
          // img.style.transform = "rotate(10deg)";
        }
        ctx.clearRect(this.x, this.y, width, height);
        if (this.y >= 95 && up) {
          if (this.y === 95) {up = false;}
          this.y--;
        }
        else this.y++;
        ctx.drawImage(img, this.x, this.y, width, height);
        if (this.y === 260 && !this.dead) {
          this.walk(ctx);
          clearInterval(jumping);
        }
      }, 6);
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
    this.jump(ctx, img, 40, 40);
    this.dead = true;
  }


}

module.exports = Walker;
