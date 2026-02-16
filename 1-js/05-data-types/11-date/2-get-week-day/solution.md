Metoden `date.getDay()` returnerer nummeret af dagen, der starter med søndag.

Lad os lave et array af dage, så vi kan få den rigtige dagnavn efter nummeret:

```js run demo
function getWeekDay(date) {
  let days = ['Søn', 'Man', 'Tir', 'Ons', 'Tors', 'Fre', 'Lør'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3. januar 2014
alert( getWeekDay(date) ); // Fre
```
