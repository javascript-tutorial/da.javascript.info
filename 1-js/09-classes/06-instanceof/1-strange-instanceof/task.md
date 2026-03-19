importance: 5

---

# Underlig instanceof

Se på koden nedenfor. Hvorfor returnerer `instanceof` værdien `true`? Vi kan tydelig se, at `a` ikke er oprettet af `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
