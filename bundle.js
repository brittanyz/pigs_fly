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
const Walker = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(document, ctx);
  game.displayRoad();
  game.displayWalker();
  game.run();
  window.prom = new Promise( (resolve, reject) => {
    for (let i = 0; i < 100; i++) {console.log(++i);}
    resolve();
  }).then(console.log("done"));
  console.log("interrupt");
});


class Game {

  constructor(document, ctx) {
    this.walker = new Walker();
    this.tree = new Tree();
    this.xCord = 780;
    this.secondxCord = 400;
    this.yCord = 320;
    this.timer = 7;
    this.i = Math.floor(Math.random() * 6);
    this.document = document;
    this.ctx = ctx;
    this.interval = {};
    this.jumped = false;
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
      if (e.keyCode === 32 && !this.jumped) {
        this.jumped = true;
        const prom = new Promise( (resolve, reject) => {
          this.walker.jump(this.ctx, this.walker.man[3], 100, 260, 30, 60);
          resolve();
        }).then(() => {
          console.log("hi");
          this.jumped = false;
        });
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

  displayWalker() {
    let i = 0;
    setInterval( () => {
      i = (i + 1) % 4;
      this.ctx.clearRect(50, 260, 30, 60);
      this.ctx.drawImage(this.walker.man[i], 100, 260, 30, 60);
    }, 100);
  }

  start(i, x, timer, t) {
    this.interval = setInterval( () => {
      this.ctx.clearRect(x, 220, 70, 100);
      this.ctx.drawImage(t.trees[i], x--, 220, 60, 100);
      if (x === -70) {
        clearInterval(this.interval);
        this.xCord = 695;
        i = parseInt(Math.random() * 6);
        console.log(i);
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
/* 2 */,
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map