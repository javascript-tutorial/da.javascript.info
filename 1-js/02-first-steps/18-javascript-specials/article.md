# Særlige kendetegn ved JavaScript

Dette kapitel opsummerer kort de funktioner i JavaScript, som vi har lært indtil nu, med særlig opmærksomhed på subtile øjeblikke.

## Kodestruktur

Udsagn afsluttes med et semikolon:

```js run no-beautify
alert('Hello'); alert('World');
```

Normalt behandles et linjeskift også som en afgrænser, så det ville også fungere:

```js run no-beautify
alert('Hello')
alert('World')
```

Dette kaldes "automatisk semikolonindsættelse". Nogle gange virker det ikke, for eksempel:

```js run
alert("Der vil være en fejl efter denne besked")

[1, 2].forEach(alert)
```

De fleste guider anbefaler, at vi bør sætte et semikolon efter hvert udsagn, men det er ikke et krav, og det er op til dig at beslutte, om du vil bruge dem eller ej.

Semikoloner er ikke påkrævet efter kodeblokke `{...}` og syntaks-konstruktioner med dem som løkker:

```js
function f() {
  // ingen semikolon nødvendig efter funktionsdeklaration
}

for(;;) {
  // ingen semikolon nødvendig efter løkken
}
```

...Men selv hvis vi kan sætte et "ekstra" semikolon et sted, er det ikke en fejl. Det vil blive ignoreret.

Mere information: <info:structure>.

## Strict mode

For fuldt ud at aktivere alle funktioner i moderne JavaScript, kan man starte scripts med `"use strict"`.

```js
'use strict';

...
```

Dette direktiv skal være øverst i et script eller i begyndelsen af en funktionskrop.

Uden `"use strict"` fungerer alt stadig, men nogle funktioner opfører sig på den gammeldags, "kompatible" måde. Vi foretrækker generelt den moderne opførsel.

Nogle moderne funktioner i sproget (som klasser, som vi vil studere i fremtiden) aktiverer implicit strict mode.

Mere information: <info:strict-mode>.

## Variable

Kan deklareres med:

- `let`
- `const` (konstant, kan ikke ændres)
- `var` (gammel stil, vil se senere)

Et variabelnavn kan indeholde:
- Bogstaver og cifre, men det første tegn må ikke være et ciffer.
- Tegnene `$` og `_` er normale, på lige fod med bogstaver.
- Ikke-latinske alfabeter og hieroglyffer er også tilladt, men bruges almindeligvis ikke.

Variable er dynamiske datatyper. De kan gemme enhver værdi:

```js
let x = 5;
x = "John";
```

Der er 8 datatyper:

- `number` for både flydende og heltal,
- `bigint` for heltal af vilkårlig længde,
- `string` for tekststrenge,
- `boolean` for logiske værdier: `true/false`,
- `null` -- en datatype med en enkelt værdi `null`, der betyder "tom" eller "findes ikke",
- `undefined` -- en datatype med en enkelt værdi `undefined`, der betyder "ikke tildelt",
- `object` og `symbol` -- for komplekse datastrukturer og unikke identifikatorer, som vi endnu ikke har lært.

Operatoren `typeof` returnerer typen for en værdi, med to undtagelser:
```js
typeof null == "object" // en "gammel fejl" i sproget
typeof function(){} == "function" // funktioner behandles specielt
```

Mere information: <info:variables> og <info:types>.

## Interaktion

Vi bruger browseren som arbejdsområde, så grundlæggende UI-funktioner vil være:

[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
: Stil et `spørgsmål`, og returner enten det, som besøgende indtastede, eller `null`, hvis de klikkede på "anuller".

[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
: Stil et `spørgsmål`, og foreslå at vælge mellem Ok og Annuller. Valget returneres som `true/false`.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
: Vis en `besked`.

Alle disse funktioner er *modale*, de pauser kodeudførelsen og forhindrer besøgende i at interagere med siden, indtil de svarer.

For eksempel:

```js run
let userName = prompt("Hvad er dit navn?", "Karsten");
let isTeaWanted = confirm("Vil du have noget te?");

alert( "Besøgende: " + userName ); // Karsten
alert( "Te ønskes: " + isTeaWanted ); // true eller false
```

Mere information: <info:alert-prompt-confirm>.

## Operatorer

JavaScript understøtter følgende operatorer:

Aritmetiske
: Almindelige: `* + - /`, også `%` for rest og `**` for potens af et tal.

    Den binære plus `+` sammenkæder strenge. Og hvis en af operanderne er en streng, konverteres den anden også til en streng:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Tildelingsoperatorer
: Der er en simpel tildeling: `a = b` og kombinerede som `a *= 2`.

Bitvise operatorer
: Bitvise operatorer arbejder med 32-bit heltal på det laveste, bit-niveau: se [dokumentationen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators), når de er nødvendige.

Betinget operator
: Den eneste operator med tre parametre: `cond ? resultA : resultB`. Hvis `cond` er sand, returneres `resultA`, ellers `resultB`.

Logiske operatorer
: Logisk OG `&&` og ELLER `||` udfører short circuit-evaluering og returnerer derefter værdien, hvor den stoppede (ikke nødvendigvis `true`/`false`). Logisk IKKE `!` konverterer operanden til boolesk type og returnerer den inverse værdi.

Nullish coalescing-operator
: `??`-operatoren giver en måde at vælge en defineret værdi fra en liste af variabler. Resultatet af `a ?? b` er `a`, medmindre det er `null/undefined`, så er det `b`.

Sammenligninger
: Lighedstjek `==` for værdier af forskellige typer konverterer dem til et tal (undtagen `null` og `undefined`, der er lige med hinanden og ikke noget andet), så disse er lige:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Andre sammenligninger konverterer også til et tal.

    Den strenge lighedoperator `===` foretager ikke konverteringen: forskellige typer betyder altid forskellige værdier for den.

    Værdierne `null` og `undefined` er specielle: de er `==` lige med hinanden og ikke med noget andet.

    Større/mindre sammenligninger sammenligner strenge tegn for tegn, andre typer konverteres til et tal.

Andre operatorer
: Der er få andre, som komma-operatoren.

Mere information: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Løkker

- Vi har dækket 3 typer løkker:

    ```js
    // 1
    while (betingelse) {
      ...
    }

    // 2
    do {
      ...
    } while (betingelse);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- Variablen, der erklæres i `for(let...)` løkken, er kun synlig inden for løkken. Men vi kan også udelade `let` og genbruge en eksisterende variabel.
- Direktiverne `break/continue` tillader at afslutte hele løkken/den aktuelle iteration. Brug labels til at bryde ud af indlejrede løkker.

Mere information: <info:while-for>.

Senere vil vi studere flere typer løkker til at håndtere objekter.

## "switch"-konstruktionen

"switch"-konstruktionen kan erstatte flere `if`-kontroller. Den bruger `===` (streng lighed) til sammenligninger.

For eksempel:

```js run
let age = prompt('Din alder?', 18);

switch (age) {
  case 18:
    alert("Virker ikke"); // resultatet af prompt er en streng, ikke et tal
    break;

  case "18":
    alert("Virker!");
    break;

  default:
    alert("Enhver værdi, der ikke er lig med en af ovenstående");
}
```

Mere information: <info:switch>.

## Funktioner

Vi har dækket tre måder at oprette en funktion i JavaScript:

1. Funktionsdeklaration: funktionen i hovedkodeflowet

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Funktionsudtryk: funktionen i konteksten af et udtryk

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Arrow functions (pilefunktioner):

    ```js
    // Udtrykket på højre side
    let sum = (a, b) => a + b;

    // eller flersidet syntaks med { ... }, skal bruge return her:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // uden argumenter - skal bruge ()
    let sayHi = () => alert("Hej");

    // med et enkelt argument
    let double = n => n * 2;
    ```


- Funktioner kan have lokale variabler: dem, der erklæres inde i dens krop eller i dens parameterliste. Sådanne variabler er kun synlige inde i funktionen.
- Parametre kan have standardværdier: `function sum(a = 1, b = 2) {...}`.
- Funktioner returnerer altid noget. Hvis der ikke er nogen `return`-sætning, er resultatet `undefined`.

Mere information: se <info:function-basics>, <info:arrow-functions-basics>.


## Der kommer mere...

Ovenstående er en kort liste over JavaScript-funktioner. Indtil videre har vi kun studeret det grundlæggende. Senere i vejledningen vil du finde flere specialfunktioner og og avanceret funktionalitet i JavaScript.
