# Ydre hjørner

Ydre hjørner er det, vi får fra [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Koordinaterne for det øverste venstre hjørne `answer1` og det nederste højre hjørne `answer2`:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Indre øverste venstre hjørne

Det adskiller sig fra det ydre hjørne ved bredden af kanten. En pålidelig måde at få afstanden er `clientLeft/clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Nederste højre indre hjørne

I dette tilfælde skal vi trække bredden af kanten fra de ydre koordinater.

Vi kunne bruge CSS-måden:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

En alternativ måde ville være at tilføje `clientWidth/clientHeight` til koordinaterne for det øverste venstre hjørne.

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
