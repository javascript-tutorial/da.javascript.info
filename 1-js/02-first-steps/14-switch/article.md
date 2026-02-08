# "switch" udtryk

Et `switch` udtryk kan erstatte flere `if`-kontroller.

Det giver en mere beskrivende måde at sammenligne en værdi med flere varianter på.

## Syntaksen

`switch` har en eller flere `case` blokke og en valgfri `default`.

Det ser sådan ud:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- Værdien af `x` bliver tjekket for streng lighed med værdien fra den første `case` (det vil sige `value1`), derefter den anden (`value2`) og så videre.
- Hvis ligheden findes, starter `switch` med at udføre koden fra den tilsvarende `case`, indtil den nærmeste `break` (eller indtil slutningen af `switch`).
- Hvis ingen `case` matcher, bliver `default` koden udført (hvis den findes).

## Et eksempel

Et eksempel på `switch` (den udførte kode er fremhævet):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'For lille' );
    break;
*!*
  case 4:
    alert( 'Præcis!' );
    break;
*/!*
  case 5:
    alert( 'For stort' );
    break;
  default:
    alert( "Jeg kender ikke sådanne værdier" );
}
```

Her starter `switch` med at sammenligne `a` med den første `case` variant, som er `3`. Matchen fejler.

Så `4`. Det er et match, så udførelsen starter fra `case 4` indtil den nærmeste `break`.

**Hvis der ikke er nogen `break`, fortsætter udførelsen med den næste `case` uden nogen kontrol.**

Et eksempel uden `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'For lille' );
*!*
  case 4:
    alert( 'Præcis!' );
  case 5:
    alert( 'For stort' );
  default:
    alert( "Jeg kender ikke sådanne værdier" );
*/!*
}
```

I eksemplet ovenfor vil vi se sekventiel udførelse af tre `alert`:

```js
alert( 'Præcis!' );
alert( 'For stort' );
alert( "Jeg kender ikke sådanne værdier" );
```

````smart header="Alle udtryk kan være et `switch/case` argument"
Både `switch` og `case` tillader vilkårlige udtryk.

For eksempel:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("dette kører, fordi +a er 1, som præcis svarer til b+1");
    break;
*/!*

  default:
    alert("dette kører ikke");
}
```
`+a` giver `1`, som sammenlignes med `b + 1` i `case`, og den tilsvarende kode udføres.
````

## Gruppering af "case"

Flere varianter af `case`, som deler den samme kode, kan grupperes.

For eksempel, hvis vi ønsker at den samme kode skal køre for `case 3` og `case 5`:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Rigtigt!');
    break;

*!*
  case 3: // (*) grouped two cases
  case 5:
    alert('Forkert!');
    alert("Hvorfor tager du ikke et matematikhold?");
    break;
*/!*

  default:
    alert('Resultatet er mærkeligt. Virkelig?!');
}
```

Nu vil både `3` og `5` vise den samme besked.

Muligheden for at "gruppere" cases er en bivirkning af, hvordan `switch/case` fungerer uden `break`. Her starter udførelsen af `case 3` fra linjen `(*)` og fortsætter gennem `case 5`, fordi der ikke er noget `break`.

## Datatype betyder noget

Lad os understrege, at lighedstjekket altid er strengt. Værdierne skal være af samme type for at matche.

For eksempel, lad os se på koden:

```js run
let arg = prompt("Indtast en værdi?");
switch (arg) {
  case '0':
  case '1':
    alert( 'Et eller nul' );
    break;

  case '2':
    alert( 'To' );
    break;

  case 3:
    alert( 'Kører aldrig!' );
    break;
  default:
    alert( 'En ukendt værdi' );
}
```

1. For `0`, `1`, kører den første `alert`.
2. For `2` kører den anden `alert`.
3. Men for `3` er resultatet af `prompt` en streng `"3"`, som ikke er strengt lig med `===` tallet `3`. Så vi har død kode i `case 3`! `default` varianten vil blive udført.
