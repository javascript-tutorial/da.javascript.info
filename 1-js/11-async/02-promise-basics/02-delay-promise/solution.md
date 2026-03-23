```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('kører efter 3 sekunder'));
```

Bemærk at i denne opgave kaldes `resolve` uden argumenter. Vi returnerer ikke nogen værdi fra `delay`, men sikrer kun forsinkelsen.
