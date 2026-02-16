Ideen er simpel: at trække det givne antal af dage fra `date`:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...men funktionen skal ikke ændre den givne `date`. Det er en vigtig ting, fordi den ydre kode, der giver os datoen, ikke forventer, at den ændres.

For at implementere det skal vi klone datoen, sådan her:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
