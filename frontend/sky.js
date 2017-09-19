class Sky {
  constructor(ctx, document) {
    this.ctx = ctx;
    this.document = document;
    this.cloud1 = new Image();
    this.cloud1.src = './images/cloud.png';
    this.cloudOneInterval = null;
    this.x = 800;
  }

  drawSky() {
    let i = 0;
    let oneX = this.getRandomSize();
    let oneY = this.getRandomSize();
    let height = this.getRandomY();
    this.cloudOneInterval = setInterval(() => {
      this.ctx.clearRect(this.x, height, oneX + 20, oneY);
      if (this.x < -65) this.x = 800;
      this.x--;
      this.ctx.drawImage(this.cloud1, this.x, height, oneX + 20, oneY);
    }, 8);
  }

  getRandomY() {
    return Math.floor(Math.random() * (40 - 25) + 25);
  }

  getRandomSize() {
    return Math.floor(Math.random() * (65 - 50) + 50);
  }

}

module.exports = Sky;
