```js run demo
function filterRange(arr, a, b) {
  // tilføjer krøllede parenteser omkring udtrykket for bedre læsbarhed
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (matchende værdier)

alert( arr ); // 5,3,8,1 (ikke ændret)
```
