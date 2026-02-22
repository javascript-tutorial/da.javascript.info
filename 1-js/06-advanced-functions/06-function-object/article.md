
# Funktion som objekt, NFE

Som vi allerede har set er en funktion i JavaScript en værdi.

Alle værdier i JavaScript har en type. Hvad type har en funktion?

I JavaScript er funktioner objekter.

En god måde at forestille sig funktioner er som kaldbare "handlingsobjekter". Vi kan ikke kun kalde dem, men også behandle dem som objekter: tilføje/fjerne egenskaber, videregive som reference osv.


## Egenskaben "name"

Funktionens objekt indeholder nogle brugbare egenskaber.

For eksempel er en funktions navn tilgængeligt som egenskaben "name":

```js run
function sayHi() {
  alert("Hej);
}

alert(sayHi.name); // sayHi
```

Det er lidt pudsigt, men tildeling af navne er smart. Det tildeler også det korrekte navn til en funktion, selv hvis den oprettes uden et navn og derefter øjeblikkeligt tildeles til en variabel:

```js run
let sayHi = function() {
  alert("Hej");
};

alert(sayHi.name); // sayHi (den har fået et navn!)
```

Det virker også hvis tildelingen er sket via en standardværdi:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (virker!)
}

f();
```

I specifikationen kaldes denne funktion "contextual name". Hvis funktionen ikke har et navn, så bliver det tildelt et fra konteksten.

Objektets metoder har også navne, som er deres nøgle i objektet:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Der skabes dog ikke navne ud af den blå luft. Der er situationer hvor det er umuligt at finde det korrekte navn. I sådanne tilfælde er `name`-egenskaben tom, som her:

```js run
// funktion oprettet inde i et array
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// motoren har ingen måde at finde det korrekte navn, så den får ikke noget
```

I praksis vil langt de fleste funktioner dog have et navn.

## Egenskaben "length"

Der er en anden indbygget egenskab "length" som returnerer antallet af funktionsparametre, for eksempel:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Som vi kan se ovenfor så bliver rest parameteren ikke talt med.

Egenskaben `length` bruges nogle gange til [introspection](https://en.wikipedia.org/wiki/Type_introspection) i funktioner der opererer på andre funktioner.

For eksempel vil koden nedenfor vil funktionen `ask` acceptere et `question` der skal spørges efter og et antal `handler` funktioner der kan kaldes.

Så snart brugeren giver deres svar vil funktionen kalde de leverede handlers. Vi kan levere to slags handlers:

- En funktion uden argumenter, som kun kaldes når brugeren giver et positivt svar.
- En funktion med argumenter, som kaldes i begge tilfælde og returnerer et svar.

For at kalde `handler` på den rigtige måde undersøger vi egenskaben `handler.length`.

Idéen er at vi har en simpel syntaks uden argumenter for positive svar (mest almindeligt), men også er i stand til at understøtte universelle handlers der kan håndtere både positive og negative svar, hvis det er nødvendigt.:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// for positive svar, begge handlers kaldes
// for negative svar, kun den anden
ask("Spørgsmål?", () => alert('Du sagde ja'), result => alert(result));
```

Dette er et særligt mønster i programmering kaldet [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) -- der behandler argumenter forskelligt alt efter type - i vores tilfælde afhængigt af `length`. Metoden ses ofte brugt i JavaScript-biblioteker.

## Brugerdefinerede egenskaber

Vi kan også tilføje vores egne egenskaber.

Her tilføjer vi egenskaben `counter` for at spore antallet af kald:

```js run
function sayHi() {
  alert("Hej");

  *!*
  // lad os tælle hvor mange gange vi kaldes
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // startværdi

sayHi(); // Hej
sayHi(); // Hej

alert( `Kaldt ${sayHi.counter} gang(e)` ); // Kaldt 2 gang(e)
```

```warn header="En egenskab er ikke en variabel"
En egenskab tildelt til en funktion som `sayHi.counter = 0` definerer *ikke* en lokal variabel `counter` inde i den. Med andre ord, egenskaben `counter` og en variabel `let counter` er to forskellige ting.

Vi kan behandle en funktion som et objekt, gemme egenskaber i den, men det har ingen effekt på dens udførelse. Lokale variable er ikke funktionsegenskaber og omvendt. Disse er to parallelle verdener.
```

Egenskaber i funktioner kan nogle gange erstatte closures. For eksempel kan vi omskrive counter-funktionen fra kapitlet <info:closure> til at bruge en funktionsegenskab i stedet for en variabel i en closure:

```js run
function makeCounter() {
  // i stedet for:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count` er nu gemt direkte i funktionen, ikke i dens ydre leksikale miljø.

Er det bedre eller værre end at bruge en closure?

Den vigtigste forskel er at hvis værdien af `count` lever i en ydre variabel, så kan ekstern kode ikke tilgå den - kun indre funktioner kan ændre den. Og hvis den er bundet til en funktion, så er det muligt:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Så valget af implementering afhænger af vores mål.

## Navngivet funktionsudtryk (Named Function Expression)

Navngivet funktionsudtryk eller NFE er et udtryk for funktionsudtryk der har et navn.

Tag for eksempel et almindeligt funktionsudtryk:

```js
let sayHi = function(who) {
  alert(`Hej, ${who}`);
};
```

og tilføj et navn til det:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hej, ${who}`);
};
```

Men hvad opnår vi ved det? Hvad er meningen med et ekstra "func" som navn?

Det første vi skal huske er, at vi stadig har et funktionsudtryk. Tilføjelsen af navnet `"func"` efter `function` gjorde det ikke til en funktionsdeklaration, fordi det stadig er oprettet som en del af et tildelingsudtryk.

Tilføjelsen af et navn påvirker ikke noget andet.

Funktionen er stadig tilgængelig som `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hej, ${who}`);
};

sayHi("John"); // Hej, John
```

Der er to særlige ting ved navnet `func` som kan udnyttes:

1. Det tillader funktionen at referere til sig selv internt.
2. Det er ikke synligt uden for funktionen.

For eksempel, funktionen `sayHi` nedenfor kalder sig selv igen med `"Guest"` hvis ingen `who` er angivet:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hej, ${who}`);
  } else {
*!*
    func("Guest"); // brug func til at kalde dig selv igen
*/!*
  }
};

sayHi(); // Hej, Guest

// Men dette virker ikke:
func(); // Fejl, func er ikke defineret (ikke synlig uden for funktionen)
```

Men hvorfor vil vi bruge `func`? Hvorfor ikke bare bruge `sayHi` for det indlejrede kald?


Vi kan faktisk i de fleste tilfælde bruge `sayHi` for det indlejrede kald, og det vil fungere fint:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hej, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

Problemet med denne kode er at `sayHi` kan ændres i det ydre kode. Hvis funktionen bliver tildelt til en anden variabel i stedet, vil koden begynde at give fejl:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hej, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Fejl: sayHi er ikke en funktion
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Fejl, det indlejrede sayHi kald virker ikke mere!
```

Dette sker fordi funktionen tager `sayHi` fra dens ydre leksikale miljø. Der er ingen lokal `sayHi`, så den ydre variabel bruges. Og ved det øjeblik hvor funktionen kaldes, er den ydre `sayHi` `null`.

Det valgfrie navn som vi kan tilføje til et funktionsudtryk er ment til at løse præcis disse typer af problemer.

Lad os bruge det til at fikse vores kode:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hej, ${who}`);
  } else {
*!*
    func("Guest"); // Nu virker det
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hej, Guest (indlejret kald virker)
```

Nu virker det fordi navnet `"func"` er funktionslokal. Det er ikke taget fra uden for (og ikke synligt der). Speficikationen garanterer at det altid vil referere til den nuværende funktion.

Det ydre kode har stadig sin variabel `sayHi` eller `welcome`. Og `func` er et "internt funktionsnavn", måden for funktionen at kalde sig selv på på en pålidelig måde.

```smart header="Du har ikke den mulighed med en funktionserklæring"
Det "interne navn" er kun tilgængeligt for funktionsudtryk, ikke for funktionserklæringer. For funktionserklæringer findes der ingen syntaks til at tilføje et "internt" navn.

Hvis vi har brug for et pålideligt internt navn, er det den grund til at omskrive en funktionserklæring til et navngivet funktionsudtryk (Named Function Expression).
```

## Opsummering

Funktioner er objekter.

Vi har deres egenskaber.:

- `name` -- funktionens navn. Ofte taget fra funktionsdefinitionen, men hvis der ikke er nogen, forsøger JavaScript at gætte det ud fra konteksten (f.eks. en tildeling).
- `length` -- antallet af argumenter i funktionsdefinitionen. Rest-parametre tælles ikke.

Hvis funktionen er deklareret som et funktionsudtryk (ikke i hovedkodeflowet), og den bærer et navn, så kaldes det et navngivet funktionsudtryk (Named Function Expression). Navnet kan bruges inde i funktionen til at referere til sig selv, for rekursive kald eller lignende.

Desuden kan funktioner også bære yderligere egenskaber. Mange kendte JavaScript-biblioteker gør brug af denne funktion.

De opretter en "hoved" funktion og tilkobler mange "hjælpe" funktioner til den. For eksempel opretter biblioteket [jQuery](https://jquery.com) en funktion kaldet `$`. Biblioteket [lodash](https://lodash.com) opretter en funktion kaldet `_` og tilføjer `_.clone`, `_.keyBy` og andre egenskaber til det (se eventuelt [dokumentationen](https://lodash.com/docs) hvis du vil lære mere om dem). Faktisk gør de det for at mindske deres forurening af det globale objekt, så en enkelt bibliotek kun giver én global variabel. Det reducerer muligheden for navnekonflikter.


Så en funktion kan udføre en nyttig opgave alene men også udvide dens muligheder ved at udnytte dens egne egenskaber.
