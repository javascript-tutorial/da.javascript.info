Lad os først oprette HTML/CSS.

Hvert komponent af tiden ville se rigtig godt ud i sin egen `<span>`:

```html
<div id="clock">
  <span class="hour">tt</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Vi har også brug for CSS til at farve dem.

Funktionen `update` vil genopfriske uret, og vil blive kaldt af `setInterval` hver sekundd. Den skal hente det aktuelle tidspunkt og opdatere indholdet af de tre `<span>` elementer:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

I linjen mærket `(*)` tjekker vi den aktuelle dato. Kaldet til `setInterval` er ikke troværdigt nok: de kan ske med forsinkelser.

Funktionen til at håndtere ur-funktioner:

```js
let timerId;

function clockStart() { // kør klokken
  if (!timerId) { // sæt kun et nyt interval hvis uret ikke er startet
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

Bemærk at kaldet til `update()` ikke kun er planlagt i `clockStart()`, men også kørt umiddelbart i linjen `(*)`. Ellers ville brugeren have ventet til den første udførelse af `setInterval`. Og uret ville være tomt indtil da.

Det er også vigtigt kun at sætte et nyt interval i `clockStart()` når uret *ikke* kører. Hvis ikke, ville klik på start-knappen flere gange sætte flere samtidige intervaller. Vi ville samtidig kun beholde `timerID` for det sidste interval, og miste referencer til alle andre. På denne måde ville vi ikke kunne stoppe uret igen! Bemærk at vi skal rydde `timerID` når uret er stopped i linjen `(**)`, så det kan startes igen ved at køre `clockStart()`.
