# Løkker: while og for

Vi har ofte brug for at gentage handlinger.

For eksempel at vise varer fra en liste én efter én eller bare køre den samme kode for hvert tal fra 1 til 10.

*Løkker* er en måde at gentage den samme kode flere gange på.

```smart header="for..of og for..in løkker"
En lille meddelelse til avancerede læsere.

Denne artikel dækker kun grundlæggende løkker: `while`, `do..while` og `for(..;..;..)`.

Hvis du kom til denne artikel for at søge efter andre typer løkker, er her nogle henvisninger:

- Se [for..in](info:object#forin) for at løkke over objektets egenskaber.
- Se [for..of](info:array#loops) og [iterables](info:iterable) for at løkke over arrays og iterable objekter.

Ellers, fortsæt bare med at læse.
```

## "while" løkken

"while" løkken har følgende syntaks:

```js
while (betingelse) {
  // kode
  // såkaldt "loop body" eller løkkens krop
}
```

Mens `betingelsen` er sand, udføres `koden` fra løkkens krop.

For eksempel viser løkken nedenfor `i`, mens `i < 3`:

```js run
let i = 0;
while (i < 3) { // viser 0, så 1, så 2
  alert( i );
  i++;
}
```

En enkelt udførelse af løkkens krop kaldes *en iteration*. Løkken i eksemplet ovenfor laver tre iterationer.

Hvis `i++` manglede i eksemplet ovenfor, ville løkken gentage sig (i teorien) for evigt. I praksis giver browseren måder at stoppe sådanne løkker på, og i server-side JavaScript kan vi dræbe processen.

Enhver udtryk eller variabel kan være en løkkebetingelse, ikke kun sammenligninger: betingelsen evalueres og konverteres til en boolean af `while`.

For eksempel er en kortere måde at skrive `while (i != 0)` på `while (i)`:

```js run
let i = 3;
*!*
while (i) { // når i bliver 0, bliver betingelsen falsy, og løkken stopper
*/!*
  alert( i );
  i--;
}
```

````smart header="Krøllede parenteser er ikke påkrævet for en enkeltlinjet krop"
Hvis løkkens krop har en enkelt sætning, kan vi udelade de krøllede parenteser `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" løkken

Tjek af betingelsen kan flyttes *under* løkkens krop ved hjælp af `do..while` syntaksen:

```js
do {
  // loop body
} while (condition);
```

Løkken vil først udføre kroppen, derefter tjekke betingelsen, og mens den er sand, udføre den igen og igen.

For eksempel:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Denne form for syntaks bør kun bruges, når du vil have løkkens krop til at køre **mindst én gang** uanset om betingelsen er sand. Normalt foretrækkes den anden form: `while(…) {…}`.

## "for" løkken

"for" løkken er mere kompleks, men det er også den mest brugte løkke.

Den ser sådan ud:

```js
for (start; betingelse; trin) {
  // ... løkkens krop ...
}
```

Lad os lære betydningen af disse dele ved hjælp af et eksempel. Løkken nedenfor kører `alert(i)` for `i` fra `0` op til (men ikke inklusive) `3`:

```js run
for (let i = 0; i < 3; i++) { // viser 0, så 1, så 2
  alert(i);
}
```

Lad os undersøge `for`-sætningen del for del:

| part  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| start | `let i = 0`    | Udføres én gang ved indgangen til løkken.                                      |
| betingelse | `i < 3`| Tjekkes før hver iteration af løkken. Hvis falsk, stopper løkken.              |
| krop | `alert(i)`| Kører igen og igen, mens betingelsen er sand.                         |
| trin| `i++`      | Udføres efter kroppen ved hver iteration. |

Standarden for løkkens algoritme fungerer sådan her:

```
Run start
→ (if betingelse → kør krop og kør trin)
→ (if betingelse → kør krop og kør trin)
→ (if betingelse → kør krop og kør trin)
→ ...
```

Det betyder, at `start` udføres én gang, og derefter itererer den: efter hver `betingelse` test, udføres `krop` og `trin`.

Hvis du er ny til løkker, kan det hjælpe at gå tilbage til eksemplet og genskabe, hvordan det kører trin-for-trin på et stykke papir.

Her er præcis, hvad der sker i vores tilfælde:

```js
// for (let i = 0; i < 3; i++) alert(i)

// kør start
let i = 0
// if condition → kør krop and kør trin
if (i < 3) { alert(i); i++ }
// if condition → kør krop and kør trin
if (i < 3) { alert(i); i++ }
// if condition → kør krop and kør trin
if (i < 3) { alert(i); i++ }
// ...slut, fordi nu er i == 3
```

````smart header="Inline variabeldeklaration"
Her erklæres "tællervariablen" `i` direkte i løkken. Det kaldes en "inline" variabeldeklaration. Sådanne variabler er kun synlige inde i løkken.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable
```

I stedet for at definere en variabel, kunne vi bruge en eksisterende:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // brug en eksisterende variabel
  alert(i); // 0, 1, 2
}

alert(i); // 3, synlig, fordi erklæret uden for løkken
```
````

### Spring dele over

Enhver del af `for` kan springes over.

For eksempel kan vi udelade `start`, hvis vi ikke behøver at gøre noget i begyndelsen af løkken.

Som her:

```js run
let i = 0; // vi har allerede erklæret og tildelt i

for (; i < 3; i++) { // ingen brug for "start"
  alert( i ); // 0, 1, 2
}
```

Vi kan også fjerne `trin` delen:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Dette gør løkken identisk med `while (i < 3)`.

Vi kan faktisk fjerne alt og skabe en uendelig løkke:

```js
for (;;) {
  // gentages uden begrænsninger
}
```

Bemærk venligst, at de to `for` semikoloner `;` skal være til stede. Ellers opstår der en syntaksfejl.

## Bryd ud af løkken

Normalt afsluttes en løkke, når dens betingelse bliver falsk.

Men vi kan tvinge afslutningen når som helst ved hjælp af den specielle `break`-direktiv.
For eksempel spørger løkken nedenfor brugeren om en række tal og "bryder" ud, når der ikke indtastes noget tal:

```js run
let sum = 0;

while (true) {

  let value = +prompt("Indtast et tal", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

`break` direktivet aktiveres på linjen `(*)`, hvis brugeren indtaster en tom linje eller annullerer input. Det stopper løkken øjeblikkeligt og overfører kontrollen til den første linje efter løkken, nemlig `alert`.

Kombinationen "uendelig løkke + `break` efter behov" er fantastisk til situationer, hvor en løkkes betingelse skal kontrolleres ikke i begyndelsen eller slutningen af løkken, men midt i eller endda flere steder i dens krop.

## Fortsæt til næste iteration [#continue]

`continue` direktivet er en "lettere version" af `break`. Det stopper ikke hele løkken. I stedet stopper det den nuværende iteration og tvinger løkken til at starte en ny (hvis betingelsen tillader det).

Vi kan bruge det, hvis vi er færdige med den nuværende iteration og gerne vil gå videre til den næste.

Løkken nedenfor bruger `continue` til kun at vise ulige værdier:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // hvis true, spring resten af kroppen over
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

For lige værdier af `i`, stopper `continue` direktivet udførelsen af kroppen og overfører kontrollen til næste iteration af `for` (med det næste tal). Så `alert` kaldes kun for ulige værdier.

````smart header="`continue` direktivet hjælper med at mindske indlejring"
En løkke, der viser ulige værdier, kunne se sådan ud:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Fra et teknisk synspunkt er dette identisk med eksemplet ovenfor. Selvfølgelig kan vi bare pakke koden ind i en `if`-blok i stedet for at bruge `continue`.

Men som en bivirkning skabte dette et ekstra niveau af indlejring (kaldet til `alert` inde i krøllede parenteser). Hvis koden inde i `if` er længere end et par linjer, kan det mindske den samlede læsbarhed.
````

````warn header="Ingen `break/continue` til højre for '?'"
Bemærk venligst, at syntakskonstruktioner, der ikke er udtryk, ikke kan bruges med den ternære operator `?`. Især er direktiver som `break/continue` ikke tilladt der.

For eksempel, hvis vi tager denne kode:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...og omskriver den ved hjælp af et spørgsmålstegn:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue er ikke tilladt her
```

...vil den stoppe med at fungere: der opstår en syntaksfejl.

Så her kan du ikke bruge spørgsmålstegnsoperatoren `?` i stedet for `if`.
````

## Labels til break/continue

Nogle gange har vi brug for at bryde ud af flere indlejrede løkker på én gang.

For eksempel, i koden nedenfor løber vi over `i` og `j`, og spørger efter koordinaterne `(i, j)` fra `(0,0)` til `(2,2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Værdi ved koordinaterne (${i},${j})`, '');

    // hvad nu hvis vi vil afslutte her til 'Færdig' (nedenfor)?
  }
}

alert('Færdig!');
```

Vi har brug for en måde at stoppe processen, hvis brugeren annullerer input.

Den almindelige `break` efter `input` ville kun bryde den indre løkke. Det er ikke tilstrækkeligt -- labels kommer til undsætning!

En *label* er et identifikationsnavn med et kolon før en løkke:

```js
labelName: for (...) {
  ...
}
```

`break <labelName>` udtrykket i løkken nedenfor bryder ud til labelen:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Værdi ved koordinaterne (${i},${j})`, '');

    // hvis en tom streng eller annulleret, så bryd ud af begge løkker
    if (!input) *!*break outer*/!*; // (*)

    // gør noget med værdien...
  }
}

alert('Færdig!');
```

I koden ovenfor leder `break outer` opad efter labelen med navnet `outer` og bryder ud af den løkke.

Så kontrollen går direkte fra `(*)` til `alert('Færdig!')`.

Vi kan også flytte labelen til en separat linje:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

`continue` direktivet kan også bruges med en label. I dette tilfælde hopper kodeudførelsen til næste iteration af den mærkede løkke.

````warn header="Labels tillader ikke at \"hoppe\" hvor som helst hen"
Labels tillader ikke, at vi kan hoppe til et vilkårligt sted i koden.

For eksempel er det umuligt at gøre dette:

```js
break label; // hop til labelen nedenfor (virker ikke)

label: for (...)
```

`break` direktivet skal være inde i en kodeblok. Teknisk set kan enhver mærket kodeblok bruges, f.eks.:

```js
label: {
  // ...
  break label; // virker
  // ...
}
```

...99.9% af tiden bruges `break` dog inde i løkker, som vi har set i eksemplerne ovenfor.

Et `continue` er kun muligt inde i en løkke.
````

## Opsummering

Vi har dækket 3 typer løkker:

- `while` -- Betingelsen tjekkes før hver iteration.
- `do..while` -- Betingelsen tjekkes efter hver iteration.
- `for (;;)` -- Betingelsen tjekkes før hver iteration, yderligere indstillinger tilgængelige.

For at lave en "uendelig" løkke bruges normalt konstruktionen `while(true)`. En sådan løkke, ligesom enhver anden, kan stoppes med `break` direktivet.

Hvis vi ikke ønsker at gøre noget i den nuværende iteration og gerne vil gå videre til den næste, kan vi bruge `continue` direktivet.

`break/continue` understøtter labels før løkken. En label er den eneste måde for `break/continue` at undslippe en indlejret løkke for at gå til en ydre.