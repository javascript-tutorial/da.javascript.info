```js run demo
function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // fjern hvis uden for intervallet
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // fjernede alle tal undtaget dem fra 1 til 4

alert( arr ); // [3, 1]
```
