# Dynamisk import

Den type export og import udtryk som vi talte om i sidste artikel kaldes "statiske" - syntaksen er meget simpel og striks.

For det første kan vi ikke dynamisk generere nogen parametre for `import`.

Stien til modulet skal være en simpel streng, kan ikke være et funktionskald. Dette vil ikke virke:

```js
import ... from *!*getModuleName()*/!*; // Fejl, kun "string" er tilladt
```

For det andet kan vi ikke importere betinget eller ved kørselstidspunktet. Det vil heller ikke virke:

```js
if(...) {
  import ...; // Fejl, ikke tilladt!
}

{
  import ...; // Fejl, vi kan ikke putte import i en blok
}
```

Dette er fordi `import`/`export` har til formål at fungere som rygraden i kodestrukturen. Det er en god ting, da kodestrukturen dermed kan analyseres, moduler kan samles og bundles til én fil af specielle værktøjer, og ubrugte eksporteringer kan fjernes (kaldet "tree-shaking"). Det er kun muligt fordi strukturen af imports/exports er simpel og fast.

Men hvordan kan vi importere et modul dynamisk, på anmodning?

## Udtrykket import()

Udtrykket `import(module)` henter et modul og returnerer en promise, der løser sig til et module object, der indeholder alle dets exports. Det kan kaldes fra ethvert sted i koden.

Vi kan bruge det dynamisk hvor som helst i koden, for eksempel:

```js
let modulePath = prompt("Hvilket modul vil du indlæse?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading fejl, e.g. hvis modulet ikke findes>)
```

Eller vi kunne bruge `let module = await import(modulePath)` hvis det sker inde i en async function.

Hvis vi f.eks. har følgende modul `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hej`);
}

export function bye() {
  alert(`Farvel`);
}
```

... så kan de importeres dynamisk sådan her:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Eller hvis `say.js` har en default export:

```js
// 📁 say.js
export default function() {
  alert("Modulet er hentet (export default)!");
}
```

...Så, for at tilgå det, kan vi bruge `default` egenskaben på modulet:

```js
let obj = await import('./say.js');
let say = obj.default;
// eller med én linje: let {default: say} = await import('./say.js');

say();
```

Her er det fulde eksempel, der bruger både named og default exports:

[codetabs src="say" current="index.html"]

```smart
Dynamiske imports fungerer i regulære scripts, de kræver ikke `script type="module"`.
```

```smart
Selvom `import()` ser ud til at være et funktionskald, er det en speciel syntaks der bare tilfældigvis bruger parenteser (ligesom `super()`).

Så vi kan ikke kopiere `import` til en variabel eller bruge `call/apply` med det. Det er ikke en function.
```
