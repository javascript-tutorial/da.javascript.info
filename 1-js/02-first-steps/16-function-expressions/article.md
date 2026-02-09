# Funktionsudtryk

I JavaScript er en funktion ikke en "magisk sproglig struktur", men en særlig slags værdi.

Den syntaks, vi brugte før, kaldes en *Funktionsdeklaration*:

```js
function sayHi() {
  alert( "Hello" );
}
```

Der findes en anden syntaks til at oprette en funktion, som kaldes et *Funktionsudtryk*.

Det tillader os at oprette en ny funktion midt i en hvilken som helst udtryk.

For eksempel:

```js
let sayHi = function() {
  alert( "Hej" );
};
```

Her kan vi se en variabel `sayHi` få en værdi som er den nye funktion, oprettet som `function() { alert("Hej"); }`.

Da funktionen oprettes i kontekst af en tildeling (til højre for `=`), er dette et *Funktionsudtryk*.

Læg mærke til, at der ikke er noget navn efter `function`-nøgleordet. At udelade et navn er tilladt for Funktionsudtryk.

Her tildeler vi den straks til variablen, så betydningen af disse kodeeksempler er den samme: "opret en funktion og læg den i variablen `sayHi`".

I mere avancerede situationer, som vi vil støde på senere, kan en funktion oprettes og straks kaldes eller planlægges til senere udførelse, uden at blive gemt nogen steder, og dermed forblive anonym.

## Funktion er en værdi

Lad os gentage: uanset hvordan funktionen oprettes, er en funktion en værdi. Begge eksempler ovenfor gemmer en funktion i variablen `sayHi`.

Vi kan endda udskrive den værdi ved hjælp af `alert`:

```js run
function sayHi() {
  alert( "Hej" );
}

*!*
alert( sayHi ); // viser funktionens kode
*/!*
```

Vær opmærksom på, at den sidste linje ikke kører funktionen, fordi der ikke er nogen parenteser efter `sayHi`. Der findes programmeringssprog, hvor enhver omtale af et funktionsnavn forårsager dens udførelse, men JavaScript er ikke sådan.

I JavaScript er en funktion en værdi, så vi kan behandle den som en værdi. Koden ovenfor viser dens strengrepræsentation, som er kildekoden.

Med det sagt er en funktion en særlig værdi, i den forstand at vi kan kalde den som `sayHi()`.

Men det er stadig en værdi. Så vi kan arbejde med den ligesom med andre slags værdier.

Vi kan kopiere en funktion til en anden variabel:

```js run no-beautify
function sayHi() {   // (1) opret
  alert( "Hej" );
}

let func = sayHi;    // (2) kopier

func(); // Hej     // (3) kør kopien (det virker)!
sayHi(); // Hej    //     dette virker stadig også (hvorfor skulle det ikke)
```

Her er en detaljeret gennemgang af, hvad der sker ovenfor:

1. Funktionsdeklarationen `(1)` opretter funktionen og lægger den i variablen med navnet `sayHi`.
2. Linje `(2)` kopierer den til variablen `func`. Bemærk igen: der er ingen parenteser efter `sayHi`. Hvis der var, ville `func = sayHi()` skrive *resultatet af kaldet* `sayHi()` ind i `func`, ikke *funktionen* `sayHi` selv.
3. Nu kan funktionen kaldes både som `sayHi()` og `func()`.

Vi kunne også have brugt et Funktionsudtryk til at erklære `sayHi` i den første linje:

```js
let sayHi = function() { // (1) opret
  alert( "Hej" );
};

let func = sayHi;  //(2)
// ...
```

Alt vil fungere på samme måde.


````smart header="Hvorfor er der et semikolon til sidst?"
Du undrer dig måske over, hvorfor Funktionsudtryk har et semikolon `;` til sidst, men Funktionsdeklarationer ikke har:


```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Svaret er simpelt: et Funktionsudtryk oprettes her som `function(…) {…}` inde i tildeling: `let sayHi = …;`. Semikolonet `;` anbefales i slutningen af sætningen, det er ikke en del af funktionssyntaksen.

Et semikolon vil være der for en enklere tildeling, såsom `let sayHi = 5;`, og det er også på samme måde være der for en funktionstildeling.
````

## Callback-funktioner

Lad os se flere eksempler på at videregive funktioner som værdier og bruge funktionsudtryk.

Vi vil skrive en funktion `ask(question, yes, no)` med tre parametre:

`question`
: Teksten til spørgsmålet

`yes`
: Funktion, der skal køres, hvis svaret er "Ja"

`no`
: Funktion, der skal køres, hvis svaret er "Nej"

Funktionen skal stille `question` og, afhængigt af brugerens svar, kalde `yes()` eller `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "Du er enig." );
}

function showCancel() {
  alert( "Du annullerede udførelsen." );
}

// brug: funktionerne showOk, showCancel videregives som argumenter til ask
ask("Er du enig?", showOk, showCancel);
```

I praksis er sådanne funktioner ret nyttige. Den største forskel mellem en virkelig `ask` og eksemplet ovenfor er, at virkelige funktioner bruger mere komplekse måder at interagere med brugeren på end en simpel `confirm`. I browseren tegner sådanne funktioner normalt et flot spørgsmålsvindue. Men det er en anden historie.

**Argumenterne `showOk` og `showCancel` til `ask` kaldes *callback-funktioner* eller bare *callbacks*.**

Idéen er, at vi videregiver en funktion og forventer, at den bliver "kaldt tilbage" senere, hvis det er nødvendigt. I vores tilfælde bliver `showOk` callback'en for "ja"-svaret, og `showCancel` for "nej"-svaret.

Vi kan bruge Funktionsudtryk til at skrive en ækvivalent, kortere funktion:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Er du enig?",
  function() { alert("Du er enig."); },
  function() { alert("Du annullerede udførelsen."); }
);
*/!*
```

Her er funktionerne erklæret inde i selve `ask(...)` kaldet. De har ikke noget navn, og kaldes derfor *anonyme*. Sådanne funktioner er ikke tilgængelige uden for `ask` (fordi de ikke er tildelt til variabler), men det er netop det, vi ønsker her.

Sådan kode optræder meget naturligt i vores scripts, det er i JavaScripts ånd.

```smart header="En funktion er en værdi, der repræsenterer en \"handling\""
Regulære værdier som strenge eller tal repræsenterer *data*.

En funktion kan opfattes som en *handling*.

Vi kan videregive den mellem variabler og køre den, når vi ønsker.
```


## Funktionsudtryk vs Funktionsdeklaration

Lad os formulere de vigtigste forskelle mellem Funktionsdeklarationer og Udtryk.

Først syntaksen: hvordan man skelner mellem dem i koden.

- *Funktionsdeklaration:* en funktion, der erklæres som en separat sætning i hovedkodeflowet:

    ```js
    // Funktionsdeklaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Funktionsudtryk:* en funktion, der oprettes inde i et udtryk eller inde i en anden syntaks-konstruktion. Her oprettes funktionen på højre side af "tildelingsudtrykket" `=`:

    ```js
    // Funktionsudtryk
    let sum = function(a, b) {
      return a + b;
    };
    ```

Den mere subtile forskel er *hvornår* en funktion oprettes af JavaScript-motoren.

**Et funktionsudtryk oprettes, når udførelsen når det, og det kan kun bruges fra det øjeblik.**

Når udførelsesflowet passerer til højre side af tildelingen `let sum = function…` -- sker det. Funktionen oprettes og kan bruges (tildeles, kaldes osv.) fra nu af.

Funktionsdeklarationer er anderledes.

**En funktionsdeklaration kan kaldes tidligere, end den er defineret.**

For eksempel er en global Funktionsdeklaration synlig i hele scriptet, uanset hvor den er.

Det skyldes interne algoritmer. Når JavaScript forbereder sig på at køre scriptet, leder det først efter globale Funktionsdeklarationer i det og opretter funktionerne. Vi kan tænke på det som en "initialiseringsfase".

Og efter at alle Funktionsdeklarationer er behandlet, udføres koden. Så den har adgang til disse funktioner.

For eksempel virker dette:

```js run refresh untrusted
*!*
sayHi("John"); // Hej, John
*/!*

function sayHi(name) {
  alert( `Hej, ${name}` );
}
```

Funktionsdeklarationen `sayHi` oprettes, når JavaScript forbereder sig på at starte scriptet, og den er synlig overalt i det.

...Hvis det var et Funktionsudtryk, ville det ikke virke:

```js run refresh untrusted
*!*
sayHi("John"); // fejl!
*/!*

let sayHi = function(name) {  // (*) magien ophører
  alert( `Hej, ${name}` );
};
```

Funktionsudtryk oprettes, når udførelsen når dem. Det ville kun ske i linjen `(*)`. For sent.

En anden særlig egenskab ved Funktionsdeklarationer er deres blokscope.

**I strict mode, når en Funktionsdeklaration er inden for en kodeblok, er den synlig overalt inde i den blok. Men ikke uden for den.**

Lad os for eksempel forestille os, at vi skal erklære en funktion `welcome()` afhængigt af variablen `age`, som vi får under kørsel. Og som vi planlægger at bruge igen senere.

Hvis vi bruger Funktionsdeklaration, vil det ikke virke som forventet:

```js run
let age = prompt("Hvor gammel er du?", 18);

// betinget erklæring af en funktion
if (age < 18) {

  function welcome() {
    alert("Hej!");
  }

} else {

  function welcome() {
    alert("Velkommen!");
  }

}

// ...bruges senere
*!*
welcome(); // Fejl: welcome er ikke defineret
*/!*
```

Det skyldes, at en Funktionsdeklaration kun er synlig inden for den kodeblok, den befinder sig i (if-betingelsen).

Her er et andet eksempel:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (kører)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Hej!");       //  |  Funktionsdeklarationen er tilgængelig
  }                        //  |  overalt i den blok, hvor den er erklæret
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Nu er vi uden for krøllede parenteser,
// så vi kan ikke se Funktionsdeklarationer lavet inden for dem.

*!*
welcome(); // Fejl: welcome er ikke defineret
*/!*
```

Hvad kan vi gøre for at gøre `welcome` synlig uden for `if`?

Den korrekte tilgang ville være at bruge et Funktionsudtryk og tildele `welcome` til den variabel, der er erklæret uden for `if` og har den rette synlighed.

Denne kode fungerer som forventet:

```js run
let age = prompt("Hvor gammel er du?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hej!");
  };

} else {

  welcome = function() {
    alert("Velkommen!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Eller vi kan forenkle det endnu mere ved at bruge spørgsmålstegnsoperatoren `?`:

```js run
let age = prompt("Hvor gammel er du?", 18);

let welcome = (age < 18) ?
  function() { alert("Hej!"); } :
  function() { alert("Velkommen!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="Hvornår skal du vælge Funktionsdeklaration versus Funktionsudtryk?"
Som en tommelfingerregel, når vi skal erklære en funktion, er det første, vi skal overveje, Funktionsdeklarationssyntaksen. Den giver mere frihed i, hvordan vi organiserer vores kode, fordi vi kan kalde sådanne funktioner, før de er erklæret.

Det er også bedre for læsbarheden, da det er nemmere at finde `function f(…) {…}` i koden end `let f = function(…) {…};`. Funktionsdeklarationer er mere "iøjnefaldende".

...Men hvis en Funktionsdeklaration ikke passer til os af en eller anden grund, eller vi har brug for en betinget erklæring (vi har lige set et eksempel), så skal Funktionsudtryk bruges.
```

## Opsummering

- Funktioner er værdier. De kan tildeles, kopieres eller erklæres hvor som helst i koden.
- Hvis funktionen erklæres som en separat erklæring i hovedkodeflowet, kaldes det en "Funktionsdeklaration".
- Hvis funktionen oprettes som en del af et udtryk, kaldes det et "Funktionsudtryk".
- Funktionsdeklarationer behandles, før kodeblokken udføres. De er synlige overalt i blokken.
- Funktionsudtryk oprettes, når udførelsesflowet når dem.

I de fleste tilfælde, når vi skal erklære en funktion, er en Funktionsdeklaration at foretrække, fordi den er synlig før selve erklæringen. Det giver os mere fleksibilitet i kodeorganiseringen og er normalt mere læseligt.

Så vi bør kun bruge et Funktionsudtryk, når en Funktionsdeklaration ikke passer til opgaven. Vi har set et par eksempler på det i dette kapitel og vil se flere i fremtiden.
