# Promisificering

"Promisificering" er et langt ord for en simpel transformation. Det er konverteringen af en function, der accepterer en callback, til en function, der returnerer et promise.

Sådanne transformationer er ofte nødvendige i det virkelige liv, da mange funktioner og biblioteker er callback-baserede. Men promises er mere praktiske, så det giver mening at promisificere dem.

For bedre at forstå det så lad os se et ekssempel.

Her er for eksempel `loadScript(src, callback)` fra kapitlet <info:callbacks>.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// brug:
// loadScript('path/script.js', (err, script) => {...})
```

Funktionen henter et script der gives med `src`, og så kalder den `callback(err)` i tilfælde af en fejl, eller `callback(null, script)` i tilfælde af succesfuld indlæsning. Det er en almindelig overenskomst for brug af callbacks, som vi har set før.

Lad os promisificere det.

Vi vil lave en ny function `loadScriptPromise(src)`, som gør det samme (henter scriptet), men returnerer et promise i stedet for at bruge callbacks.

Med andre ord, vi sender kun `src` (ingen `callback`) og får et promise tilbage, som løser sig med `script` når indlæsningen er successful, og afvises med fejlen ellers.

Her er det:
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// brug:
// loadScriptPromise('path/script.js').then(...)
```

Som vi kan se er den nye function en wrapper omkring den originale `loadScript` function. Den kalder den og giver sin egen callback, som oversætter til et promise med `resolve/reject`.

Nu passer `loadScriptPromise` ind i promise-baseret kode. Hvis vi kan lide promises bedre end callbacks (og senere vil vi se flere grunde for det), så kan vi bruge den i stedet.

I praksis vil vi måske have brug for at promisificere flere funktioner, så det giver mening at bruge en hjælper funktion.

Vi vil kalde den `promisify(f)`: den accepterer en function `f` der skal promisificeres og returnerer en wrapper function.

```js
function promisify(f) {
  return function (...args) { // returner en wrapper-funktion (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // vores brugerdefinerede callback til f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // tilføj vores brugerdefinerede callback til slutningen af f's argumenter

      f.call(this, ...args); // kald den originale funktion
    });
  };
}

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Koden kan se lidt kompleks ud, men det er grundlæggende det samme, som vi skrev ovenfor, da vi promisificerede `loadScript` funktionen.

Et kald til `promisify(f)` returnerer en wrapper omkring `f` `(*)`. Den wrapper returnerer et promise og videreformidler kaldet til den originale `f`, som sporer resultatet i den brugerdefinerede callback `(**)`.

Her regner `promisify` med at den originale funktion forventer en callback med præcis to argumenter `(err, result)`. Det er det, vi oftest støder på. Så vores brugerdefinerede callback er i præcis det rigtige format, og `promisify` virker godt for sådanne tilfælde.

Men hvad hvis den originale `f` forventer en callback med flere argumenter `callback(err, res1, res2, ...)`?

Vi kan forbedre vores hjælper. Lad os lave en mere avanceret version af `promisify`.

- Når den kaldes som `promisify(f)` bør den fungere ligesom versionen ovenfor.
- Når den kaldes som `promisify(f, true)`, bør den returnere det promise, der løser sig med arrayet af callback-resultater. Det er netop til brug for callbacks med mange argumenter.

```js
// promisify(f, true) for at få et array af resultater
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // vores brugerdefinrerede callback for f
        if (err) {
          reject(err);
        } else {
          // resolve med array af alle callback-resultater hvis manyArgs er specificeret, 
          // ellers resolve med det første resultat
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

Som du kan se er det stort set det samme som ovenfor, men `resolve` kaldes med kun ét eller alle argumenter afhængigt af om `manyArgs` er sand.

For mere eksotiske callback-formater, som dem uden `err` overhovedet: `callback(result)`, kan vi promisificere sådanne funktioner manuelt uden at bruge hjælperen.

Der er også moduler med lidt mere fleksible promisification-funktioner, f.eks. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). I Node.js er der en indbygget `util.promisify`-funktion til det.

```smart
Promisificering er at god tilgang, særligt hvis du bruger `async/await` (som vi viser senere i kapitlet <info:async-await>), men ikke ment som en total erstatning for callbacks.

Husk, at et promise kun kan have ét resultat, mens en callback teknisk set kan kaldes mange gange.

Så promisificering er kun ment til funktioner, der kalder callback'en én gang. Yderligere kald vil blive ignoreret.
```
