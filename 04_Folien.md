# Functions & For Loops

---
### Recap:

In der letzten Übung haben wir viel über Variablen und Datentypen gelernt.

---
### Funktionen

- Eine Funktion ist ein **benannter Codeblock**, den man **mehrfach ausführen** kann.
- Hilft dabei **Code zu strukturieren** und **wiederzuverwenden**.

```js
function greet() {
  console.log("Hallo Welt!");
}
```

---
### Syntax einer Funktion

Eine JavaScript Funktion hat folgenden grundlegenden Aufbau:
- Definition mit dem Keyword `function` 
- Name der Funktion
- Runde klammern `()`
	- Diese **können** Parameter enthalten, die beim Aufruf der Funktion angegeben werden müssen
- Geschweifte Klammern `{}`, welche den Code enthalten, der beim Aufruf der Funktion ausgeführt werden soll 
---
### Funktionen aufrufen - () Operator

- Eine Funktion wird nur ausgeführt, wenn sie **aufgerufen** wird
- Eine Funktion wird über den Operator `()` aufgerufen
 ```js
greet(); // Gibt "Hallo Welt!" aus
```

---
### Funktionen aufrufen - ohne ()

- Wird eine Funktion ohne die runden Klammern `()` aufgerufen wird kein Wert ausgegeben, sondern die Funktion selbst
```js
function greet() {
  console.log("Hallo Welt!");
}
greet; //gibt aus: function greet() {console.log("Hallo Welt!");}
```

---
### Return

- Funktionen können Werte **zurückgeben**
```js
function add(a, b) {
  return a + b;
}
let summe = add(3, 5); // summe ist 8
```
---
### Warum verwenden wir Funktionen?

- Wiederverwendbarkeit  
- Besser lesbarer Code
- Weniger Wiederholungen

---
### Funktionen in p5.js

- In p5.js helfen uns Funktionen unter anderem beim Zeichnen
```js
function setup() {
  createCanvas(400, 400);
  drawTwoCircle(200, 200, 50);
}

function drawTwoCircle(x, y, r) {
  circle(x, y, r);
  circle(x + 50, y, r)
}

```

---
### Exkurs: Hoisting 

Warum konnten wir gerade unsere Funktion nutzen, bevor wir sie deklariert haben?
- Wenn wir unsere Funktion deklarieren wird sie beim Start des Programms "vorab registriert", auch "hoisting" genannt.
- Hoisting passiert in JavaScript automatisch
- Alle Deklarationen werden an den höchsten Punkt des aktuellen Scopes "gehoben"
- Für weiterführende [Hinweise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_hoisting)

---
### Exkurs Hoisting

- Merksatz: "Function declarations are hoisted. Function expressions are not."
- Folgender Code funktioniert nicht:
```js
// Das hier führt zu einem Fehler:
setup();

const setup = function() {
  zeichneLinie(10, 10, 100, 100, 3);
};

const zeichneLinie = function() {
//Code
};

```

---
## For Loops (Schleifen)
---
### draw() ist ein Loop!

- In p5.js wird die Funktion `draw()` immer wieder aufgerufen.
- Das bedeutet: Der Code läuft **ca. 60x pro Sekunde** ab. 

```js
function draw() {
  ellipse(100, 100, 50); // wird immer wieder gezeichnet
}
```
---
### Was ist ein for-Loop?

- Ein `for`-Loop wiederholt Code **mehrmals**.
- Aufbau:
```js
for (let i = 0; i < 5; i++) {
  // wird 5x ausgeführt
}
```
---
### Was ist eine for-Loop?

Dieser Code:
```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```
Gibt folgenden Output:
```js
0
1
2
3
4
```
---
### for-Loops Syntax

```js
for (expression 1; expression 2; expression 3) {  
  // Codeblock, der ausgeführt werden soll
}
```
Expression 1: Wird einmal vor dem Codeblock ausgeführt

Expression 2: Definiert eine Bedingung (Solange Bedingung erfüllt -> Codeblock wird ausgeführt)

Expression 3: Wird jedes mal nach Ausführung des Codeblocks ausgeführt

---
### for-Loop Syntax

```js
for (let i = 0; i < 5; i++) {
  // 1. Start: let i = 0 
  // 2. Bedingung: i < 5 (solange i < 5)
  // 3. Schritt: i++
}
```
Ablauf: 
Start → Bedingung prüfen → Codeblock ausführen→ `i` erhöhen → Bedingung prüfen

-> 2. Bedingung = true -> Wiederholung

-> 2. Bedingung = false -> Abbruch

---
### for-Loop Syntax

>Hinweis: Wird `expression 2` weggelassen, muss ein `break` in den Loop geschrieben werden. 
>Andernfalls wird der Loop niemals stoppen.
>Das kann dazu führen, dass der Browser crasht

---
### for-Loop Beispiel 

```js
function setup() {
  createCanvas(400, 200);
  
  for (let x = 50; x <= 350; x += 60) {
  	ellipse(x, 100, 40);
  }
}
```
- Erstellt Kreise mit gleichem Abstand
---
## Nested for-Loop
### Was sind "nested loops"?

- Eine Schleife **innerhalb** einer anderen Schleife
- Besonders nützlich für:
  - 2D-Gitter (z. B. Raster, Pixel, Felder)
  - Wiederholte Strukturen mit mehreren Ebenen

---
### Syntax:

```js
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    // Code hier
  }
}
```
---
### Nested for-Loop Beispiel:

```js
function setup() {
  createCanvas(400, 400);
  background(255);

  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      rect(x, y, 30, 30);
    }
  }
}
```
- 2 verschachtelte Schleifen für x- und y-Achse
- Der Abstand zwischen den Rechtecken wird durch `expression 3` festgelegt 
- Für eine einzelne "Iteration" des "äußeren" Loops läuft der "innere" Loop bis die `expression 2` = false