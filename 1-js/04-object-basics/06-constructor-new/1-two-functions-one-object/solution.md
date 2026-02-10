Ja, det er muligt.

Hvis en funktion returnerer et objekt, så returnerer `new` det i stedet for `this`.

Så de kan for eksempel returnere det samme eksternt definerede objekt `obj`:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
