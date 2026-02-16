For at få tiden fra `date` til nu -- trækker vi den givne dato fra den nuværende.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // forskel i millisekunder

  if (diff < 1000) { // under en sekund
    return 'lige nu';
  }

  let sec = Math.floor(diff / 1000); // konverter forskellen til sekunder

  if (sec < 60) {
    return sec + ' sekunder siden';
  }

  let min = Math.floor(diff / 60000); // konverter forskellen til minutter
  if (min < 60) {
    return min + ' minutter siden';
  }

  // formater dato
  // tilføj foranstående nuller til en-sifret dag/måned/timer/minutes
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // tag de sidste 2 cifre af hvert komponent

  // flet komponenterne sammen til en dato
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "lige nu"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sekunder siden"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 minutter siden"

// Gårsdagens dato, fx 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

Alternative løsning:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatering
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'lige nu';  
  } else if (diffMin < 1) {
    return `${diffSec} sekunder siden`
  } else if (diffHour < 1) {
    return `${diffMin} minutter siden`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
