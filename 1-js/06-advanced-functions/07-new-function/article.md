
# Syntaksen "new Function"

Der findes endnu en måde at oprette en funktion. Den bruges sjældent, men nogle gange er der ingen alternativ.

## Syntaks

Syntaksen for at oprette en funktion med `new Function` er:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Funktionen oprettes med argumenterne `arg1...argN` og den givne `functionBody`.

Det er lettere at forstå ved at se på et eksempel. Her er en funktion med to argumenter:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

Og her er en funktion uden argumenter, med kun funktionens krop:

```js run
let sayHi = new Function('alert("Hej")');

sayHi(); // Hej
```

Den store forskel fra de andre måder vi har set er, at funktionen oprettes bogstaveligt fra en streng, som sendes ved køretid.

Alle tidligere deklarationer krævede, at vi programmerere skrev funktionens kode i scriptet.

Men `new Function` tillader os at omdanne enhver streng til en funktion. For eksempel kan vi modtage en ny funktion fra en server og derefter køre den:

```js
let str = ... modtag koden dynamisk fra en server ...

let func = new Function(str);
func();
```

Det bruges i meget specifikke situationer hvor vi modtager kode fra en server eller dynamisk kompilerer en funktion fra et skabelon, i komplekse web-applikationer.

## Closure

Normalt husker en funktion hvor den blev oprettet i den specielle egenskab `[[Environment]]`. Den refererer til det leksikale miljø hvor den blev oprettet (vi dækkede det i kapitlet <info:closure>).

Men når en funktion oprettes med `new Function`, sættes dens `[[Environment]]` til at referere ikke til det nuværende leksikale miljø, men til det globale.

Så har sådan en funktion ikke adgang til ydre variabler, kun til de globale.
```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // Fejl: value er ikke defineret
```

Sammenlig det med den normale opførsel:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, fra det leksikale miljø af getFunc
```

Denne specielle egenskab af `new Function` ser mærkelig ud, men er virkelig nyttig i praksis.

Forestil dig, at vi skal oprette en funktion fra en streng. Koden for den funktion er ikke kendt på tidspunktet for skrivning af scriptet (derfor bruger vi ikke normale funktioner), men vil være kendt i processen af kørsel. Vi kan modtage den fra serveren eller fra en anden kilde.

Vores nye funktion skal interagere med hovedscriptet.

Hvad hvis den kunne tilgå ydre variabler?

Problem er at JavaScript, inden det publiseres til produktion, ofte bliver komprimeret ved brug af en *minifier* -- et specielt program der skrumper koden ved at fjerne kommentarer, mellemrum og hvad der er mere vigtigt - omdøber lokale variabler til kortere navne.

For eksempel, hvis en funktion deklareres med `let userName`, vil minifier erstatte det med `let a` (eller et andet bogstav, hvis `a` er optaget), og gøre det alle steder der henvises til den. Det er normalt en sikker manøvre fordi variablen er lokal. Intet uden for funktionen kan tilgå den. Minifiers er smarte. De analyserer kodestrukturen så intet går i stykker. Det er ikke bare en simpel søg-og-erstat.

Så hvis `new Function` havde adgang til ydre variable, ville det ikke kunne finde den omdøbte `userName`.

**Hvis `new Function` havde adgang til ydre variable, ville det have problemer med minifiers.**

Derudover vil sådan en funktion være arkitektonisk dårlig og udsat for fejl. Det ville være let at glemme at definere en variabel, og det ville føre til fejl. At have `new Function` uden adgang til ydre variabler tvinger os til at passere alt hvad den har brug for som argumenter, og det er en god ting.

Så for at tilføje noget til funktionen skabt med `new Function`, skal vi bruge dens argumenter.

## Opsummering

Syntaksen:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

A historiske grunde kan argumenter også gives som en kommasepareret liste.

Disse tre deklarationer betyder det samme:

```js
new Function('a', 'b', 'return a + b'); // normale syntaks
new Function('a,b', 'return a + b'); // kommasepareret
new Function('a , b', 'return a + b'); // kommasepareret med mellemrum
```

Funktioner skabt med `new Function` har `[[Environment]]` som refererer til det globale leksikale miljø, ikke det ydre. Derfor kan de ikke bruge ydre variabler. Men det er faktisk godt, fordi det beskytter os mod fejl. At overføre parametre ekspllicit er en meget bedre metode arkitektonisk og forårsager ingen problemer med minifiers.
