const carModels = {
  car: {
    name: "Car",
    color: "white",
    size: 40,
    maxSpeed: 7,
    fuelCapacity: 100,
    fuelConsumption: 0.2,
    acceleration: 0.3,
    strength: 1,
    description: "Balanced starter car.",
    draw: function(x, y) {
      // Standard car: rectangle body, normal wheels
      fill(this.color);
      rect(x, y, this.size, this.size * 0.5, 10);
      fill(30);
      ellipse(x - this.size / 3, y + this.size * 0.25, this.size / 3);
      ellipse(x + this.size / 3, y + this.size * 0.25, this.size / 3);
    }
   /*function(x, y) {
  const w = this.size;
  const h = w * 0.4;
  const roofHeight = h * 0.6;
  const wheelSize = w * 0.25;

  // Car body (lower half)
  fill(this.color);
  beginShape();
  vertex(x - w * 0.5, y);              // rear bumper
  vertex(x - w * 0.45, y - h * 0.4);   // rear slope
  vertex(x - w * 0.2, y - roofHeight); // roof start
  vertex(x + w * 0.2, y - roofHeight); // roof end
  vertex(x + w * 0.45, y - h * 0.4);   // front slope
  vertex(x + w * 0.5, y);             // front bumper
  endShape(CLOSE);

  // Windows
  fill(180);
  rect(x - w * 0.18, y - roofHeight + 2, w * 0.15, h * 0.2, 3); // rear window
  rect(x + w * 0.03, y - roofHeight + 2, w * 0.15, h * 0.2, 3); // front window

  // Wheels
  fill(30);
  ellipse(x - w * 0.3, y + wheelSize * 0.5, wheelSize); // rear wheel
  ellipse(x + w * 0.3, y + wheelSize * 0.5, wheelSize); // front wheel
}*/

  },
  truck: {
    name: "Truck",
    color: "blue",
    size: 100,
    maxSpeed: 5,
    fuelCapacity: 140,
    fuelConsumption: 0.28,
    acceleration: 0.22,
    strength: 2,
    description: "Heavy, strong, but slower.",
    draw: function(x, y) {
      // Truck: larger rectangle, bigger wheels
      fill(this.color);
      rect(x, y, this.size, this.size * 0.5, 8);
      fill(30);
      ellipse(x - this.size / 3, y + this.size * 0.3, this.size / 2.5);
      ellipse(x + this.size / 3, y + this.size * 0.3, this.size / 2.5);
    }
  },
  suv: {
    name: "SUV",
    color: "gray",
    size: 50,
    maxSpeed: 6,
    fuelCapacity: 110,
    fuelConsumption: 0.22,
    acceleration: 0.26,
    strength: 1.5,
    description: "Good all-rounder for rough terrain.",
    draw: function(x, y) {
      // SUV: boxy body, medium wheels
      fill(this.color);
      rect(x, y, this.size, this.size * 0.55, 7);
      fill(30);
      ellipse(x - this.size / 3, y + this.size * 0.28, this.size / 3);
      ellipse(x + this.size / 3, y + this.size * 0.28, this.size / 3);
    }
  },
  sport: {
    name: "Sports Car",
    color: "red",
    size: 35,
    maxSpeed: 20,
    fuelCapacity: 80,
    fuelConsumption: 0.32,
    acceleration: 0.45,
    strength: 0.7,
    description: "Fast but fragile and thirsty.",
    draw: function(x, y) {
      // Sports car: low, sleek body, small wheels
      fill(this.color);
      rect(x, y, this.size, this.size * 0.35, 12);
      fill(30);
      ellipse(x - this.size / 3, y + this.size * 0.18, this.size / 4);
      ellipse(x + this.size / 3, y + this.size * 0.18, this.size / 4);
    }
  },
  monster: {
    name: "Monster Truck",
    color: "green",
    size: 170,
    maxSpeed: 6,
    fuelCapacity: 160,
    fuelConsumption: 0.35,
    acceleration: 0.18,
    strength: 3,
    description: "Huge, slow, nearly indestructible.",
    draw: function(x, y) {
      // Monster Truck: pickup body, huge wheels
      fill(this.color);
      // Pickup-style body
      rect(x, y, this.size * 0.7, this.size * 0.22, 8); // main body
      rect(x + this.size * 0.18, y - this.size * 0.09, this.size * 0.25, this.size * 0.13, 6); // cabin
      // Large wheels
      fill(30);
      ellipse(x - this.size * 0.25, y + this.size * 0.18, this.size * 0.32);
      ellipse(x + this.size * 0.25, y + this.size * 0.18, this.size * 0.32);
    }
  }
};


// the cars need to be in seperate files later with custom methods for their design
export default carModels;