
For at gemme en dato, kan vi bruge `WeakMap`:

```js
let messages = [
  {text: "Hej", from: "John"},
  {text: "Hvordan går det?", from: "John"},
  {text: "Vi ses snart", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Date objektet vil vi studere senere
```
