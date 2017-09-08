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

const Tree = __webpack_require__(1);
const Walker = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const walker = new Walker();
  const game = new Game(document, ctx, walker);
  game.displayRoad();
  walker.walk(ctx);
  game.run();
});


class Game {

  constructor(document, ctx, walker) {
    this.walker = walker;
    this.tree = new Tree();
    this.xCord = 780;
    this.secondxCord = 400;
    this.yCord = 320;
    this.timer = 7;
    this.i = Math.floor(Math.random() * 6);
    this.document = document;
    this.ctx = ctx;
    this.interval = {};
  }

  run(){
    this.document.addEventListener('keypress', (e) => {
      if (e.keyCode === 115) {
        this.start(this.i, this.xCord, this.timer, this.tree);
      }
      if (e.keyCode === 113) {
        // s to start, q to quit
        clearInterval(this.interval);
        this.ctx.clearRect(0, 0, 800, 320);
      }
      if (e.keyCode === 32) {
        this.walker.jump(this.ctx, this.walker.man[3], 30, 60);
      }
    });
  }

  displayRoad() {
    //##### random rocks #####
    // for (let i = 0; i < 60; i++) {
    //   let x = Math.random() * 800;
    //   let y = Math.random() * (340 - 322) + 322;
    //   this.ctx.rect(x, y, 5, 1);
    //   this.ctx.fill();
    // }
    this.ctx.rect(0, 320, 800, 3);
    this.ctx.fill();
  }

  start(i, x, timer, t) {
    this.interval = setInterval( () => {
      this.ctx.clearRect(x, 220, 70, 100);
      this.ctx.drawImage(t.trees[i], x--, 220, 60, 100);

      // collision
      if ((x === this.walker.x && this.walker.y + 60 > 220) ||
          (x + 55 === this.walker.x && this.walker.y + 60 > 220)) {
         clearInterval(this.interval);
         this.ctx.clearRect(x, 220, 70, 100);
         this.walker.die(this.ctx, this.walker.man[3], 30, 60);
       }

       // start new tree if current tree is off the canvas
      if (x === -70) {
        clearInterval(this.interval);
        this.xCord = 695;
        i = parseInt(Math.random() * 6);
        this.start(i, this.xCord, timer, t);
      }
    }, timer);
  }


}


/***/ }),
/* 1 */
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
/* 2 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map