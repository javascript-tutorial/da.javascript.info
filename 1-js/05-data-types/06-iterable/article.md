
# Itererbare objekter

*Iterable* objekter er en generalisering af arrays. Det er et koncept, der tillader os at gøre ethvert objekt brugbart i en `for..of`-løkke.

Selvfølgelig er arrays itererbare. Men der findes mange andre indbyggede objekter, som også er iterable. For eksempel er strenge også iterable.

Hvis et objekt teknisk set ikke er et array, men repræsenterer en samling (liste, sæt) af noget, så er `for..of` en fremragende syntaks til at iterere over det, så lad os se, hvordan man får det til at fungere.


## Symbol.iterator

Vi kan nemt forstå konceptet med itererbare objekter ved at lave en af vores egne.

For eksempel har vi et objekt, der ikke er et array, men som ser ud til at være egnet til `for..of`.

Som et `range`-objekt, der repræsenterer et interval af tal:

```js
let range = {
  from: 1,
  to: 5
};

// Vi vil have for..of til at virke:
// for(let num of range) ... num=1,2,3,4,5
```

For at gøre `range`-objektet itererbart (og dermed lade `for..of` fungere) skal vi tilføje en metode til objektet med navnet `Symbol.iterator` (et specielt indbygget symbol til netop det formål).

1. Når `for..of` starter kaldes metoden en gang (eller fejler, hvis den ikke findes). Metoden skal returnere en *iterator* -- et objekt med metoden `next`.
2. Herefter arbejder `for..of` *kun med det returnerede objekt*.
3. Når `for..of` ønsker den næste værdi, kalder den `next()` på det objekt.
4. Resultatet af `next()` skal have formen `{done: Boolean, value: any}`, hvor `done=true` betyder, at løkken er færdig, ellers er `value` den næste værdi.

Her er den fulde implementering for `range` med bemærkninger:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. kald til for..of kalder oprindeligt dette
range[Symbol.iterator] = function() {

  // ...det returnerer iterator-objektet:
  // 2. Herefter arbejder for..of kun med iterator-objektet nedenfor, som spørger efter næste værdier
  return {
    current: this.from,
    last: this.to,

    // 3. next() kaldes på hver iteration af for..of-løkken
    next() {
      // 4. det bør returnere værdien som et objekt {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// nu virker det!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Bemærk den grundlæggende egenskab ved iterables: adskillelse af bekymringer.

- Selve `range` har ikke `next()`-metoden.
- I stedet oprettes et andet objekt, en såkaldt "iterator", ved kaldet til `range[Symbol.iterator]()`, og dens `next()` genererer værdier til iterationen.

Således er iterator-objektet adskilt fra det objekt, det itererer over.

Teknisk set kan vi slå dem sammen og bruge `range` selv som iteratoren for at gøre koden enklere.

Som dette:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Nu returnerer `range[Symbol.iterator]()` `range`-objektet selv: det har den nødvendige `next()`-metode og husker den aktuelle iterationsstatus i `this.current`. Kortere? Ja. Og nogle gange er det også fint.

Ulempen er, at det nu er umuligt at have to `for..of`-løkker, der kører over objektet samtidig: de vil dele iterationsstatus, fordi der kun er én iterator -- objektet selv. Men to parallelle for-ofs er en sjælden ting, selv i asynkrone scenarier.

```smart header="Uendelige iteratorer"
Uendelige iteratorer er også mulige. For eksempel bliver `range` uendelig for `range.to = Infinity`. Eller vi kan lave et itererbart objekt, der genererer en uendelig sekvens af pseudotilfældige tal. Det kan også være nyttigt.

Der er ingen begrænsninger på `next`, den kan returnere flere og flere værdier, det er normalt.

Selvfølgelig ville `for..of`-løkken over sådan et iterable være uendelig. Men vi kan altid stoppe den ved hjælp af `break`.
```


## Strenge er itererbare

Arrays og strenge er de mest udbredte indbyggede iteraterbare objekter.

For en streng, `for..of` løkker over dens tegn:

```js run
for (let char of "test") {
  // aktiveres 4 gange: en gang for hvert tegn
  alert( char ); // t, så e, så s, så t
}
```

Og det virker korrekt med specielle tegn!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, og så 😂
}
```

## Kald en iterator eksplicit

For en dybere forståelse, lad os se, hvordan man bruger en iterator eksplicit.

Vi vil iterere over en streng på præcis samme måde som `for..of`, men med direkte kald. Denne kode opretter en strengiterator og får værdier fra den "manuelt":

```js run
let str = "Hello";

// gør det samme som
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // udskriver tegn ét ad gangen
}
```

Det er sjældent nødvendigt, men giver os mere kontrol over processen end `for..of`. For eksempel kan vi opdele iterationsprocessen: iterere lidt, så stoppe, gøre noget andet, og derefter genoptage senere.

## Itererbare objekter og array-likes [#array-like]

To officielle termer ser ens ud men betyder forskellige ting. De kan forstås på følgende måde, så du ikke bliver forvirret.

- *Iterables* (iteraterbare objekter) er objekter, der implementerer `Symbol.iterator`-metoden, som beskrevet ovenfor.
- *Array-likes* er objekter, der har indeks og `length`, så de ligner arrays.

Når vi bruger JavaScript til praktiske opgaver i en browser eller et andet miljø, kan vi støde på objekter, der er itererbare eller array-likes, eller begge dele.

For eksempel er strenge både itererbare (`for..of` virker på dem) og array-likes (de har numeriske indekser og `length`).

Men en itererbar behøver ikke at være array-like. Og omvendt kan en array-like ikke være itererbar.

For eksempel var `range` fra eksemplet ovenfor itererbar men ikke array-lignende, fordi det ikke har indekserede egenskaber og `length`.

Og her er objektet, der er array-lignende, men ikke itererbart:

```js run
let arrayLike = { // har indeks og length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Fejl (ingen Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Både itererbare objekter og array-likes er som regel *ikke arrays*, de har ikke `push`, `pop` osv. Det er ret upraktisk, hvis vi har et sådant objekt og ønsker at arbejde med det som med et array. F.eks. vil vi gerne arbejde med `range` ved hjælp af array-metoder. Hvordan opnår vi det?

## Array.from

Der findes en universel metode [Array.from](mdn:js/Array/from), der tager en itererbar eller array-lignende værdi og laver et "rigtigt" `Array` ud af den. Så kan vi kalde array-metoder på det.

For eksempel:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (metoden virker)
```

`Array.from` på linjen `(*)` tager objektet, undersøger det for at være en itererbar eller array-lignende, laver derefter et nyt array og kopierer alle elementer til det.

Det samme sker for en itererbar:

```js run
// antager at range er taget fra eksemplet ovenfor
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString konvertering virker)
```

Den fulde syntaks for `Array.from` tillader os også at angive en valgfri "mapping"-funktion:
```js
Array.from(obj[, mapFn, thisArg])
```

The frivillige andet argument `mapFn` kan være en funktion, der anvendes på hvert element, før det tilføjes til arrayet, og `thisArg` tillader os at sætte `this` for det.

For eksempel:

```js run
// antager at range er taget fra eksemplet ovenfor

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Her bruger vi `Array.from` til at omdanne en streng til et array af tegn:

```js run
let str = '𝒳😂';

// splitter str til et array af tegn
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

I modsætning til `str.split` er den afhængig af strengens itererbare natur og fungerer derfor, ligesom `for..of`, korrekt med surrogate par.

Teknisk set gør den her det samme som:

```js run
let str = '𝒳😂';

let chars = []; // Array.from gør internt det samme loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...men det er kortere.

Vi kan endda bygge en `slice` der er opmærksom på specielle tegn:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// den indbyggede metode understøtter ikke specielle tegn (kaldet surrogate par)
alert( str.slice(1, 3) ); // virker ikke (giver to stykker fra forskellige specialtegn)
```


## Opsummering

Objekter, der kan bruges i `for..of`, kaldes *itererbare*.

- Teknisk set skal itererbare implementere metoden med navnet `Symbol.iterator`.
    - Resultatet af `obj[Symbol.iterator]()` kaldes en *iterator*. Den håndterer den videre iterationsproces.
    - En iterator skal have metoden med navnet `next()`, som returnerer et objekt `{done: Boolean, value: any}`, hvor `done:true` angiver slutningen af iterationsprocessen, ellers er `value` den næste værdi.
- Metoden `Symbol.iterator` kaldes automatisk af `for..of`, men vi kan også gøre det direkte.
- Indbyggede itererbare som strenge eller arrays implementerer også `Symbol.iterator`.
- String-iteratoren kender til surrogate par.


Objekter, der har indekserede egenskaber og `length`, kaldes *array-lignende*. Sådanne objekter kan også have andre egenskaber og metoder, men mangler de indbyggede metoder fra arrays.

Hvis vi kigger inde i specifikationen -- vil vi se, at de fleste indbyggede metoder antager, at de arbejder med itererbare eller array-lignende i stedet for "rigtige" arrays, fordi det er mere abstrakt.

`Array.from(obj[, mapFn, thisArg])` laver et rigtigt `Array` fra et itererbart eller array-lignende `obj`, og vi kan derefter bruge array-metoder på det. De valgfrie argumenter `mapFn` og `thisArg` tillader os at anvende en funktion på hvert element.
