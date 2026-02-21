importance: 5

---
# Funktion i if

Se på følgende kode. Hvad vil resultatet være af kaldet på den sidste linje?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
