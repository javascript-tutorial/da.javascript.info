# Array-metoder

Array giver os mange metoder. For at gøre det nemmere, er de i dette kapitel opdelt i grupper.

## Tilføj/fjern elementer

Vi kender allerede metoder, der tilføjer og fjerner elementer fra begyndelsen eller slutningen:

- `arr.push(...items)` -- tilføjer elementer til slutningen,
- `arr.pop()` -- fjerner et element fra slutningen,
- `arr.shift()` -- fjerner et element fra begyndelsen,
- `arr.unshift(...items)` -- tilføjer elementer til begyndelsen.

Her er et par andre.

### splice

Hvordan sletter man et element fra arrayet?

Array er objekter, så vi kan prøve at bruge `delete`:

```js run
let arr = ["Jeg", "går", "hjem"];

delete arr[1]; // fjern "går"

alert( arr[1] ); // undefined

// nu er  arr = ["Jeg",  , "hjem"];
alert( arr.length ); // 3
```

Elementet blev slettet, men har stadig 3 elementer. Vi kan se, at `arr.length == 3`.

Det er naturligt, fordi `delete obj.key` fjerner en værdi ved `key`. Det er alt, hvad det gør. Fint for objekter. Men for arrays ønsker vi normalt, at resten af elementerne skal skifte og optage det frigjorte sted. Vi forventer at have et kortere array nu.

Derfor skal der bruges specielle metoder.

Metoden [arr.splice](mdn:js/Array/splice) er en schweizerkniv for arrays. Den kan det hele: indsætte, fjerne og erstatte elementer.

Syntaksen er:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

Den ændrer `arr` startende fra indekset `start`: fjerner `deleteCount` elementer og indsætter derefter `elem1, ..., elemN` på deres plads. Returnerer arrayet af fjernede elementer.

Metoden er nok nemmere at forstå ved hjælp af eksempler.

Lad os starte med sletning:

```js run
let arr = ["Jeg", "studerer", "JavaScript"];

*!*
arr.splice(1, 1); // fra indeks 1 fjern 1 element
*/!*

alert( arr ); // ["Jeg", "JavaScript"]
```

Nem, ikke? Fra indeks `1` fjernede den `1` element.

I det næste eksempel fjerner vi 3 elementer og erstatter dem med de to andre:

```js run
let arr = [*!*"Jeg", "studerer", "JavaScript",*/!* "lige", "nu"];

// fjerner de 3 første elementer og erstatter dem med andre
arr.splice(0, 3, "Lad", "os", "danse");

alert( arr ) // nu ["Lad", "os", "danse", "lige", "nu"]
```

Her kan vi se, at `splice` returnerer arrayet af fjernede elementer:

```js run
let arr = [*!*"Jeg", "studerer",*/!* "JavaScript", "lige", "nu"];

// fjern de 2 første elementer
let removed = arr.splice(0, 2);

alert( removed ); // "Jeg", "studerer" <-- array af fjernede elementer
```

Metoden `splice` kan også indsætte elementer uden at fjerne nogen. For det skal vi sætte `deleteCount` til `0`:

```js run
let arr = ["Jeg", "studerer", "JavaScript"];

// fra indeks 2
// slet 0
// indsæt "et", "kompleks" og "sprog"
arr.splice(2, 0, "et", "kompleks", "sprog");

alert( arr ); // "Jeg", "studerer", "kompleks", "sprog", "JavaScript"
```

````smart header="Negative indeks er tilladt"
Her og i andre array-metoder er negative indekser tilladt. De angiver positionen fra slutningen af arrayet, som her:

```js run
let arr = [1, 2, 5];

// fra indeks -1 (et skridt fra slutningen)
// slet 0 elementer,
// indsæt derefter 3 og 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

Metoden [arr.slice](mdn:js/Array/slice) er meget enklere end den lignende `arr.splice`.

Syntaksen er:

```js
arr.slice([start], [end])
```

Den returnerer et nyt array, der kopierer alle elementer fra indeks `start` til `end` (eksklusiv `end`). Både `start` og `end` kan være negative, i så fald antages positionen fra slutningen af arrayet.

Det ligner string-metoden `str.slice`, men i stedet for substrings laver den subarrays.

For eksempel:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (kopier fra 1 til 3)

alert( arr.slice(-2) ); // s,t (kopier fra -2 til slutningen)
```

Vi kan også kalde den uden argumenter: `arr.slice()` laver en kopi af `arr`. Det bruges ofte til at få en kopi til videre transformationer, der ikke skal påvirke det oprindelige array.

### concat

Metoden [arr.concat](mdn:js/Array/concat) opretter et nyt array der inkluderer værdierne fra andre arrays og eventuelle yderligere elementer.

Syntaksen er:

```js
arr.concat(arg1, arg2...)
```

Den accepterer et vilkårligt antal argumenter -- enten arrays eller værdier.

Resultatet er et nyt array, der indeholder elementer fra `arr`, derefter `arg1`, `arg2` osv.

Hvis et argument `argN` er et array, kopieres alle dets elementer. Ellers kopieres argumentet selv.

For eksempel:

```js run
let arr = [1, 2];

// Opret et array fra: arr og [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// Opret et array fra: arr og [3,4] og [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// Opret et array fra: arr og [3,4], og tilføj derefter værdierne 5 og 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Normalt kopierer den kun elementer fra arrays. Andre objekter, selvom de ligner arrays, tilføjes som helhed:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "noget",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

...Men hvis et array-lignende objekt har en speciel `Symbol.isConcatSpreadable` egenskab, behandles det som et array af `concat`: dets elementer tilføjes i stedet:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "noget",
  1: "andet",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,noget,andet
```

## Iteration: forEach

Metoden [arr.forEach](mdn:js/Array/forEach) tillader at køre en funktion for hvert element i arrayet.

Syntaksen er:
```js
arr.forEach(function(item, index, array) {
  // ... gør noget med elementet
});
```

For eksempel, dette viser hvert element i arrayet:

```js run
// for hvert element kald alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Og denne kode er mere detaljeret om deres positioner i mål-arrayet:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} er ved indeks ${index} i ${array}`);
});
```

Resultatet af funktionen (hvis den returnerer noget) kasseres og ignoreres.


## Søgning i array

Lad os nu dække metoder, der søger i et array.

### indexOf/lastIndexOf og includes

Metoderne [arr.indexOf](mdn:js/Array/indexOf) og [arr.includes](mdn:js/Array/includes) har en lignende syntaks og gør stort set det samme som deres string-modstykker, men opererer på elementer i stedet for tegn:

- `arr.indexOf(item, from)` -- leder efter `item` startende fra indeks `from`, og returnerer indekset hvor det blev fundet, ellers `-1`.
- `arr.includes(item, from)` -- leder efter `item` startende fra indeks `from`, returnerer `true` hvis fundet.

Normalt bruges disse metoder med kun ét argument: det `item` der skal søges efter. Som standard er søgningen fra starten.

For eksempel:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Bemærk, at `indexOf` bruger streng lighed `===` til sammenligning. Så hvis vi leder efter `false`, finder den præcis `false` og ikke nul.

Hvis vi vil tjekke, om `item` findes i arrayet og ikke har brug for indekset, er `arr.includes` at foretrække.

Metoden [arr.lastIndexOf](mdn:js/Array/lastIndexOf) er den samme som `indexOf`, men søger fra højre mod venstre.

```js run
let fruits = ['Æble', 'Appelsin', 'Æble']

alert( fruits.indexOf('Æble') ); // 0 (første Æble)
alert( fruits.lastIndexOf('Æble') ); // 2 (sidste Æble)
```

````smart header="Metoden `includes` håndterer `NaN` korrekt"
En lille, men bemærkelsesværdig funktion ved `includes` er, at den korrekt håndterer `NaN`, i modsætning til `indexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (forkert, burde være 0)
alert( arr.includes(NaN) );// true (korrekt)
```
Dette er fordi `includes` blev tilføjet til JavaScript meget senere og bruger den mere opdaterede sammenligningsalgoritme internt.
````

### find og findIndex/findLastIndex

Forestil dig, at vi har et array af objekter. Hvordan finder vi et objekt med en bestemt betingelse?

Her kommer metoden [arr.find(fn)](mdn:js/Array/find) til hjælp.

Syntaksen er:
```js
let result = arr.find(function(item, index, array) {
  // hvis true returneres, returneres item og iterationen stoppes
  // for falsy scenarier returneres undefined
});
```

Funktionen kaldes for elementer i arrayet, et efter et:

- `item` er elementet.
- `index` er dets indeks.
- `array` er selve arrayet.

Hvis det returnerer `true`, stoppes søgningen, og `item` returneres. Hvis intet findes, returneres `undefined`.

For eksempel, vi har et array af brugere, hver med felterne `id` og `name`. Lad os finde den med `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

I virkelige projekter er arrays af objekter en almindelig ting, så `find`-metoden er meget nyttig.

Bemærk, at i eksemplet giver vi kun ét argument til `find` funktionen `item => item.id == 1`. Det er typisk, andre argumenter til denne funktion bruges sjældent.

Metoden [arr.findIndex](mdn:js/Array/findIndex) har samme syntaks, men returnerer indekset hvor elementet blev fundet i stedet for elementet selv. Værdien `-1` returneres hvis intet findes.

Metoden [arr.findLastIndex](mdn:js/Array/findLastIndex) er som `findIndex`, men søger fra højre mod venstre, ligesom `lastIndexOf`.

Her er et eksempel:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Find indeks med den første John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find indeks med den sidste John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```

### filter

Metoden `find` søger efter et enkelt (første) element der får funktionen til at returnere `true`.

Hvis der kan være mange, kan vi bruge [arr.filter(fn)](mdn:js/Array/filter).

Syntaksen er lignende `find`, men `filter` returnerer et array af alle matchende elementer:

```js
let results = arr.filter(function(item, index, array) {
  // hvis true bliver item tilføjet til results, og iterationen fortsætter
  // returnerer et tomt array hvis intet findes
});
```

For eksempel:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returnerer et array med de første to brugere
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Transformér et array

Lad os gå videre til metoder, der transformerer og omarrangerer et array.

### map

Metoden [arr.map](mdn:js/Array/map) er en af de mest nyttige og ofte brugte.

Den kalder funktionen for hvert element i arrayet og returnerer arrayet af resultater.

Syntaksen er:

```js
let result = arr.map(function(item, index, array) {
  // returner den nye værdi i stedet for item
});
```

For eksempel, her transformerer vi hvert element til dets længde:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

Kaldet til [arr.sort()](mdn:js/Array/sort) sorterer arrayet *i sig selv*, og ændrer dermed rækkefølgen af dets egne elementer.

Det returnerer også det sorterede array, men den returnerede værdi ignoreres normalt, da `arr` selv bliver ændret.

For eksempel:

```js run
let arr = [ 1, 2, 15 ];

// metoden omarrangerer indholdet af arr
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Bemærkede du noget mærkeligt i resultatet?

Rækkefølgen blev `1, 15, 2`. Forkert. Men hvorfor?

**Elementerne sorteres som standard som tekststrenge (string).**

Det betyder at alle elementer konverteres til strenge for sammenligninger. For strenge anvendes leksikografisk orden, og faktisk er `"2" > "15"`.

For at bruge vores egen sorteringsorden skal vi levere en funktion som argument til `arr.sort()`.

Funktionen skal sammenligne to vilkårlige værdier og returnere:

```js
function compare(a, b) {
  if (a > b) return 1; // hvis den første værdi er større end den anden
  if (a == b) return 0; // hvis værdierne er lige
  if (a < b) return -1; // hvis den første værdi er mindre end den anden
}
```

For eksempel kan vi sortere som tal således:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Nu virker det som forventet.

Lad os træde et skridt tilbage og tænke over, hvad der sker. `arr` kan være et array af hvad som helst, ikke? Det kan indeholde tal eller strenge eller objekter eller hvad som helst. Vi har et sæt af *nogle elementer*. For at sortere det, har vi brug for en *ordensfunktion*, der ved, hvordan man sammenligner dets elementer. Standard er en strengorden.

Metoden `arr.sort(fn)` implementerer en generisk sorteringsalgoritme. Vi behøver ikke bekymre os om, hvordan den internt fungerer (en optimeret [quicksort](https://en.wikipedia.org/wiki/Quicksort) eller [Timsort](https://en.wikipedia.org/wiki/Timsort) det meste af tiden). Den vil gå igennem arrayet, sammenligne dets elementer ved hjælp af den angivne funktion og omarrangere dem, alt hvad vi behøver er at levere `fn`, som gør sammenligningen.

Forresten, hvis vi nogensinde vil vide, hvilke elementer der sammenlignes -- intet forhindrer os i at vise dem med alert:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

Algoritmen kan sammenligne et element med flere andre i processen, men den prøver at lave så få sammenligninger som muligt.

````smart header="En sammenligningsfunktion kan returnere et hvilket som helst tal"
Faktisk kræves det kun, at en sammenligningsfunktion returnerer et positivt tal for at angive "større" og et negativt tal for at angive "mindre".

Det tillader os at skrive kortere funktioner:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Arrow funktioner for de øvede"
Husk [arrow functions](info:arrow-functions-basics)? Vi kan bruge dem her for en pænere sortering:

```js
arr.sort( (a, b) => a - b );
```

Det virker præcis på samme måde som den længere version ovenfor.
````

````smart header="Brug `localeCompare` til strenge"
Husk du [strings](info:string#correct-comparisons) sammenligningsalgoritmen? Den sammenligner bogstaver efter deres koder som standard.

For mange alfabeter er det bedre at bruge metoden `str.localeCompare` for korrekt at sortere bogstaver, såsom `Ö` og "Æ", "Ø" og "Å".

For eksempel, lad os sortere nogle lande på tysk:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (forkert)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (korrekt!)
```
````

### reverse

Metoden [arr.reverse](mdn:js/Array/reverse) vender rækkefølgen af elementerne i `arr`.

For eksempel:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Den returnerer også arrayet `arr` efter omvendelsen.

### split og join

Her er situationen fra det virkelige liv. Vi skriver en beskedapp, og personen indtaster en kommasepareret liste over modtagere: `John, Pete, Mary`. Men for os ville et array af navne være meget mere bekvemt end en enkelt streng. Hvordan får vi det?

Metoden [str.split(delim)](mdn:js/String/split) gør præcis det. Den splitter strengen op i et array efter den givne delimiter `delim`.

I eksempel nedenfor splitter vi efter et komma efterfulgt af et mellemrum:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `En besked til ${name}.` ); // En besked til Bilbo  (efterfulgt af de andre navne)
}
```

Metoden `split` har et valgfrit andet numerisk argument -- en grænse for arrayets længde. Hvis det er angivet, ignoreres de ekstra elementer. I praksis bruges det dog sjældent:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Opsplitning i bogstaver"
Kaldet til `split(s)` med en tom `s` vil opdele strengen i et array af bogstaver:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

Et kald til [arr.join(glue)](mdn:js/Array/join) gør det modsatte af `split`. Det skaber en streng af `arr` elementer forbundet med `glue` imellem dem.

For eksempel:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // limer arrayet sammen til en streng ved hjælp af ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Når vi har brug for at iterere over et array -- kan vi bruge `forEach`, `for` eller `for..of`.

Når vi har brug for at iterere og returnere data for hvert element -- kan vi bruge `map`.

Metoderne [arr.reduce](mdn:js/Array/reduce) og [arr.reduceRight](mdn:js/Array/reduceRight) hører også til den kategori, men er lidt mere indviklede. De bruges til at beregne en enkelt værdi baseret på arrayet.

Syntaksen er:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

Funktionen anvendes på alle array-elementer én efter én og "bærer" sit resultat videre til det næste kald.

Argumenterne for funktionen er:

- `accumulator` -- er resultatet af det forrige funktionskald, svarer til `initial` første gang (hvis `initial` er angivet).
- `item` -- er det aktuelle array-element.
- `index` -- er dets position.
- `array` -- er arrayet.

Efterhånden som funktionen anvendes, bliver resultatet af det forrige funktionskald videregivet til det næste som det første argument.

Så det første argument er i bund og grund akkumulatoren, der gemmer det kombinerede resultat af alle tidligere udførelser. Og til sidst bliver det resultatet af `reduce`.

Lyder det kompliceret?

Den nemmeste måde at forstå det på er ved eksempel.

Her får vi summen af et array på én linje:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Funktionen, der gives til `reduce`, bruger kun 2 argumenter, det er typisk nok.

Lad os se detaljerne i, hvad der sker.

1. Ved første kørsel er `sum` den `initial` værdi (det sidste argument til `reduce`), som er `0`, og `current` er det første array-element, som er `1`. Så funktionens resultat er `1`.
2. Ved anden kørsel er `sum = 1`, vi lægger det andet array-element (`2`) til det og returnerer.
3. Ved tredje kørsel er `sum = 3` og vi lægger endnu et element til det, og så videre...

Beregningen forløber således:

![](reduce.svg)

Eller opsat i form af en tabel, hvor hver række repræsenterer et funktionskald på det næste array-element:

|   |`sum`|`current`|result|
|---|-----|---------|---------|
|det før første kald|`0`|`1`|`1`|
|det andet kald|`1`|`2`|`3`|
|det tredje kald|`3`|`3`|`6`|
|det fjerde kald|`6`|`4`|`10`|
|det femte kald|`10`|`5`|`15`|

Her kan vi tydeligt se, hvordan resultatet af det forrige kald bliver det første argument i det næste.

Vi kan også udelade den initiale værdi, så `reduce` starter med det første element i arrayet som det første argument og starter iterationen fra det andet element:

```js run
let arr = [1, 2, 3, 4, 5];

// fjernet initial værdi fra reduce (ingen 0 til sidst)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Resultatet er det samme. Det sker fordi `reduce` tager det første element i arrayet som den initiale værdi og starter iterationen fra det andet element hvis der ikke er angivet en initial værdi.

Beregningstabellen er den samme som ovenfor, minus den første række.

Men sådan brug kræver at du er lidt opmærksom. Hvis arrayet er tomt, så giver et kald til `reduce` uden initial værdi en fejl.

Her er et eksempel:

```js run
let arr = [];

// TypeError: Reduce of empty array with no initial value
// hvis den initiale værdi eksisterede, ville reduce returnere den for det tomme array.
arr.reduce((sum, current) => sum + current);
```

Så det anbefales altid at angive den initiale værdi.

Metoden [arr.reduceRight](mdn:js/Array/reduceRight) gør det samme, men går fra højre mod venstre.

## Array.isArray

Et array er ikke en separat datatype. De er baseret på objekter.

Så `typeof` hjælper ikke med at skelne den fra et regulært objekt:

```js run
alert(typeof {}); // object
alert(typeof []); // object (samme)
```

...Men arrays bruges så ofte, at der findes en speciel metode til det: [Array.isArray(value)](mdn:js/Array/isArray). Den returnerer `true`, hvis `value` er et array, og `false` ellers.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## De fleste metoder understøtter "thisArg"

Næsten alle array-metoder der kalder funktioner -- som `find`, `filter`, `map`, med en bemærkelsesværdig undtagelse af `sort`, accepterer en valgfri ekstra parameter `thisArg`.

Den parameter er ikke forklaret i afsnittene ovenfor, fordi den sjældent bruges. Men for fuldstændighedens skyld skal vi dække den.

Her er den fulde syntaks for disse metoder:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg er det valgfrie sidste argument
```

Værdien af `thisArg`-parameteren bliver `this` for `func`.

For eksempel, her bruger vi en metode af `army`-objektet som et filter, og `thisArg` sender konteksten til det:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// find users, for hvem army.canJoin returnerer true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

Hvis vi, i eksemplet ovenfor, brugte `users.filter(army.canJoin)`, ville `army.canJoin` blive kaldt som en selvstændig funktion, med `this=undefined`, hvilket ville føre til en øjeblikkelig fejl.

Et kald til `users.filter(army.canJoin, army)` kan erstattes med `users.filter(user => army.canJoin(user))`, som gør det samme. Den sidstnævnte bruges oftere, da den er lidt nemmere at forstå for de fleste.

## Opsummering

Et cheat sheet over array-metoder:

- For at tilføje/fjerne elementer:
  - `push(...items)` -- tilføjer elementer til slutningen,
  - `pop()` -- fjerner et element fra slutningen,
  - `shift()` -- fjerner et element fra begyndelsen,
  - `unshift(...items)` -- tilføjer elementer til begyndelsen.
  - `splice(pos, deleteCount, ...items)` -- ved indeks `pos` sletter `deleteCount` elementer og indsætter `items`.
  - `slice(start, end)` -- opretter et nyt array, kopierer elementer fra indekset `start` til `end` (ikke inklusiv) ind i det.
  - `concat(...items)` -- opretter et nyt array: kopierer alle elementer fra det nuværende og tilføjer `items` til det. Hvis nogen af `items` er et array, tages dets elementer.

- For at søge blandt elementer:
  - `indexOf/lastIndexOf(item, pos)` -- leder efter `item` startende fra position `pos`, og returnerer indekset eller `-1` hvis ikke fundet.
  - `includes(value)` -- returnerer `true` hvis arrayet har `value`, ellers `false`.
  - `find/filter(func)` -- filtrerer elementer gennem funktionen, returnerer første/alle værdier der får den til at returnere `true`.
  - `findIndex` er som `find`, men returnerer indekset i stedet for en værdi.

- For at iterere over elementer:
  - `forEach(func)` -- kalder `func` for hvert element, returnerer ikke noget.

- For at transformere arrayet:
  - `map(func)` -- opretter et nyt array fra resultaterne af at kalde `func` for hvert element.
  - `sort(func)` -- sorterer arrayet på stedet, og returnerer det.
  - `reverse()` -- vender arrayet om på stedet, og returnerer det.
  - `split/join` -- konverterer en streng til et array og tilbage.
  - `reduce/reduceRight(func, initial)` -- beregner en enkelt værdi over arrayet ved at kalde `func` for hvert element og videregive et mellemliggende resultat mellem kald.

- Derudover:
  - `Array.isArray(value)` tjekker om `value` er et array, hvis ja returnerer `true`, ellers `false`.

Bemærk venligst, at metoderne `sort`, `reverse` og `splice` ændrer arrayet selv.

Disse metoder er de mest brugte, de dækker 99% af brugstilfælde. Men der er få andre:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) tjekker arrayet.

  Funktionen `fn` kaldes på hvert element i arrayet på samme måde som med `map`. Hvis nogen/alle resultater er `true`, returneres `true`, ellers `false`.

  Disse metoder opfører sig lidt som `||` og `&&` operatorerne: hvis `fn` returnerer en sand værdi, returnerer `arr.some()` straks `true` og stopper iterationen over de resterende elementer; hvis `fn` returnerer en falsk værdi, returnerer `arr.every()` straks `false` og stopper iterationen over de resterende elementer.

  Vi kan bruge `every` til at sammenligne arrays:

  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fylder arrayet med `value` fra indeks `start` til `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- kopierer sine elementer fra position `start` til position `end` ind i *sig selv*, ved position `target` (overskriver eksisterende).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) opretter et nyt fladt array fra et multidimensionelt array.

For the komplette fulde liste, se [manualen](mdn:js/Array).

Ved første øjekast kan det virke som om der er så mange metoder, at det er ret svært at huske dem alle. Men ved at huske de vigtigste er du langt.

Kig på cheat sheet ovenfor og øv dig på dem. Løs derefter opgaverne i dette kapitel for at øve dig, så du får erfaring med array-metoder.

Herefter, når du har brug for at gøre noget med et array, og du ikke ved hvordan -- kom herhen, kig på cheat sheet og find den rigtige metode. Eksempler vil hjælpe dig med at skrive det korrekt. Snart vil du automatisk huske metoderne, uden specifikke anstrengelser fra din side.
