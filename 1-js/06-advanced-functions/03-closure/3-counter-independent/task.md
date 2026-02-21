importance: 5

---

# Er tællere uafhængige?

Her opretter vi to tællere: `counter` og `counter2` ved brug af samme `makeCounter` funktion.

Er de uafhængige? Hvad vil den anden tæller vise? `0,1` eller `2,3` eller noget andet?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

