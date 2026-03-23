
# Forsinkelse med et promise

Den indbyggede funktion `setTimeout` bruger callbacks. Opret et promise-baseret alternativ.

Funktionen `delay(ms)` bør returnere et promise. Det promise bør indfries efter `ms` millisekunder. Vi kan så tilføje `.then` til det, sådan her:

```js
function delay(ms) {
  // din kode
}

delay(3000).then(() => alert('kører efter 3 sekunder'));
```
