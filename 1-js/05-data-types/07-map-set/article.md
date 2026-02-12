
# Map og Set

Op til nu har vi lært om følgende komplekse datastrukturer:

- Objekter bruges til at gemme samlinger baseret på nøgler.
- Arrays bruges til at gemme ordnede samlinger.

Men det er ikke nødvendigvis nok til komplekse opgaver. Derfor findes `Map` og `Set` også.

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) er en samling af nøgle-baserede dataelementer, ligesom et `Object`. Men den største forskel er, at `Map` tillader nøgler af enhver type.

Metoder og egenskaber er:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- opretter et map.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- gemmer værdien under nøglen.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returnerer værdien for nøglen, `undefined` hvis `key` ikke findes i mappen.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returnerer `true` hvis `key` findes, ellers `false`.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- fjerner elementet (nøgle/værdi-parret) for nøglen.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- fjerner alt fra et map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returnerer det aktuelle antal elementer.

For eksempel:

```js run
let map = new Map();

map.set('1', 'str1');   // en streng nøgle
map.set(1, 'num1');     // en numerisk nøgle
map.set(true, 'bool1'); // en boolesk nøgle

// husker du den almindelige Object? den ville konvertere nøgler til strenge
// Map beholder typen, så disse to er forskellige:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Som vi kan se, i modsætning til objekter, konverteres nøgler ikke til strenge. Enhver type nøgle er mulig.

```smart header="`map[key]` er ikke den rigtige måde at bruge et `Map` på"
Selvom `map[key]` også virker, f.eks. kan vi sætte `map[key] = 2`, behandler det `map` som et almindeligt JavaScript-objekt, så det indebærer alle tilsvarende begrænsninger (kun streng-/symbolnøgler osv.).

Så vi bør bruge `map`-metoderne: `set`, `get` osv.
```

**Map kan også bruge objekter som nøgle.**

For eksempel:

```js run
let john = { name: "John" };

// for hver bruger, lad os gemme deres besøgstælling
let visitsCountMap = new Map();

// john er nøglen for mappen
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

At kunne bruge objekter som nøgler er et af de mest bemærkelsesværdige og vigtige `Map` funktioner - det kan du nemlig ikke i almindelige `Object`. Strenge som nøgler i `Object` er fint, men vi kan ikke bruge et andet `Object` som nøgle i `Object`.

Lad os prøve at gøre det i et almindeligt `Object`:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // Opret et obejkt

visitsCountObj[ben] = 234; // prøv at bruge ben objektet som nøgle
visitsCountObj[john] = 123; // prøv at bruge john objektet som nøgle, ben objektet vil blive erstattet

*!*
// Dette er hvad der rent faktisk skrives!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

Da `visitsCountObj` er et objekt, konverterer det alle `Object` nøgler, såsom `john` og `ben` ovenfor, til samme streng `"[object Object]"`. Det er bestemt ikke, hvad vi ønsker.

```smart header="Hvordan `Map` sammenligner nøgler"
For at teste nøgler for lighed bruger `Map` algoritmen [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Den er omtrent den samme som streng lighed `===`, men forskellen er, at `NaN` betragtes som lig med `NaN`. Så `NaN` kan også bruges som nøgle.

Denne algoritme kan ikke ændres eller tilpasses.
```

````smart header="Sammenkædning af `map.set`"
Hvert `map.set` kald returnerer selve map-objektet, så du kan "kæde" kaldene sammen:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Iteration over Map

For at gennemløbe et `map`, findes der 3 metoder:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- returnerer en iterable for nøgler,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- returnerer en iterable for værdier,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- returnerer en iterable for entries `[key, value]`, den bruges som standard i `for..of`.

For eksempel:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterer over keys (grøntsager)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterer over values (mængder)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterer over [nøgle, værdi] par
for (let entry of recipeMap) { // det samme somrecipeMap.entries()
  alert(entry); // cucumber,500 (og så videre)
}
```

```smart header="Indsættelsesrækkefølgen bruges"
Iteration sker i samme rækkefølge som værdierne blev indsat. `Map` bevarer denne rækkefølge, i modsætning til et almindeligt `Object`.
```

Derudover har `Map` en indbygget `forEach` metode, ligesom `Array`:

```js
// kører funktionen for hver (nøgle, værdi) par
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map fra Object

Når et `Map` oprettes kan vi videregive et array (eller noget andet itererbart) med nøgle/værdi-par for initialisering, som dette:

```js run
// array af [nøgle, værdi] par
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Hvis vi har et almindeligt objekt, og vi gerne vil oprette et `Map` fra det, kan vi bruge den indbyggede metode [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), som returnerer et array af nøgle/værdi-par for et objekt præcis i det format.

Så vi kan oprette et map fra et objekt som dette:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Her returnerer `Object.entries` arrayet af nøgle/værdi-par: `[ ["name","John"], ["age", 30] ]`. Det er præcis, hvad `Map` har brug for.


## Object.fromEntries: Object fra Map

Vi har lige set, hvordan man opretter `Map` fra et almindeligt objekt med `Object.entries(obj)`.

Der findes en metode `Object.fromEntries`, som gør det modsatte: givet et array af `[nøgle, værdi]` par, opretter den et objekt ud fra dem:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Vi kan bruge `Object.fromEntries` til at få et almindeligt objekt fra `Map`.

F.eks. gemmer vi data i en `Map`, men vi skal videregive det til tredjepartskode, der forventer et almindeligt objekt.

Her er hvordan:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // make a plain object (*)
*/!*

// Færdig!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Et kald til `map.entries()` returnerer et itererbart objekt af nøgle/værdi-par, præcis i det rigtige format til `Object.fromEntries`.

Vi kunne også gøre linje `(*)` kortere:
```js
let obj = Object.fromEntries(map); // udelad .entries()
```

Det er det samme, fordi `Object.fromEntries` forventer et itererbart objekt som argument. Ikke nødvendigvis et array. Og standarditeration for `map` returnerer de samme nøgle/værdi-par som `map.entries()`. Så vi får et almindeligt objekt med samme nøgle/værdier som `map`.

## Set

Et [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) er en speciel type samling - "mængde af værdier" (uden nøgler), hvor hver værdi kun kan forekomme én gang.

Dens hovedmetoder er:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- opretter sættet, og hvis et `iterable` objekt er angivet (normalt et array), kopierer værdierne fra det ind i sættet.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- tilføjer en værdi, returnerer sættet selv.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- fjerner værdien, returnerer `true` hvis `value` eksisterede på tidspunktet for kaldet, ellers `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returnerer `true` hvis værdien findes i sættet, ellers `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- fjerner alt fra sættet.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- er antallet af elementer.

Hovedfunktionen er, at gentagne kald til `set.add(value)` med samme værdi ikke gør noget. Det er grunden til, at hver værdi kun optræder én gang i et `Set`.

For eksempel har vi besøgende, og vi vil gerne huske alle. Men gentagne besøg skal ikke føre til dubletter. En besøgende skal kun "tælles" én gang.

`Set` er lige det rigtige til det:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// besøg, nogle brugere kommer flere gange
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set tæller kun unikke værdier
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (derefter Pete og Mary)
}
```

Alternativet til `Set` kunne være et array af brugere, og koden til at tjekke for dubletter ved hver indsættelse ved hjælp af [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Men ydeevnen ville være meget dårligere, fordi denne metode gennemgår hele arrayet og tjekker hvert element. `Set` er meget bedre optimeret internt til unikhedstjek. 

## Iteration over Set

Vi kan gennemløbe et sæt enten med `for..of` eller ved at bruge `forEach`:

```js run
let set = new Set(["appelsiner", "æbler", "bananer"]);

for (let value of set) alert(value);

// det samme med forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Bemærk en sjov ting. Callback-funktionen, der gives til `forEach`, har 3 argumenter: en `value`, derefter *den samme værdi* `valueAgain`, og så målobjektet. Faktisk optræder den samme værdi to gange i argumenterne.

Det er for kompatibilitet med `Map`, hvor callback-funktionen, der gives til `forEach`, har tre argumenter. Det ser lidt mærkeligt ud, helt sikkert. Men det kan hjælpe med at erstatte `Map` med `Set` i visse tilfælde nemt, og omvendt.

De samme metoder, som `Map` har til iteratorer, understøttes også:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- returnerer et iterable objekt for værdier,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- det samme som `set.keys()`, for kompatibilitet med `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- returnerer et iterable objekt for entries `[value, value]`, findes for kompatibilitet med `Map`.

## Opsummering

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- er en samling værdier baseret på nøgler.

Metoder og egenskaber:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- opretter et Map, med valgfrit `iterable` (f.eks. array) af `[key,value]` par til initialisering.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- gemmer værdien under nøglen, returnerer kortet selv.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returnerer værdien for nøglen, `undefined` hvis `key` ikke findes i kortet.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returnerer `true` hvis `key` findes, ellers `false`.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- fjerner elementet med nøglen, returnerer `true` hvis `key` fandtes på tidspunktet for kaldet, ellers `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- fjerner alt fra kortet.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returnerer det aktuelle antal elementer.

Forskellene fra et almindeligt `Object`:

- Enhver nøgle, objekter kan være nøgler.
- Yderligere praktiske metoder, `size`-egenskaben.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- er en samling unikke værdier.

Metoder og egenskaber:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- opretter et Set, med valgfrit `iterable` (f.eks. array) af værdier til initialisering.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- tilføjer en værdi (gør ingenting hvis `value` allerede findes), returnerer sættet selv.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- fjerner værdien, returnerer `true` hvis `value` fandtes på tidspunktet for kaldet, ellers `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returnerer `true` hvis værdien findes i sættet, ellers `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- fjerner alt fra sættet.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- er antallet af elementer.

Iteration over `Map` og `Set` er altid i indsættelsesrækkefølge, så vi kan ikke sige, at disse samlinger er uordnede, men vi kan ikke omarrangere elementer eller direkte få et element efter dets nummer.
