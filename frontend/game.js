const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// document.addEventListener("DOMContentLoaded", () => {
// });

let event;
document.addEventListener('keypress', (e) => {
  event = e.keyCode;
});

let xCord = 695;
let secondxCord = 400;
let yCord = 320;
const game = {
  ctx,
  xCord,
  secondxCord,
  yCord,
};

const displayRoad = () => {
  for (let i = 0; i < 60; i++) {
    let x = Math.random() * 800;
    let y = Math.random() * (340 - 322) + 322;
    game.ctx.rect(x, y, 5, 1);
    game.ctx.fill();
  }
};

game.ctx.rect(0, 320, 800, 3);
game.ctx.fill();
displayRoad();

function start(obj, i, x, timer) {
  const bla = setInterval( () => {
    obj.ctx.clearRect(0, 0, 800, 320);
    obj.ctx.drawImage(elements[i], x--, 220, 60, 100);
    if (x === -70) {
        console.log(i);
      clearInterval(bla);
      xCord = 695;
      i = parseInt(Math.random() * 4);
      start(game, i, xCord, timer);
    }
  }, timer);

}

  let timer = 5;
  xCord = 695;
  let i = Math.floor(Math.random() * (6 - 0) + 0);

  start(game, i, xCord, timer);










// ctx.clearRect(10, 10, 100, 100);
