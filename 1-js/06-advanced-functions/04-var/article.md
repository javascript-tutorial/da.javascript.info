
# Den gamle "var"

```smart header="Den artikel er primært for at forstå ældre scripts"
Informationen i denne artikel er brugbar for at forstå ældre scripts.

Det er ikke noget man normalt bruger i moderne JavaScript.
```

I det første kapitel omkring [variable](info:variables), nævnte vi tre måder at deklarere variable:

1. `let`
2. `const`
3. `var`

Deklerationen `var` minder meget om `let`. I langt de fleste tilfælde kan vi erstatte `let` med `var` eller omvendt og forvente, at tingene virker som de skal:

```js run
var message = "Hej";
alert(message); // Hej
```

Men internt er `var` en helt anden størrelse, der har sin oprindelse i JavaScript tidlige år. Det bruges normalt ikke i moderne JavaScript, men vil stadig ofte findes i ældre scripts.

Hvis du ikke planlægger at møde sådanne scripts, kan du måske springe dette kapitel over eller udsætte det.

På den anden side er det vigtigt at forstå forskellene, når man migrerer gamle scripts fra `var` til `let`, for at undgå sjældne fejl.

## "var" har ingen block scope

Variable deklareret med `var` er enten function-scoped eller global-scoped. De er synlige gennem kodeblokke.

For eksempel:

```js run
if (true) {
  var test = true; // bruger "var" i stedet for "let"
}

*!*
alert(test); // true, variablen lever efter if er afsluttet
*/!*
```

Da `var` ignorerer kodeblokke får vi her en global variabel `test`.

Hvis vi bruger `let test` i stedet for `var test`, så vil variablen kun være synlig inden for `if`:

```js run
if (true) {
  let test = true; // bruger "let"
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

Den samme ting gælder for løkker: `var` kan ikke være lokal for løkken:

```js run
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i);   // 10, "i" er synlig efter loopet da det (med var) er blevet en global variabel
alert(one); // 1, "one" er synlig efter loopet da det (med var) er blevet en global variabel
*/!*
```

Hvis en kodeblok er inde i en funktion så bliver `var` en variabel med et scope til funktionen. Den er synlig i hele funktionen, uanset hvor den er deklareret:

```js run
function sayHi() {
  if (true) {
    var phrase = "Hej";
  }

  alert(phrase); // virker
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```

Som vi kan se så skærer `var` sig gennem `if`, `for` og andre kodeblokke. Det er fordi JavaScript i gamle dage ikke havde leksikale miljøer for kodeblokke og `var` er et barn af den tid.

## "var" tolererer redeklerationer

Hvis vi deklarerer den samme variabel med `let` to gange i samme scope, får vi en fejl:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

Med `var` kan vi redeklarere en variabel så meget vi har lyst. Hvis vi bruger `var` med en allerede deklareret variabel, ignoreres det bare:

```js run
var user = "Pete";

var user = "John"; // denne "var" gør intet (er allerede deklareret), så den ignoreres
// ...derfor melder JavaScript ikke en fejl

alert(user); // John
```

## "var" variable kan deklareres efter de bruges

`var` deklaration processeres først når funktionen kaldes (eller scriptet starter for globale variable).

Sagt på en anden måde. Variable skabt med `var` er defineret fra begyndelsen af funktionen, lige meget hvor i funktionen definitionen er (med mindre definitionen er i en indlejret funktion selvfølgelig).

Så denne kode:

```js run
function sayHi() {
  phrase = "Hej";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...er teksnisk set det samme som denne (flyttet `var phrase` over):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hej";

  alert(phrase);
}
sayHi();
```

...eller endda denne her (husk, at kodeblokke ignoreres af `var`):

```js run
function sayHi() {
  phrase = "Hej"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Denne adfærd kaldes "hoisting" (hejsning eller opløftning), fordi alle `var` bliver "hoisted" (løftet) op til toppen af funktionen.

Så i eksemplet ovenfor, `if (false)` branch bliver egentlig aldrig eksekveret, men det spiller ingen rolle. Den `var` der er inde i den bliver behandlet i begyndelsen af funktionen, så ved tidspunktet for `(*)` eksisterer variablen.

**Deklarationer bliver hoisted men tildelinger bliver ikke.**

Det er nok bedst demonstreret med et eksempel, hvor vi prøver at bruge en variabel før den er deklareret:

```js run
function sayHi() {
  alert(phrase);

*!*
  var phrase = "Hej";
*/!*
}

sayHi();
```

Linjen `var phrase = "Hej"` har to handlinger knyttet til sig:

1. Deklaration af variablen `var`
2. Tildeling af værdi `=`.

Deklarationen processeres i starten af funktionens eksekvering ("hoisted"), men tildelingen virker altid på den sted hvor den optræder. Så koden virker faktisk som dette:

```js run
function sayHi() {
*!*
  var phrase; // deklaration virker fra starten...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hej"; // ...tildeling - når afviklingen rammer dette sted.
*/!*
}

sayHi();
```

Fordi alle `var` deklarationer behandles i starten af funktionens eksekvering, kan vi referere til dem hvor som helst. Men variabler er undefined indtil tildelingen.

I begge eksempler ovenfor, kører `alert` uden en fejl, fordi variablen `phrase` eksisterer. Men dens værdi er ikke endnu tildelt, så den viser `undefined`.

## IIFE

I begyndelsen, da der kun var `var`, og det ikke havde synlighed på blokniveau, opfandt programmører en måde at emulere det. Det de gjorde, kaldtes "immediately-invoked function expressions" (forkortet som IIFE).

Det er ikke noget der er udbredt mere, men du vil stadig kunne finde det i kode fra tid til anden.

En IIFE ser således ud:

```js run
(function() {

  var message = "Hej";

  alert(message); // Hej

})();
```

Her bliver et funktionsudtryk skabt og kaldt med det samme. På den måde bliver koden afviklet med sine egne private variable.

Funktionsudtrykket er pakket ind i parentes `(function {...})`, fordi når JavaScript-motoren støder på `"function"` i hovedkoden, så forstår den det som starten af en funktionsdeklaration. Men en funktionsdeklaration skal have et navn, så denne type kode vil give en fejl:

```js run
// Prøver at oprette og kalde en funktion med det samme
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hej";

  alert(message); // Hej

}();
```

Selv hvis vi siger: "Okay, lad os give den et navn!", vil det ikke virke da JavaScript ikke tillader at funktionsudtryk kaldes med det samme de er skabt:

```js run
// syntaksfejl på grund af parenteser til sidst
function go() {

}(); // <-- du kan ikke kalde den med det samme
```

Så parenteser rundt om funktionensudtrykket er et trick, for at vise JavaScript at funktionen er skabt i konteksten af et andet udtryk, og derfor er den et funktionsudtryk: det behøver ikke et navn og kan kaldes med det samme.

Der findes andre måder end parenteser til at fortælle JavaScript at vi mener et funktionsudtryk:

```js run
// Ways to create IIFE

*!*(*/!*function() {
  alert("Parenteser omkring funktionen");
}*!*)*/!*();

*!*(*/!*function() {
  alert("Parenteser omkring hele udtrykket");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starter udtrykket");
}();

*!*+*/!*function() {
  alert("Unært plus starter udtrykket");
}();
```

I alle tilfælde ovenfor deklareres et funktionsudtryk og kaldes med det samme. Men, i dag er der sjældent grund til at skrive sådan kode efter vi har fået `let` og `const`.

## Opsummering

Der er to hovedforskelle mellem `var` og `let/const`:

1. `var` variabler har ingen blok-scope, deres synlighed er scoped til den aktuelle funktion, eller globalt, hvis de er deklareret uden for en funktion.
2. `var` deklarationer behandles i starten af funktionens eksekvering (script start for globale variabler).

Der er yderligere en lille ekstra forskel relateret til det globale objekt, som vi vil dække i næste kapitel.

Det er disse forskelle der gør `var` værre end `let` de fleste gange. Blok-niveau variabler er sådan en god ting. Det er derfor `let` blev introduceret i standarden for længe siden, og er nu en vigtig måde (sammen med `const`) at deklarere en variabel på.
