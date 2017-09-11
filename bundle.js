/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
// const Tree = require("./trees");
// const Walker = require('./walker');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const welcome = new Welcome(document, ctx);
  const playing = false;
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
    this.ctx.fillText('Welcome to Tree Jumper!', 130, 80);
    this.ctx.font = '25px Inconsolata';
    this.ctx.fillStyle = '#cce6ff';
    this.ctx.fillText('Jump over the trees', 270, 170);
    this.ctx.fillText('and catch the birds for extra points!', 170, 210);
    this.ctx.font = '18px Inconsolata';
    this.ctx.fillStyle = '#cce6ff';
    this.ctx.fillText('Press the space bar to jump', 275, 325);
    this.ctx.font = '18px Inconsolata';
    this.ctx.fillText('Press Enter to begin...', 300, 350);
  }

  play(playing) {
    this.document.addEventListener('keypress', (e) => {
      // enter to play again, but disable once a round starts
      if (e.keyCode === 13 && !this.playing) {
        this.playing = true;
        return new Game(this.document, this.ctx, this.playing);
      }
    });
  }
}

module.exports = Welcome;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Tree = __webpack_require__(2);
const Walker = __webpack_require__(3);
const Bird = __webpack_require__(4);

class Game {

  constructor(document, ctx, playing) {
    this.walker = new Walker();
    this.tree = new Tree();
    this.bird = new Bird();
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
    this.startTrees(this.i, this.xCord, this.timer, this.tree);
    this.startBird(this.xCord);
    this.document.addEventListener('keypress', (e) => {
      if (e.keyCode === 113) {
        // q to quit??
        clearInterval(this.interval);
        this.ctx.clearRect(0, 0, 800, 320);
      }
      if (e.keyCode === 32) {
        this.walker.jump(this.ctx, this.walker.man[3], 30, 60, this.count);
      }
    });
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
         this.playing = false;
         this.ctx.clearRect(x, 220, 70, 100);
         this.walker.die(this.ctx, this.walker.man[3], 30, 60);
         // clear bird space??
         clearInterval(this.birdInterval);
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
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Tree {

  constructor() {
    this.tree1 = new Image();
    this.tree1.src = './images/tree1.png';
    this.tree3 = new Image();
    this.tree3.src = './images/tree3.png';
    this.tree5 = new Image();
    this.tree5.src = './images/tree5.png';
    this.tree6 = new Image();
    this.tree6.src = './images/tree6.png';
    this.tree4 = new Image();
    this.tree4.src = './images/tree4.png';
    this.tree8 = new Image();
    this.tree8.src = './images/tree8.png';

    this.trees = [this.tree1, this.tree4, this.tree3, this.tree5, this.tree6, this.tree8];
  }
}

module.exports = Tree;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
        if (this.y >= 90 && up) {
          if (this.y === 90) {up = false;}
          this.y -= 5;
        }
        else this.y += 5;
        ctx.drawImage(img, this.x, this.y, width, height);
        if (this.y === 260 && !this.dead) {
          this.walk(ctx);
          clearInterval(jumping);
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
    this.jump(ctx, img, width, height);
    this.dead = true;
    this.gameOver(ctx);
  }

  gameOver(ctx) {
   ctx.fillStyle = "gray";
   ctx.font = '75px Inconsolata';
   ctx.clearRect(215, 75, 75, 150);
   ctx.fillText('Game Over', 215, 150);
  }
}

module.exports = Walker;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map