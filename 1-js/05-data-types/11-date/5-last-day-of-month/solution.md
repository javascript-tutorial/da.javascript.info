Lad os oprette en datoen med næste måned, men overfør 0 som dagen:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Normalt starter datoen fra 1, men vi kan overføre enhver tal, datoen vil autoadjust sig selv. Så når vi overfører 0, betyder det "en dag før den første dag i måned", i anden ord: "den sidste dag i den forrige måned".
