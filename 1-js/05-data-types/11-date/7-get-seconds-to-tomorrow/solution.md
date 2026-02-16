For at få antallet af millisekunder til morgen, kan vi fra "morgens 00:00:00" subtrahere den nuværende dags tidsstempel.

Først genererer vi den "morgens", og så gør vi det:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // imorgens tidsstempel
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // forskel i millisekunder
  return Math.round(diff / 1000); // konverter til sekunder
}
```

Alternative løsning:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Bemærk, at mange lande har sommer tid (DST), så der kan være dage med 23 eller 25 timer. Vi kan ønske at behandle sådanne dage separat.
