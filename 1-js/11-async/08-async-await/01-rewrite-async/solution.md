
Noterne er under koden:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Noter:

1. Funktionen `loadJson` bliver `async`.
2. Alle `.then` indeni erstattes med `await`.
3. Vi kan bruge `return response.json()` i stedet for at vente på det, som dette:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Den ydre kode vil være nødt til at vente med `await` på at det promise løses. I vores tilfælde spiller det ikke en rolle.
4. Fejlen kastet fra `loadJson` håndteres af `.catch`. Vi kan ikke bruge `await loadJson(…)` der, fordi vi ikke er i en `async` funktion.
