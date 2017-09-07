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

    this.man = [this.walker1, this.walker2, this.walker3, this.walker4];
  }

  jump (ctx, img, x, y, width, height) {
    let up = true;
    const jumping = setInterval( () => {
      ctx.clearRect(100, 260, 30, 60);
      ctx.clearRect(x, y, width, height);
      if (y >= 110 && up) {
        if (y === 110) up = false;
        y--;
      }
      else y++;
      ctx.drawImage(img, x, y, width, height);
      if (y === 260) clearInterval(jumping);
    }, 5.5);
    console.log("done jumpung");
  }

}

module.exports = Walker;
