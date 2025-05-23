#  Hill Climb Game – Development Log

##  How to Launch

1. Download and install the **Live Server** extension in **VS Code**.
2. Open the project folder in VS Code.
3. Right-click on `index.html` and choose **"Open with Live Server"**.

---

##  Controls

- **Arrow Keys**:  
  - **Left/Right**: Move car left/right (or select car in menu)
  - **Up/Down**: Change color in menu (and, in future, level selection)
  - **Enter/Space**: Confirm selection or start game
- **Mouse**:  
  - Click on car, color, or start button in menu
  - Click on pedals (GAS/BRAKE/JUMP) in game for touch controls

---

##  Current Progress

###  Working Features

- **Color Selection**  
  - Selectable via menu (mouse or arrow keys)
- **Vehicle System**  
  - Multiple car models with different stats and designs
  - Car selection via menu (mouse or arrow keys)
- **Start Button**  
  - Initializes the game correctly (mouse or Enter/Space)
- **Pedals**  
  - Gas, brake, and jump controls functional (mouse/touch)
- **Coins**  
  - Collectable during gameplay
- **Fuel System**  
  - Game refreshes when fuel runs out and car stops
- **Finish Line & Level Progression**  
  - When distance >= 10,000, a popup appears and the game reloads for a new random level
- **Terrain**  
  - Procedural terrain generation with random color schemes per level
  - Terrain, boxes, coins, and refuel boxes are generated deterministically per level
- **HUD**  
  - Shows health, fuel, coins, and distance

###  Menu Navigation

- **Arrow keys**:  
  - Left/Right: Select car
  - Up/Down: Select color (when color menu is focused)
  - Enter/Space: Move between car/color selection, or start game

###  Planned / TODO

- **Level Selector**  
  - Level selection logic and UI in menu (currently not implemented)
- **Advanced Terrain Generation**  
  - More random and challenging levels
- **Box Collision Damage**  
  - Different cars take different damage (SUV/Monster Truck less than Sportscar)
- **Car Physics Improvements**  
  - Slope handling, rotation, and suspension
- **Save/Load Progress**  
  - Save coins and progress between sessions

---

##  Known Issues

### Car

- Jittering on slopes
- Not rotating correctly on jumps/landings
- No visual feedback for damage

### Terrain

- Sometimes terrain is too steep or flat
- Boxes and coins may overlap in rare cases

### Menu

- Level selector not yet implemented
- No visual focus indicator for menu navigation

---

##  Technical Notes

- **Random Terrain Texture**:  
  Each level uses a random terrain color scheme, selected at the start of the level.
- **Game Loop**:  
  - If fuel runs out and car stops, a popup appears and the game reloads.
  - If finish line (distance >= 10,000) is reached, a popup appears and the game reloads for a new random level.
- **Local Storage**:  
  - Last and best distances are saved between runs.
  - Progress saving/loading for car position and coins is planned.

---

> ⚠️ Please add specifics to "Known Issues" as you encounter bugs or odd behavior.


