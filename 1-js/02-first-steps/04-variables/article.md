# Variables

For det meste behøver en JavaScript applikation at arbejde med infromation. Her er to eksempler:
1. En online-butik -- her vil informationen inkludere varer der sælges og hvad der er i indkøbskurven. 
2. En chat applikation -- her vil informationen inkludere brugere, beskeder og meget mere.

Du bruger variable til at gemme disse informationer.

## En variabel

En [variabel](https://en.wikipedia.org/wiki/Variable_(computer_science)) er et "navngivet lager" til data. Du kan bruge variable til at opbevare information om produkter, besøgende o.lign.

For at oprette en variabel i JavaScript bruger du nøgleordet `let`.

Udtrykket nedenfor opretter (også kaldet *deklareres* eller *defineres*) en variabel med navnet "message":

```js
let message;
```

Nu kan du putte data ind i lageret med `=` kaldet en tildelingsoperator (på engelsk assignment operator):

```js
let message;

*!*
<<<<<<< HEAD
message = 'Hallo'; // gemmer tekststrengen Hallo
=======
message = 'Hello'; // store the string 'Hello' in the variable named message
>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e
*/!*
```

Tekststrengen er nu gemt i hukommelsen og knyttet til variablen. Du kan nu tilgå den ved at skrive variabelnavnet:

```js run
let message;
message = 'Hallo!';

*!*
alert(message); // viser indholdet af variablen
*/!*
```

ForDu kan samle det hele - både dekleration og tildeling i én enkelt linje:

```js run
let message = 'Hallo!'; // deklarerer variablen og tildeler den en værdi

alert(message); // Hello!
```

Du kan også oprette flere variable på én linje:

```js no-beautify
let user = 'John', age = 25, message = 'Hallo';
```

Det virker umiddelbart kortere, men er ikke anbefalet. For læsbarhedens skyld vil det ofte være bedre at have en variabel på hver sin linje.

Udgaven på flere linjer er lidt længere, men nemmere at læse:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

<<<<<<< HEAD
Nogle foretrækker at skrive variable over flere linjer således:
=======
Some people also define multiple variables in this multiline style:

>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hallo';
```

... eller endda i en "komma-først" stil:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hallo';
```

Teknisk set gør alle tre udgaver det samme. Det er mere et spørgsmål om personlig stil.


````smart header="`var` i stedet for `let`"
I ældre scripts finder du ofte nøgleordet `var` i stedet for `let`:

```js
*!*var*/!* message = 'Hello';
```

Nøgleordet `var` gør *næsten* det samme som `let`. Det deklarere en variabel, men på en lidt anden, "old-school" måde.

Der er små forskelle mellem `let` og `var`, men de har slet ingen betydning for os endnu. Du vil lære om dem senere i kapitlet <info:var>.
````

## Et eksempel fra virkeligheden

Du kan måske nemmere forstå konceptet omkring variable, hvis du forestiller dig en "kasse" til data med et unikt klistermærke på.

For eksempel kan variablen `message` ses som en kasse kaldet `"message"` med værdien `"Hello!"` i:

![](variable.png)

Du kan putte hvilken som helst værdi i kassen.

Du kan også ændre indholdet. Indholdet kan ændres så tit du vil:

<<<<<<< HEAD
=======
We can also change it as many times as we want:

>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322
```js run
let message;

message = 'Hello!';

message = 'World!'; // indholdet i kassen ændres

alert(message);
```

Når indholdet ændres, fjernes den gamle værdi fra kassen og den nye lægges ned i:

![](variable-change.png)

Du kan også deklarere to variable og kopiere data fra en kasse til en anden.

```js run
let hello = 'Hello world!';

let message;

*!*
// kopier 'Hello world' fra kassen hello til kassen message
message = hello;
*/!*

// Nu indeholder de to variable det samme data
alert(hello); // Hello world!
alert(message); // Hello world!
```

```smart header="Funktionelle sprog"
Som et sidespor, kan det være interessant for dig at vide, at der eksisterer såkaldte [funktionelle](https://en.wikipedia.org/wiki/Functional_programming) pprogrammeringssprog (functional programming) der forbyder, at du ændrer indholdet af variable. Eksempler på sådanne sprog er [Scala](http://www.scala-lang.org/) og [Erlang](http://www.erlang.org/).

I sådanne sprog vil værdien være "gemt i kassen" for evigt. Hvis du vil gemme noget nyt, må du oprette en ny kasse (ny variabel) - du kan ikke bare genbruge den gamle

Det virker måske lidt mærkeligt til at begynde med, men disse sprog er fuldt ud i stand til at udføre noget seriøs programmering. Derudover, er der områder som parallelberegning (parallel computations) hvor den slags begrænsning giver nogle fordele. Når du er blevet bedre til JavaScript vil studier af sprog som disse brede din forståelse af programmering ud - selv om du ikke planlægger at bruge det selv.
```

## Navngivning af variable [#variable-naming]

Der er to begrænsninger for navngivning af variable i JavaScript:

1. Navnet må kun indeholde bogstaver, tal og symbolerne `$` og `_`.
2. Den første karakter må ikke være et tal.

Gyldige navne er f.eks:

```js
let userName;
let test123;
```

Når navnet indeholder flere ord, vil du normalt skrive dem som [camelCase](https://en.wikipedia.org/wiki/CamelCase). Det betyder: Alle ord skrives uden mellemrum og alle ord, undtaget det første, skrives med stort begyndelsesbogstav: `myVeryLongName`.

En interessant detalje -- the dollartegn `'$'` og understreg `'_'` kan også bruges i navne. De er symboler, men optræder på lige fod med bogstaver uden nogen særskilt betydning.

Disse navne er også gyldige:

```js run untrusted
let $ = 1; // Deklarerer en variabel med navnet "$"
let _ = 2; // og her en variabel med navnet "_"

alert($ + _); // 3
```

Eksempler på ugyldige navne:

```js no-beautify
let 1a; // kan ikke starte med et tal

let my-name; // en bindestreg er ikke tilladt i navnet
```

<<<<<<< HEAD
```smart header="Store og små bogstaver betyder noget"
Variable kaldet `apple` og `AppLE` -- er to forskellige variable.
=======
```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e
```

````smart header="Ikke-engelske karakterer er tilladt, men anbefales ikke"
Du kan bruge karakterer fra hvilket som helst sprog - også kyrillisk oa, som f.eks:

```js
let имя = '...';
let 我 = '...';
```

Teknisk set der er ikke fejl her - sådanne navne er tilladt. Men der er en international tradition for at bruge engelsk i navngin´vning af variable. Selv, hvis du laver mindre kodestykker kan de have en lang livetid foran sig og folk fra andre lande har måske behov for at læse det og kunne skrive det på tastaturet.
````

````warn header="Reserverede ord"
Der er en liste med reserverede ord. Disse kan ikke bruges til variable, da de bruges af sproget selv.

For eksempel er ord som `let`, `class`, `return`, `function` reserveret.

Denne kode vil give en syntaksfejl (syntax error):

```js run no-beautify
let let = 5; // kan ikke kalde en variabel "let"!
let return = 5; // heller ikke "return"!
```
````

````warn header="Tildel værdi uden `use strict`"

Normalt vil du deklarere variablen inden du bruger den. Men i gamle dage var det teknisk muligt at oprette en variabel bare ved at give den en værdi (uden først at bruge `let`). Det kan du stadig , hvis du ikke skriver `use strict`. Denne tilgang kan introducere fejl, men er stadig aktiv for at være kompatibel med ældre scripts.

```js run no-strict
// note: ingen "use strict" ii dette eksempel

num = 5; // variablen "num" bliver automatisk oprettet fordi den ikke fandtes

alert(num); // 5
```

Det er dårlig praksis og vil give fejl i strict mode:

```js run untrusted
"use strict";

*!*
num = 5; // fejl: num er ikke defineret
*/!*
```

````

## Konstanter

Du kan oprette en konstant variabel (en variabel, der ikke kan ændres). Det gør du ved at bruge nøgleordet `const` i stedet for `let`:

```js
const myBirthday = '23.08.1973';
```

Variable der deklareres med `const` kaldes "konstanter". De kan ikke ændres og et forsøg på et vil resultere i en fejlmeddelelse:

```js run
const myBirthday = '23.08.1973';

myBirthday = '01.01.2001'; // fejl, kan ikke tildele ny værdi til en konstant!
```

Når en programmør vil være sikker på, at en værdi ikke bliver ændret kan han bruge `const` for derved også klart at signalere at den ikke må røres til andre der læser koden.

<<<<<<< HEAD

### Bar store bogstaver til konstanter
=======
### Uppercase constants
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

Det er en udbredt praksis at bruge konstanter til værdier der kan være svære at huske eller forstå mens der udvikles.

Sådanne konstanter bliver skrevet med store bogstaver og underscore.

Sådan her:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...når du skal bruge farven skriver du
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Fordele:

- `COLOR_ORANGE` er meget lettere at læse end `"#FF7F00"`.
- Det er nemmere at skrive fejl i `"#FF7F00"` end i `COLOR_ORANGE`.
- Når du læser koden vil `COLOR_ORANGE` give mere mening end `#FF7F00`.

Men, hvornår skal du bruge store bogstaver til konstanter og hvornår skal du skrive dem i camelcase? Lad mig prøve at forklare det på denne måde:

At være en "konstant" betyder, at indholdet aldrig kan ændres. Men, der er konstanter der kendes inden programmet afvikles (som hexadecimal værdien for farven rød) og der er konstanter der bliver regnet ud, når programmet startes, men ikke ændres så snart de er oprettet.

<<<<<<< HEAD
For eksempel:
=======
For instance:

>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322
```js
const pageLoadTime = /* tid det tog at hente siden */;
```

Værdien af `pageLoadTime` kan ikke kendes inden siden hentes, så den navngives i camelcase. Men, det er stadig en konstant fordi den ikke kan ændres efterfølgende.

<<<<<<< HEAD
Med andre ord. Konstanter med store bogstaver (kapitæler) bruges kun til "hard-coded" værdier.  
=======
In other words, capital-named constants are only used as aliases for "hard-coded" values.
>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e

## Giv variable de rigtige navne

Når vi nu taler om variable er der en anden meget vigtig pointe.

Giv variable nogle meningsfulde navne. Giv dig gerne lidt tid til at tænke over dem, hvis det er krævet.

Navngivning af variable er en meget vigtig og faktisk lidt svær færdighed at mestre i programmering. Et hurtigt blik på variabelnavne viser ofte om det er en begynder eller en mere erfaren udvikler.

I virkelige projekter bruges meget af tiden på at modificere og udvide den eksisterende kodebase, mere end at lave noget helt nyt fra bunden. Når du vender tilbage til en kode efter noget tid og arbejde med andet, er det nemmere at forstå og arbejde med, hvis det er navngivet ordenligt - når variable har gode navne.

Brug noget tid på at tænke over det rigtige navn, inden du opretter din variabel. Du vil takke dig selv senere.

Et par gode regler er:

- Skriv læsbare navne som `userName` eller `shoppingCart`.
- Hold dig fra forkortelser eller helt små navne som `a`, `b`, `c`, med mindre du virkelig ved, hvad du laver.
- Lav dem beskrivende men kortfattede. Dårlige navne er `data` og `value` - de siger ikke meget om indholdet. De er kun anbefalet, hvis det er åbenlyst i hvilken sammenhæng de skal læses og forstås.
- Sæt dig fast på retningslinjer - alene eller i din gruppe. Hvis en besøgende på et website kaldes "user" så fortsæt med variable som `currentUser` og `newUser`, ikke `currentVisitor` og `newManInTown`.

Det lyder simpelt, ikke? Det er det faktisk også, men det kræver en del øvelse at skrive gode beskrivende men korte variabelnavne.

```smart header="Genbrug eller ny variabel?"
En sidste bemærkning. Der er dovne programmører der genbruger gamle variable i stedet for at oprette nye.

Et resultat af dette er en kasse, hvor der kan smides meget forskelligt i uden at ændre dens label. Hvad er der i den nu? Det kan være svært at vide, hvis kassen er blevet generisk.

Sådanne udviklere sparer lidt tid ved oprettelsen af variablen, men bruger måske mere tid på fejlretning af sin kode.

En ekstra variabel er godt, ikke dårligt.

Moderne JavaScript minimerer og browsere optimerer kode godt nok til, at det ikke skaber performance problemer. At bruge forskellige variable til forskellige værdier kan endda nogle gange hjælpe med at optimere afviklingen.
```

## Opsummering

Du kan deklarere variable for at gemme data. Det kan gøres med nøgleordet `var`, `let` eller `const`.

- `let` -- er den nye måde at deklarere variable.
- `var` -- er den gamle måde at deklarere variable. Du vil normalt ikke bruge den mere. Du vil lære om forskelle på `var`og `let`i kaptitlet <info:var>.
- `const` -- virker som `let`, men værdien kan ikke ændres efter den er oprettet..

Variable skal navngives så det er nemt at forstå, hvilken infromation de indeholder.
