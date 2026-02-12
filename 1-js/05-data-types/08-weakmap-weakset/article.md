
# WeakMap og WeakSet

Som vi ved fra kapitlet <info:garbage-collection>, holder JavaScript-motoren en værdi i hukommelsen, så længe den er "tilgængelig" og potentielt kan bruges.

For eksempel:

```js
let john = { name: "John" };

// objektet kan tilgås, john er referencen til det

// overskriv referencen
john = null;

*!*
// objektet vil blive fjernet fra hukommelsen
*/!*
```

Normalt er egenskaber af et objekt eller elementer af et array eller andre datastrukturer tilgængelige og holdes i hukommelsen, så længe den datastruktur er i hukommelsen.

For eksempel, hvis vi putter et objekt i et array, så længe arrayet er i live, vil objektet også være i live, selvom der ikke er andre referencer til det.

Som dette:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // overskriv referencen

*!*
// objektet, der tidligere blev refereret til af john, er gemt inde i arrayet
// derfor vil det ikke blive fjernet af garbage-collectoren
// vi kan få det som array[0]
*/!*
```

På samme måde, hvis vi bruger et objekt som nøgle i et almindeligt `Map`, så længe `Map` eksisterer, eksisterer det objekt også. Det optager hukommelse og kan ikke blive fjernet af garbage-collectoren.

For eksempel:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overskriv referencen

*!*
// john er gemt inde i map'et,
// vi kan få det ved at bruge map.keys()
*/!*
```

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) er fundamentalt anderledes i den henseende. Det forhindrer ikke garbage-collecting af nøgleobjekter.

Lad os se, hvad det betyder på eksempler.

## WeakMap

Den første forskel mellem [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) og [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) er, at nøgler skal være objekter, ikke primitive værdier:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // virker fint (objekt nøgle)

*!*
// kan ikke bruge en streng som nøgle
weakMap.set("test", "Whoops"); // Fejl, fordi "test" ikke er et objekt
*/!*
```

Nu, hvis vi bruger et objekt som nøgle i det, og der ikke er andre referencer til det objekt -- vil det automatisk blive fjernet fra hukommelsen (og fra kortet).

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overskriv referencen

// john fjernes fra hukommelsen!
```

Sammenlign det med det almindelige `Map`-eksempel ovenfor. Nu, hvis `john` kun eksisterer som nøglen til `WeakMap` -- vil det automatisk blive slettet fra kortet (og hukommelsen).

`WeakMap` understøtter ikke iteration og metoderne `keys()`, `values()`, `entries()`, så der er ingen måde at få alle nøgler eller værdier fra det.

`WeakMap` har kun følgende metoder:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

Hvorfor den begrænsning? Det er af tekniske grunde. Hvis et objekt har mistet alle andre referencer (som `john` i koden ovenfor), så skal det automatisk blive garbage-collected. Men teknisk set er det ikke præcist specificeret *hvornår oprydningen sker*.

Det er JavaScript-motoren, der beslutter det. Den kan vælge at udføre oprydningen med det samme eller vente og gøre det senere, når flere sletninger sker. Så teknisk set er det aktuelle elementantal i en `WeakMap` ikke kendt. Motoren kan have ryddet op eller ej, eller gjort det delvist. Af den grund understøttes metoder, der får adgang til alle nøgler/værdier, ikke.

OK, men hvor har vi brug for en sådan datastruktur?

## Brugsområde: yderligere data

Hovedområdet for anvendelse af `WeakMap` er en *yderligere datalagring*.

Hvis vi arbejder med et objekt, der "tilhører" en anden kode, måske endda et tredjepartsbibliotek, og gerne vil gemme nogle data, der er knyttet til det, som kun skal eksistere, mens objektet er i live - så er `WeakMap` præcis det, der er brug for.

Vi lægger dataene i en `WeakMap`, bruger objektet som nøgle, og når objektet bliver garbage collected, forsvinder disse data automatisk også.

```js
weakMap.set(john, "secret documents");
// hvis john dør, vil de hemmelige dokumenter automatisk blive ødelagt
```

Lad os se på et eksempel.

For eksempel har vi kode, der holder styr på antallet af besøg for brugere. Oplysningerne gemmes i et map: et brugerobjekt er nøglen, og antallet af besøg er værdien. Når en bruger forlader (dets objekt bliver garbage collected), ønsker vi ikke længere at gemme deres besøgstælling.

Her er et eksempel på en tællefunktion med `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => besøgstæller

// Forøg besøgstælleren
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Og her er en anden del af koden, måske en anden fil, der bruger den:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // tæller hans besøg

// senere forlader john os
john = null;
```

Nu burde `john`-objektet blive garbage collected, men det forbliver i hukommelsen, da det er en nøgle i `visitsCountMap`.

Vi har brug for at rydde op i `visitsCountMap`, når vi fjerner brugere, ellers vil det vokse i hukommelsen på ubestemt tid. En sådan oprydning kan blive en "kedelig opgave" i komplekse arkitekturer.

Vi kan undgå det ved at skifte til `WeakMap` i stedet:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => besøgstæller

// Forøg besøgstælleren
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Nu behøver vi ikke at rydde op i `visitsCountMap`. Når `john`-objektet bliver utilgængeligt, bortset fra som en nøgle i `WeakMap`, fjernes det fra hukommelsen sammen med oplysningerne ved den nøgle fra `WeakMap`.

## Brugsscenarie: caching

Et andet almindeligt eksempel er caching. Vi kan gemme ("cache") resultater fra en funktion, så fremtidige kald med det samme objekt kan genbruge det.

For at opnå det kan vi bruge `Map` (ikke optimalt scenarie):

```js run
// 📁 cache.js
let cache = new Map();

// udregn og husk resultatet
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* beregning af resultatet for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// Nu bruger vi process() i en anden fil:
*/!*

// 📁 main.js
let obj = {/* lad os sige, vi har et objekt */};

let result1 = process(obj); // udregn resultat

// ...senere, fra et andet sted i koden...
let result2 = process(obj); // husket resultat taget fra cache

// ...senere, når objektet ikke længere er nødvendigt:
obj = null;

alert(cache.size); // 1 (Av! Objektet er stadig i cache og optager hukommelse!)
```

For flere kald af `process(obj)` med det samme objekt, udregnes resultatet kun første gang, og derefter hentes det blot fra `cache`. Ulempen er, at vi skal rydde op i `cache`, når objektet ikke længere er nødvendigt.

Hvis vi erstatter `Map` med `WeakMap`, forsvinder dette problem. Det cachede resultat fjernes automatisk fra hukommelsen, når objektet bliver garbage collected.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// udregn og husk resultatet
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* beregning af resultatet for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* et object */};

let result1 = process(obj);
let result2 = process(obj);

// ...senere, når objektet ikke længere er nødvendigt:
obj = null;

// Kan ikke få cache.size, da det er en WeakMap,
// men det er 0 eller vil snart være 0
// Når obj bliver garbage collected, fjernes cachede data også
```

## WeakSet

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) opfører sig på lignende måde:

- Det er lig med `Set`, men vi må kun tilføje objekter til `WeakSet` (ikke primitive værdier).
- Et objekt findes i sættet, så længe det er tilgængeligt fra et andet sted.
- Ligesom `Set` understøtter det [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) og [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete), men ikke `size`, `keys()` og iterationer.

Som "weak" fungerer det også som en ekstra lagerplads. Men ikke til vilkårlige data, snarere til "ja/nej" fakta. Et medlemskab i `WeakSet` kan betyde noget om objektet.

For eksempel kan vi tilføje brugere til `WeakSet` for at holde styr på dem, der har besøgt vores side:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John besøgte os
visitedSet.add(pete); // Så Pete
visitedSet.add(john); // John igen

// visitedSet har nu 2 brugere

// tjek om John besøgte?
alert(visitedSet.has(john)); // true

// tjek om Mary besøgte?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet vil blive ryddet automatisk
```

Den vigtigste begrænsning ved `WeakMap` og `WeakSet` er fraværet af iterationer og manglende mulighed for at få alt det aktuelle indhold. Det kan virke upraktisk, men forhindrer ikke `WeakMap/WeakSet` i at udføre deres hovedopgave – at være en "yderligere" lagerplads for data til objekter, som opbevares/administreres et andet sted.

## Opsummering

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) er en `Map`-lignende samling, der kun tillader objekter som nøgler og fjerner dem sammen med den tilknyttede værdi, når de ikke længere er tilgængelige på anden vis.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) er en `Set`-lignende samling, der kun gemmer objekter og fjerner dem, når de ikke længere er tilgængelige på anden vis.

Deres største fordel er, at de har svage referencer til objekter, så de nemt kan fjernes af garbage collectoren.

Det kommer dog med den ulempe, at de ikke understøtter `clear`, `size`, `keys`, `values`...

`WeakMap` og `WeakSet` bruges som "sekundære" datastrukturer ud over den "primære" objektlagring. Når objektet fjernes fra den primære lagring, hvis det kun findes som nøgle i en `WeakMap` eller i en `WeakSet`, vil det blive ryddet automatisk.
