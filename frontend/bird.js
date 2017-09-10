class Bird {

  constructor() {
    this.bird1 = new Image();
    this.bird1.src = './images/bird1.png';
    this.bird2 = new Image();
    this.bird2.src = './images/bird2.png';
    this.bird3 = new Image();
    this.bird3.src = './images/bird3.png';
    this.bird4 = new Image();
    this.bird4.src = './images/bird4.png';
    this.bird5 = new Image();
    this.bird5.src = './images/bird5.png';
    this.bird6 = new Image();
    this.bird6.src = './images/bird6.png';
    this.bird7 = new Image();
    this.bird7.src = './images/bird7.png';
    this.bird8 = new Image();
    this.bird8.src = './images/bird8.png';

    this.birds = [this.bird1, this.bird2, this.bird3, this.bird4,
                  this.bird5, this.bird6, this.bird7, this.bird8];
  }
}

module.exports = Bird;
