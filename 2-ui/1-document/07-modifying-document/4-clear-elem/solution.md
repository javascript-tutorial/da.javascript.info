
Lad os først se hvordan man *ikke* skal gøre det:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

Dette vil ikke virke, fordi kaldet til `remove()` flytter samlingen `elem.childNodes`. Efter fjernelse af et element flyttes de resterende nedad. Men `i` øges alligevel, så nogle elementer vil blive sprunget over.

Løkken `for..of` gør det samme.

Den rigtige variant kunne være:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

Der er også en enklere måde at gøre det samme på:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
