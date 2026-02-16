For at få antallet af sekunder, kan vi generere en datoen med den nuværende dag og tid 00:00:00, så kan vi subtrahere det fra "nu".

Differensen er antallet af millisekunder fra starten af dagen, der skal divideres med 1000 for at få sekunder:

```js run
function getSecondsToday() {
  let now = new Date();

  // opret et objekt med den nuværende dag/måned/år
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // forskel i millisekunder
  return Math.round(diff / 1000); // omdan til sekunder
}

alert( getSecondsToday() );
```

En anden løsning ville være at få timer/minutes/seconds og konvertere dem til sekunder:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
