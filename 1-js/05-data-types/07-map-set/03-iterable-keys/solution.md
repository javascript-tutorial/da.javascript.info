
Det er fordi `map.keys()` returnerer en iterable, men ikke et array.

Vi kan konvertere det til et array ved hjælp af `Array.from`:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
