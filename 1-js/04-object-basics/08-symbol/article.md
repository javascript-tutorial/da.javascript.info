
# Datatypen Symbol

Ifølge specifikationen kan kun to primitive typer bruges som objekt-egenskabsnøgler:

- Typen string (tekststreng), eller
- Typen symbol.

Hvis andre typer bruges, såsom tal, konverteres de automatisk til en tekststreng. Så `obj[1]` er det samme som `obj["1"]`, og `obj[true]` er det samme som `obj["true"]`.

Indtil nu har vi kun brugt tekststregne.

Nu skal vi udforske symboler og se, hvad de kan gøre for os.

## Symboler

Et "symbol" repræsenterer en unik identifikator.

En værdi af denne type kan oprettes ved hjælp af `Symbol()`:

```js
let id = Symbol();
```

Når det oprettes, kan vi give symboler en beskrivelse (også kaldet et symbolnavn), som mest bruges til debugging-formål:

```js
// id er et symbol med beskrivelsen "id"
let id = Symbol("id");
```

Symboler er garanteret unikke. Selv hvis vi opretter mange symboler med præcis samme beskrivelse, er de forskellige værdier. Beskrivelsen er bare en etiket, der ikke påvirker noget.

For eksempel ser vi her to symboler med samme beskrivelse -- de er ikke ens:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Hvis du er bekendt med Ruby eller et andet sprog, der også har en form for "symboler" -- lad dig ikke forvirre. JavaScript-symboler er forskellige.

Kort sagt, et symbol er en "primitiv unik værdi" med en valgfri beskrivelse. Lad os se, hvor vi kan bruge dem.

````warn header="Symboler konverteres ikke automatisk til en streng"
De fleste værdier i JavaScript understøtter implicit konvertering til en streng. For eksempel kan vi `alert` næsten enhver værdi, og det vil fungere. Symboler er specielle. De konverteres ikke automatisk.

For eksempel vil denne `alert` vise en fejl:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Dette er en "sproglig beskyttelse" mod fejl, fordi strenge og symboler er fundamentalt forskellige og ikke utilsigtet bør konverteres til hinanden.

Hvis vi virkelig vil vise et symbol, skal vi eksplicit kalde `.toString()` på det, som her:

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), nu virker det
*/!*
```

Eller få `symbol.description`-egenskaben for kun at vise beskrivelsen:

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "Skjulte" egenskaber


Symboler tillader os at skabe "skjulte" egenskaber på et objekt, som ingen anden del af koden kan tilgå eller overskrive ved et uheld.

For eksempel, hvis vi arbejder med `user` objekter, der tilhører en tredjepartskode. Vi vil gerne tilføje identifikatorer til dem.

Lad os bruge en symbolnøgle til det:

```js run
let user = { // tilhører en anden kode
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // vi kan tilgå dataene ved hjælp af symbolet som nøgle
```

Hvad er fordelen ved at bruge `Symbol("id")` frem for en streng `"id"`?

Da `user` objekter tilhører en anden kodebase, er det usikkert at tilføje felter til dem, da vi måske påvirker foruddefineret adfærd i den anden kodebase. Symboler kan dog ikke tilgås ved et uheld. Tredjepartskoden vil ikke være opmærksom på nyligt definerede symboler, så det er sikkert at tilføje symboler til `user` objekterne.

Forestil dig også, at et andet script ønsker at have sin egen identifikator inde i `user`, til sine egne formål.

Så kan det script oprette sit eget `Symbol("id")`, sådan her:

```js
// ...
let id = Symbol("id");

user[id] = "Deres id værdi";
```

Der vil ikke være nogen konflikt mellem vores og deres identifikatorer, fordi symboler altid er forskellige, selvom de har samme navn.

...Men hvis vi brugte en streng `"id"` i stedet for et symbol til det samme formål, så *ville* der være en konflikt:

```js
let user = { name: "John" };

// Vores script bruger "id" egenskaben
user.id = "Vores id værdi";

// ...Et andet script ønsker også "id" til sine formål...

user.id = "Deres id værdi"
// Boom! overwritten by another script!
```

### Symboler i et objekt-literal

Hvis vi vil bruge et symbol i et objekt-literal `{...}`, skal vi have firkantede parenteser omkring det.

Som dette:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // ikke "id": 123
*/!*
};
```
Dette er fordi vi har brug for værdien fra variablen `id` som nøgle, ikke strengen "id".

### Symboler springes over af for..in

Symboliske egenskaber deltager ikke i `for..in`-løkker.

For eksempel:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (ingen symboler)
*/!*

// direkte adgang via symbolet virker
alert( "Direkte: " + user[id] ); // Direkte: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) ignorerer dem også. Det er en del af det generelle princip om "at skjule symbolske egenskaber". Hvis et andet script eller et bibliotek løber over vores objekt, vil det ikke utilsigtet få adgang til en egenskaber der er symboler.

Modsat så kopierer [Object.assign](mdn:js/Object/assign) både streng- og symbol-egenskaber. Det er ikke en fejl, det er designet sådan. Ideen er, at når vi kloner et objekt eller merger objekter, vil vi normalt have *alle* egenskaber kopieret (inklusive symboler som `id`).:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Der er ikke noget paradoks her. Det er designet sådan. Ideen er, at når vi kloner et objekt eller merger objekter, vil vi normalt have *alle* egenskaber kopieret (inklusive symboler som `id`).

## Globale symboler

Som vi har set, er alle symboler normalt forskellige, selvom de har samme navn. Men nogle gange ønsker vi, at symboler med samme navn skal være de samme entiteter. For eksempel ønsker forskellige dele af vores applikation at få adgang til symbolet `"id"`, som betyder præcis den samme egenskab.

For at opnå dette findes der et *globalt symbolregister*. Vi kan oprette symboler i det og få adgang til dem senere, og det garanterer, at gentagne adgangsforsøg med samme navn returnerer præcis det samme symbol.

For at læse (eller oprette, hvis det ikke findes) et symbol fra registret, brug `Symbol.for(key)`.

Dette kald tjekker det globale register, og hvis der findes et symbol beskrevet som `key`, returnerer det det, ellers opretter det et nyt symbol `Symbol(key)` og gemmer det i registret under den givne `key`.

For eksempel:

```js run
// læs fra det globale register
let id = Symbol.for("id"); // hvis symbolet ikke fandtes, oprettes det

// læs det igen (måske fra en anden del af koden)
let idAgain = Symbol.for("id");

// det samme symbol
alert( id === idAgain ); // true
```

Symboler i registret kaldes *globale symboler*. Hvis vi ønsker et symbol, der er tilgængeligt på tværs af hele applikationen, er det dem, vi skal bruge.

```smart header="Det lyder som Ruby"
I nogle programmeringssprog, som Ruby, er der kun ét symbol pr. navn.

I JavaScript, som vi kan se, gælder det for globale symboler.
```

### Symbol.keyFor

Vi har set, at for globale symboler returnerer `Symbol.for(key)` et symbol efter navn. For at gøre det modsatte -- returnere et navn efter globalt symbol -- kan vi bruge: `Symbol.keyFor(sym)`:

For eksempel:

```js run
// få symbol efter navn
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// få navn efter symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` bruger internt det globale symbolregister til at slå nøglen op for symbolet. Så det virker ikke for ikke-globale symboler. Hvis symbolet ikke er globalt, vil det ikke kunne finde det og returnerer `undefined`.

Med det sagt har alle symboler egenskaben `description`.

For eksempel:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, globalt symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, ikke globalt

alert( localSymbol.description ); // name
```

## System symboler

Der findes mange "system" symboler, som JavaScript bruger internt, og vi kan bruge dem til at finjustere forskellige aspekter af vores objekter.

De er listet i specifikationen i tabellen [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...og så videre.

For eksempel, `Symbol.toPrimitive` tillader os at beskrive objekt-til-primitive konvertering. Vi vil se dets brug meget snart.

Andre symboler vil også blive kendt, når vi studerer de tilsvarende sprogfunktioner.

## Opsummering

`Symbol` er en primitiv type til unikke identifikatorer.

Symboler oprettes med kaldet `Symbol()` med en valgfri beskrivelse (navn).

Symboler er altid forskellige værdier, selvom de har samme navn. Hvis vi ønsker, at symboler med samme navn skal være ens, skal vi bruge det globale register: `Symbol.for(key)` returnerer (opretter om nødvendigt) et globalt symbol med `key` som navn. Flere kald af `Symbol.for` med samme `key` returnerer præcis det samme symbol.

Symboler har to hovedanvendelser:

1. "Skjulte" objekt-egenskaber.

    Hvis vi ønsker at tilføje en egenskab til et objekt, der "tilhører" et andet script eller et bibliotek, kan vi oprette et symbol og bruge det som en egenskabsnøgle. En symbolsk egenskab vises ikke i `for..in`, så den vil ikke blive behandlet ved et uheld sammen med andre egenskaber. Den vil heller ikke blive tilgået direkte, fordi et andet script ikke har vores symbol. Så egenskaben vil være beskyttet mod utilsigtet brug eller overskrivning.

    Dermed kan vi "skjult" gemme noget i objekter, som vi har brug for, men som andre ikke bør se, ved hjælp af egenskaber oprettet som symboler.

2. Der findes mange systemsymboler, som JavaScript bruger internt, og som er tilgængelige som `Symbol.*`. Vi kan bruge dem til at ændre nogle indbyggede adfærd. For eksempel vil vi senere i vejledningen bruge `Symbol.iterator` til [iterables](info:iterable), `Symbol.toPrimitive` til at opsætte [objekt-til-primitive konvertering](info:object-toprimitive) og så videre.

Teknisk set er symboler ikke 100% skjulte. Der findes en indbygget metode [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols), der tillader os at få alle symboler. Der findes også en metode kaldet [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys), som returnerer *alle* nøgler i et objekt, inklusive symbolske. Men de fleste biblioteker, indbyggede funktioner og syntaks-konstruktioner bruger ikke disse metoder. Så i praksis er symboler skjulte for de fleste operationer, og det er usandsynligt, at de vil blive tilgået ved et uheld.
