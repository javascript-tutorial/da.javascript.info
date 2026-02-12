Vi kan bruge `slice()` til at lave en kopi og køre sorteringen på den:

```js run
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

*!*
let sorted = copySorted(arr);
*/!*

alert( sorted );
alert( arr );
```

P.S: Der findes en metode der hedder [toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted), som laver en sorteret kopi af et array uden at ændre det originale array. Den er en del af den nye ECMAScript-standard og er tilgængelig i moderne JavaScript-miljøer.
