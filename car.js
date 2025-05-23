// car.js
import { getDynamicFuelConsumption } from "./terrain.js";
import carModels from "./carmodels.js";
export class Car {
  constructor(modelKey, color) {
    this.x = 50;
    this.y = height - 120;
    this.model = carModels[modelKey];
    this.color = color || this.model.color;
    this.size = this.model.size;
    this.speed = 0;
    this.health = 100;
    this.fuel = this.model.fuelCapacity || 100;
    this.coins = 0;
    this.strength = this.model.strength || 1;
    this.gravity = 0.6;
    this.velY = 0;
    this.onGround = false;

    this.gasPressed = false;
    this.brakePressed = false;
    this.jumpPressed = false;
    this.lastHeightObj = { value: null }; // for dynamic fuel consumption

    // Add tire positions for simple independent tire simulation
    this.tireOffset = this.size * 0.33;
    this.tires = [
      { x: this.x - this.tireOffset, y: this.y + this.size * 0.25, vy: 0, onGround: false },
      { x: this.x + this.tireOffset, y: this.y + this.size * 0.25, vy: 0, onGround: false }
    ];

    // Remove jump cooldown and jumpActiveUntil logic
  }

  update(terrainY, terrainSlope) {
    // Controls
    if ((keyIsDown(RIGHT_ARROW) || this.gasPressed) && this.fuel > 0) {
      this.speed += this.model.acceleration || 0.3;
      let fuelUse = getDynamicFuelConsumption(this.x, this.model.fuelConsumption || 0.2, this.lastHeightObj);
      this.fuel -= fuelUse;
    } else if ((keyIsDown(LEFT_ARROW) || this.brakePressed) && this.speed > 0) {
      this.speed -= 0.4;
    } else {
      this.speed *= 0.98; // friction
    }
    this.speed = constrain(this.speed, 0, this.model.maxSpeed || 10);

    // Jump (up arrow) 
    // Limit: jump only if car is not already above terrain by more than 30
    let maxJumpHeight = terrainY - 30;
    if (
      (keyIsDown(UP_ARROW) || this.jumpPressed) &&
      this.onGround &&
      this.y > maxJumpHeight
    ) {
      this.velY = -10;
      this.onGround = false;
      for (let tire of this.tires) {
        tire.vy = -10;
        tire.onGround = false;
      }
    }

    // Always apply gravity
    let gravityActive = true;

    // --- Independent tire simulation ---
    let tireRadius = this.size / 3 / 2;
    for (let tire of this.tires) {
      tire.x = this.x + (tire === this.tires[0] ? -this.tireOffset : this.tireOffset);
      if (gravityActive) {
        tire.vy += this.gravity;
      }
      tire.y += tire.vy;

      let terrainYAtTire = terrainY;
      // Prevent tires from going more than 30 above terrain during jump
      if (!gravityActive && tire.y < terrainYAtTire - 30) {
        tire.y = terrainYAtTire - 30;
        tire.vy = 0;
      }

      if (tire.y + tireRadius > terrainYAtTire) {
        tire.y = terrainYAtTire - tireRadius;
        tire.vy = 0;
        tire.onGround = true;
      } else {
        tire.onGround = false;
      }
    }

    // Set car.y based on tires (average)
    this.y = (this.tires[0].y + this.tires[1].y) / 2 - this.size * 0.25;

    // Set car.onGround if both tires are on ground
    this.onGround = this.tires[0].onGround && this.tires[1].onGround;

    this.x += this.speed;

    if (this.health <= 0) {
      this.speed = 0;
    }
  }

  draw() {
    // Draw tires first
    fill(30);
    for (let tire of this.tires) {
      ellipse(tire.x, tire.y, this.size / 3);
    }
    // Use the model's custom draw method if available
    if (this.model.draw) {
      this.model.draw(this.x, this.y);
    } else {
      fill(this.color);
      stroke(0);
      strokeWeight(2);
      rect(this.x, this.y, this.size, this.size * 0.5, 10);
    }
  }

  collideBox(box) {
    if (box.used) return;
    let dx = abs(this.x - box.x);
    let dy = abs(this.y - box.y);
    if (dx < this.size / 2 + box.size / 2 && dy < this.size / 4 + box.size / 2) {
      box.used = true;
      this.health -= 10;
      this.speed *= 0.5;
    }
  }

  refuel(box) {
    if (box.used) return;
    let dx = abs(this.x - box.x);
    let dy = abs(this.y - box.y);
    if (dx < this.size / 2 + box.size / 2 && dy < this.size / 4 + box.size / 2) {
      box.used = true;
      this.fuel = min(this.fuel + 30, 100);
    }
  }

  collect(coin) {
    if (coin.collected) return;
    let dx = abs(this.x - coin.x);
    let dy = abs(this.y - coin.y);
    if (dx < this.size / 2 + 10 && dy < this.size / 4 + 10) {
      coin.collected = true;
      this.coins++;
    }
  }
}

// No duplicate or unnecessary functions found. All methods are used and unique.
