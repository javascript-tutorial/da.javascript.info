
Roden til problemet er, at `Promise.all` umiddelbart afviser, når en af dens promises afviser, men den gør intet for at annullere de andre promises.

I vores tilfælde fejler den anden forespørgsel, så `Promise.all` afviser, og `try...catch` blokken fanger denne fejl. Mens de andre promises ikke er påvirket - de fortsætter uafhængigt deres eksekvering. I vores tilfælde kaster den tredje forespørgsel en fejl selv efter et stykke tid. Og den fejl bliver aldrig fanget, vi kan se den i konsollen.

Problemet er især farligt i server-side miljøer, såsom Node.js, hvor en ikke-fanget fejl kan forårsage, at processen går ned.

Hvordan fikser vi det?

En idéel løsning ville være at annullere alle uafsluttede forespørgsler, når en af dem fejler. På denne måde undgår vi eventuelle fejl.

Men den dårlige nyheder er, at servicekald (såsom `database.query`) ofte er implementeret af en 3rd-parts bibliotek, som ikke understøtter annullering. Så der er ingen måde at annullere et kald.

Som et alternativ kan vi skrive vores egen wrapper omkring `Promise.all` som tilføjer en custom `then/catch` handler til hver promise for at spore dem: resultaterne samles og, hvis en fejl opstår, ignoreres alle efterfølgende promises.

```js
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resultsCount = 0;
    let hasError = false; // vi sætter den til true ved første fejl vi møder

    promises.forEach((promise, index) => {
      promise
        .then(result => {
          if (hasError) return; // ignorer promise hvis den allerede er fejlet
          results[index] = result;
          resultsCount++;
          if (resultsCount === promises.length) {
            resolve(results); // når alle resultater er klar - succes
          }
        })
        .catch(error => {
          if (hasError) return; // ignorer promise hvis den allerede er fejlet
          hasError = true; // ups, fejl!
          reject(error); // fejl med reject
        });
    });
  });
}
```

Denne tilgang har sine egne udfordringer - det er ofte uønsket at kalde `disconnect()` når der stadig er forespørgsler i processen.

Det kan være vigtigt at alle forespørgsler gennemføres, især hvis nogle af dem indeholder vigtige opdateringer.

Så vi bør vente indtil alle promise er afsluttet, før vi går videre med eksekveringen og til sidst frakobler.

Her er en anden implementering. Den opfører sig i stil med `Promise.all` - den resolver også ved den første fejl, men venter indtil alle promise er afsluttet.

```js
function customPromiseAllWait(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let settledCount = 0;
    let firstError = null;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
        })
        .catch(error => {
          if (firstError === null) {
            firstError = error;
          }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            if (firstError !== null) {
              reject(firstError);
            } else {
              resolve(results);
            }
          }
        });
    });
  });
}
```

Nu vil `await customPromiseAllWait(...)` tilbageholde udførelsen indtil alle forespørgsler er behandlet. Hvis der opstår en fejl, vil den blive fanget i `try...catch` blokken, og vi kan være sikre på, at alle forespørgsler er afsluttet, før vi går videre.

Dette er en mere pålidelig tilgang, da den garanterer et forudsigeligt eksekveringsflow.

Til sidst, hvis vi vil behandle alle fejl, kan vi bruge enten `Promise.allSettled` eller skrive en wrapper omkring for at samle alle fejl i et enkelt [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) objekt og afvise med det.

```js
// vent på at alle promise er afsluttet
// returner resultater hvis ingen fejl
// kast AggregateError med alle fejl hvis nogen
function allOrAggregateError(promises) {
  return Promise.allSettled(promises).then(results => {
    const errors = [];
    const values = [];

    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        values[i] = res.value;
      } else {
        errors.push(res.reason);
      }
    });

    if (errors.length > 0) {
      throw new AggregateError(errors, 'En eller flere promises fejlede');
    }

    return values;
  });
}
```
