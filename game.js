// game.js just some information 

export function drawHUD(car) {
  fill(0, 150);
  rect(10, 10, 820, 80, 10);

  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text(`Health: ${floor(car.health)}`, 0, 30);
  text(`Fuel: ${floor(car.fuel)}`, 100, 30);
  text(`Coins: ${car.coins}`, 200, 30);
  text(`Distance: ${floor(car.x)}`, 300, 30);

  fill(100, 255, 100, 150);
  rect(width - 130, height - 80, 100, 50, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  text("GAS", width - 80, height - 55);

  fill(255, 100, 100, 150);
  rect(width - 260, height - 80, 100, 50, 10);
  fill(0);
  text("BRAKE", width - 210, height - 55);

  fill(510, 410, 100, 150);
  rect(width - 390, height - 80, 100, 50, 10);
  fill(0);
  text("JUMP", width - 330, height - 55);
}
function saveProgress(car, coins) {
  localStorage.setItem('carX', car.x);
  localStorage.setItem('carY', car.y);
  localStorage.setItem('coins', coins);
}

function loadProgress(car) {
  car.x = Number(localStorage.getItem('carX')) || car.x;
  car.y = Number(localStorage.getItem('carY')) || car.y;
  car.coins = Number(localStorage.getItem('coins')) || 0;
}
