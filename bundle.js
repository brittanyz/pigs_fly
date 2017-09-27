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

window.addEventListener("load", () => {
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
    this.document.getElementById("music").style.visibility = "hidden";
    this.document.addEventListener('keypress', (e) => {
      // enter to play again, but disable once a round starts
      e.preventDefault();
      if (e.keyCode === 13 && !this.playing) {
        this.playing = true;
        return new Game(this.document, this.ctx, this.playing, this.initialized);
      }
      if (e.keyCode === 121 && !this.playing) {
        const welcome = new Welcome();
      }
    });
  }
}

module.exports = Welcome;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/brittany/Desktop/tree_jumper/frontend/game.js Unexpected token (158:8)\nYou may need an appropriate loader to handle this file type.\n|   }\n| \n|   module.exports = Game;\n| \n|   ");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map