importance: 5

---

# Counter objekt

Her er et counter objekt oprettet ved hans hjælp af constructor funktionen.

Hvordan vil det fungere? Hvad vil det vise?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

