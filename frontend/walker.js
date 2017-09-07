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
    this.jumped = false;
    this.stroll = null;
    this.x = 100;
    this.y = 260;


    this.man = [this.walker1, this.walker2, this.walker3, this.walker4];
  }

  jump (ctx, img, width, height) {
    let up = true;
    clearInterval(this.stroll);
    if (this.y === 260) {
      const jumping = setInterval( () => {
        // ctx.clearRect(100, 260, 30, 60);
        ctx.clearRect(this.x, this.y, width, height);
        if (this.y >= 110 && up) {
          if (this.y === 110) {up = false;}
          this.y--;
        }
        else this.y++;
        ctx.drawImage(img, this.x, this.y, width, height);
        if (this.y === 260) {
          this.walk(ctx);
          clearInterval(jumping);
        }
      }, 5.5);
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


}

module.exports = Walker;
