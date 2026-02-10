# Constructor, operatoren "new"

Den almindelige `{...}` syntaks tillader os at skabe et enkelt objekt. Men ofte har vi brug for at skabe mange lignende objekter, som flere brugere eller menupunkter og så videre.

Det kan gøres ved hjælp af konstruktørfunktioner og `"new"` operatoren.

## Constructor funktion (konstruktør)

Konstruktørfunktioner er teknisk set almindelige funktioner. Der er dog to konventioner:

1. De navngives med stort begyndelsesbogstav.
2. De bør kun køres med `"new"` operatoren.

For eksempel:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Når en funktion køres med `new`, udfører den følgende trin:

1. Et nyt tomt objekt oprettes og tildeles til `this`.
2. Funktionskroppen udføres. Normalt ændrer den `this`, tilføjer nye egenskaber til det.
3. Værdien af `this` returneres.

Med andre ord gør `new User(...)` noget i retning af:

```js
function User(name) {
*!*
  // this = {};  (implicit)
*/!*

  // tilføj egenskaber til this
  this.name = name;
  this.isAdmin = false;

*!*
  // returner this;  (implicit)
*/!*
}
```

Så `let user = new User("Jack")` giver det samme resultat som:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Nu, hvis vi vil skabe andre brugere, kan vi kalde `new User("Ann")`, `new User("Alice")` og så videre. Meget kortere end at bruge litteraler hver gang, og også nemt at læse.

Det er hovedformålet med konstruktører -- at implementere genanvendelig kode til objektoprettelse.

Lad os igen bemærke -- teknisk set kan enhver funktion (undtagen arrow-funktioner, da de ikke har `this`) bruges som en konstruktør. Den kan køres med `new`, og den vil udføre algoritmen ovenfor. "Stort begyndelsesbogstav" er en almindelig aftale for at gøre det klart, at en funktion skal køres med `new`.

````smart header="new function() { ... }"
Hvis vi har mange linjer kode, der handler om oprettelse af et enkelt komplekst objekt, kan vi pakke dem ind i en straks kaldt konstruktørfunktion, sådan her:

```js
// opret en funktion og kald den straks med new
let user = new function() { 
  this.name = "John";
  this.isAdmin = false;

  // ...anden kode til oprettelse af bruger
  // måske kompleks logik og udsagn
  // lokale variabler osv
};
```

Denne konstruktør kan ikke kaldes igen, fordi den ikke er gemt nogen steder, bare oprettet og kaldt. Så dette trick sigter mod at indkapsle koden, der konstruerer det enkelte objekt, uden fremtidig genbrug.
````

## Constructor mode test: new.target

```smart header="Avanceret stuff"
Syntaxen fra denne sektion bruges sjældent, spring den over medmindre du vil vide alt.
```

Inde i en funktion kan vi tjekke, om den blev kaldt med `new` eller uden, ved hjælp af en speciel `new.target` egenskab.

Den er `undefined` for almindelige kald og er lig med funktionen, hvis den kaldes med `new`:

```js run
function User() {
  alert(new.target);
}

// uden "new":
*!*
User(); // undefined
*/!*

// med "new":
*!*
new User(); // function User { ... }
*/!*
```

Det kan bruges inde i funktionen til at vide, om den blev kaldt med `new`, "i konstruktørtilstand", eller uden, "i almindelig tilstand".

Vi kan også få både `new` og almindelige kald til at gøre det samme, sådan her:

```js run
function User(name) {
  if (!new.target) { // hvis du kører mig uden new
    return new User(name); // ...jeg vil tilføje new for dig
  }

  this.name = name;
}

let john = User("John"); // omdirigerer kald til new User
alert(john.name); // John
```

Denne tilgang bruges nogle gange i biblioteker for at gøre syntaksen mere fleksibel. Så folk kan kalde funktionen med eller uden `new`, og det fungerer stadig.
Det er nok ikke en god idé at bruge det overalt, fordi udeladelse af `new` gør det lidt mindre tydeligt, hvad der foregår. Med `new` ved vi alle, at det nye objekt bliver oprettet.

## Returnering fra konstruktører

Normalt har konstruktører ikke en `return`-sætning. Deres opgave er at skrive alt nødvendigt ind i `this`, og det bliver automatisk resultatet.

Men hvis der er en `return`-sætning, så er reglen simpel:

- Hvis `return` kaldes med et objekt, så returneres objektet i stedet for `this`.
- Hvis `return` kaldes med en primitiv, ignoreres primitivværdien.

Med andre ord, `return` med et objekt returnerer det objekt, i alle andre tilfælde returneres `this`.

For eksempel, her overskriver `return` `this` ved at returnere et objekt:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- returnerer dette objekt
}

alert( new BigUser().name );  // Godzilla, modtog objektet
```

Her er et eksempel med en tom `return` (eller vi kunne placere en primitiv efter det, det er ligegyldigt):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- returnerer this
}

alert( new SmallUser().name );  // John
```

Normalt har konstruktører ikke en `return`-sætning. Her nævner vi den specielle opførsel med at returnere objekter primært for fuldstændighedens skyld.

````smart header="Udeladelse af parenteser"
Forresten, vi kan udelade parenteser efter `new`:

```js
let user = new User; // <-- ingen parenteser
// same as
let user = new User();
```

At udelade parenteser her betragtes ikke som en "god stil", men syntaksen er tilladt ifølge specifikationen.
````

## Metoder i konstruktør

At bruge konstruktørfunktioner til at oprette objekter giver en stor grad af fleksibilitet. Konstruktørfunktionen kan have parametre, der definerer, hvordan objektet skal konstrueres, og hvad der skal puttes i det.

Selvfølgelig kan vi tilføje til `this` ikke kun egenskaber, men også metoder.

For eksempel opretter `new User(name)` nedenfor et objekt med det givne `name` og metoden `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "Mit navn er: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // Mit navn er: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

Til oprettelse af komplekse objekter er der en mere avanceret syntaks, [klasser](info:classes), som vi vil dække senere.

## Opsummering

- Konstruktørfunktioner, eller kort sagt konstruktører (constructors på engelsk), er almindelige funktioner, men der er en fælles aftale om at navngive dem med stort begyndelsesbogstav.
- Konstruktørfunktioner bør kun kaldes ved hjælp af `new`. Et sådant kald indebærer oprettelsen af et tomt `this` i starten og returneringen af det udfyldte objekt til sidst.

Vi kan bruge konstruktørfunktioner til at lave flere lignende objekter.

JavaScript leverer konstruktørfunktioner til mange indbyggede sproglige objekter: som `Date` til datoer, `Set` til mængder og andre, som vi planlægger at studere.

```smart header="Objekter, vi kommer tilbage!"
I dette kapitel dækker vi kun det grundlæggende om objekter og konstruktører. De er essentielle for at lære mere om datatyper og funktioner i de næste kapitler.

Efter vi har lært det, vender vi tilbage til objekter og dækker dem grundigt i kapitlerne <info:prototypes> og <info:classes>.
```
