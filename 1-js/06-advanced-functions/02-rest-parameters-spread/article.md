# Rest parameteren og spread syntaks

Mange af JavaScript's indbyggede funktioner understøtter et vilkårligt antal argumenter.

For eksempel:

- `Math.max(arg1, arg2, ..., argN)` -- returnerer det største af argumenterne.
- `Object.assign(dest, src1, ..., srcN)` -- kopierer egenskaber fra `src1..N` til `dest`.
- ...og så videre.

I dette kapitel vil vi lære hvordan man gør det samme. Og også, hvordan man sender arrays til sådanne funktioner som parametre.

## Rest parameteren `...`

En funktion kan kaldes med et vilkårligt antal argumenter, uanset hvordan den er defineret.

Som her:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

JavaScript vil  ikke melde en fejl på grund af "ekstra" argumenter. Men selvfølgelig vil kun de første to argumenter blive talt med, så resultatet i koden ovenfor er `3`.

Rest parameteren kan inkluderes i funktionsdefinitionen ved hjælp af tre prikker `...` efterfulgt af navnet på arrayet, der vil indeholde dem. Prikkerne betyder bogstaveligt talt "samle de resterende parametre i en array".

For eksempel, for at samle alle argumenter i arrayet `args`:

```js run
function sumAll(...args) { // args er navnet som arrayet får
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Vi kan vælge at specificere de første parametre som variable, og kun samle de resterende i en array.

Her sendes de første to argumenter til variable og de resterende til `titles` array:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Cæsar

  // resten sendes til titles array
  // i.e. titles = ["Konsul", "Imperator"]
  alert( titles[0] ); // Konsul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Cæsar", "Konsul", "Imperator");
```

````warn header="rest parameteren skal være sidst"
rest parameteren samler yderskydende argumenter så følgende giver ikke mening og vil genrere en fejl:

```js
function f(arg1, ...rest, arg2) { // arg2 efter ...rest ?!
  // fejl
}
```

`...rest` skal altid være det sidste argument.
````

## Variablen "arguments"

Der er også et specielt array-lignende objekt kaldet `arguments` som indeholder alle argumenter efter deres index.

For eksempel:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // Den er itererbar
  // for(let arg of arguments) alert(arg);
}

// viser: 2, Julius, Cæsar
showName("Julius", "Cæsar");

// viser: 1, Karsten, undefined (intet andet argument)
showName("Karsten");
```

Før hen eksisterede rest parameteren ikke i sproget. Her var `arguments` den eneste måde at få adgang til alle argumenter af funktionen. Og det virker stadig, vi kan finde det i gammel kode.

Men ulempen er at selvom `arguments` er både array-lignende og itererbar, er det ikke et array. Det understøtter ikke array-metoder, så vi kan ikke kalde `arguments.map(...)` for eksempel.

Derudover indeholder den altid alle argumenter. Vi kan derfor ikke fange dem delvist, som vi gjorde med rest parameterne.

Så, hvis vi har brug for disse funktioner, er rest parameterne foretrukket.

````smart header="Arrow-funktioner har ikke`\"arguments\"`"
Hvis vi tilgår `arguments` objektet fra en arrow-funktion vil den tage den fra den ydre "normale" funktion.

Her er et eksempel:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Du husker nok, at arrow-funktioner ikke har deres egen `this`. Nu ved vi også, at de ikke har det specielle `arguments` objekt.
````


## Spread syntaks [#spread-syntax]

Vi har lige set hvordan man får et array fra en liste af parametre.

Men nogle gange har vi brug for det modsatte.

For eksempel er der den indbyggede funktion [Math.max](mdn:js/Math/max) som returnerer det største tal fra en liste:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Lad os nu sige, at vi har et array `[3, 5, 1]`. Hvordan kalder vi `Math.max` med det?

Hvis vi indsætter det som det er vil det ikke virke fordi `Math.max` forventer en række nummeriske værdier som argumenter - ikke et array:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Og vi kan heller ikke manuelt liste dem i kode i stil med `Math.max(arr[0], arr[1], arr[2])`, fordi vi ikke med sikkerhed kan vide, hvor mange værdier der er. Når koden eksekvereres kan der være mange, få eller ingen.

*Spread syntaks* kommer til vores redning! Den ligner rest parameterne, også bruger `...`, men gør det modsatte.

Når `...arr` bruges i funktionskaldet, "udvidder" den et iterable objekt `arr` til en liste af argumenter.

For `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread omdanner array til en liste af argumenter)
```

Vi kan også overføre flere iterables på denne måde:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Vi kan endda kombinere spread syntaksen med normale værdier:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

spread syntaksen kan også bruges til at smelte arrays sammen:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, derefter arr, derefter 2 og til sidst arr2)
```

I eksemplet ovenfor bruger vi en array til at demonstrere spread syntaksen, men ethvert iterable objekt vil virke.

For eksempel bruger vi spread syntaksen til at omdanne en streng til et array af karakterer:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Spread syntaksen bruger internt en iterator til at samle elementer, på samme måde som `for..of` gør.

Så, for en streng, returnerer `for..of` karakterer og `...str` bliver `"H","e","l","l","o"`. Listen af karakterer bliver sendt til array-initializer `[...str]`.

For denne specifikke opgave kunne vi også bruge `Array.from`, fordi det konverterer et iterable (som en streng) til en array:

```js run
let str = "Hello";

// Array.from konverter en itererbar til et array
alert( Array.from(str) ); // H,e,l,l,o
```

Resultatet er der samme som `[...str]`.

Men der er en lille forskel på `Array.from(obj)` og `[...obj]`:

- `Array.from` virker både på array-lignende og itererbare objekter.
- Spread syntaksen virker kun med itererbare objekter.

Så, for opgaven med at konvertere noget til et array, er `Array.from` ofte mere universel.


## Kopier et array eller objekt

Husker du da vi talte om `Object.assign()` [i et tidligere afsnit](info:object-copy#cloning-and-merging-object-assign)?

Det er muligt at gøre det samme med spread syntaksen.

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // spred et array til en liste af parametre
                        // og sæt resultatet i et nyt array
*/!*

// har de to array det samme indhold?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// er de helt ens?
alert(arr === arrCopy); // false (ikke samme reference)

// ændring af det første array gør ikke noget ved kopien:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Bemærk, at det er muligt at gøre det samme for at lave en kopi af et objekt:

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // spred objektet til en liste af parametre
                          // og returner resultatet i et nyt objekt
*/!*

// har de to objekter det samme indhold?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// er de helt ens?
alert(obj === objCopy); // false (ikke samme reference)

// ændring af det første objekt gør ikke noget ved kopien:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

Denne måde at kopiere et objekt er meget kortere end `let objCopy = Object.assign({}, obj)` eller for et array `let arrCopy = Object.assign([], arr)` så vi foretrækker at bruge den, når vi kan.


## Opsummering

Når vi ser `"..."` i koden, er det enten rest parametre eller spread syntaks.

Der er en nem måde at skelne mellem dem:

- Når `...` er i slutningen af funktionsparametre, er det "rest parametre" og samler resten af listen af argumenter i en array.
- Når `...` forekommer i en funktionskald eller lignende, kaldes det "spread syntaks" og udvider en array til en liste.

Brugssituationer:

- Rest parametre bruges til at oprette funktioner, der accepterer et vilkårligt antal argumenter.
- Spread syntaksen bruges til at sende et array til funktioner, der normalt kræver en liste af mange argumenter.

Som par hjælper de med at at lette konverteringen mellem en liste af parametre og et array af parametre.

Alle argumenter i et funktionskald er også tilgængelige i "old-style" `arguments`: array-lignende iterable objekt.
