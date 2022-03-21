# Datatyper

En værdi i JavaScript er altid af en bestemt type - f.eks. en tekststreng eller et tal.

Der er otte grundlæggende typer i JavScript. Her vil jeg beskrive dem overordnet og på de næste sider vil jeg tale om hver enkelt mere uddybende.

Du kan putte alle typer data i en variabel. F.eks. kan en variabel på et tidspunkt indeholde en tekststreng og kort efter et tal:

```js
// no error
let message = "hallo";
message = 123456;
```

Sprog der tillader den slags ting kaldes "dynamically typed", hvilket betyder, at der findes datatyper, men variable er ikke bundet af dem.

## Number

```js
let n = 123;
n = 12.345;
```

Datatypen *number* repræsenterer både heltal og kommatal.

Der er mange operatorer vor numre, som f.eks. multiplikation `*`, division `/`, addition `+`, subtraktion `-` og flere andre.

Udover regulære tal findes der også såkaldte "specielle numeriske værdier" der høre med under denne datatype: `Infinity`, `-Infinity` og `NaN`.

- `Infinity` repræsenterer et matematisk [Uendeligt](https://en.wikipedia.org/wiki/Infinity) ∞. Det er en speciel værdi, der er højere end hvilket som helst andet tal.

    Du kan få det som et resultat af at dividere med nul:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Eller referere til det direkte:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` repræsenterer en fejl i en beregning. Det er et resultat af en forkert eller ikke klart defineret matematisk operation:

    ```js run
    alert( "not a number" / 2 ); // NaN, sådan en division resulterer ikke i et tal
    ```

<<<<<<< HEAD
    `NaN` hænger fast. Alle fremtidige oprerationer på `NaN` vil resultere i `NaN`:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

<<<<<<< HEAD
    Så, hvis der er et `NaN` et eller andet sted i udtrykket, så vil det påvirke hele beregningen.
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

```smart header="Matematiske operatorer er sikre"
Matematik er "sikkert" i JavaScript. Du kan gøre alt: dividere med nul, behandle ikke-nummeriske tekststrenge som tal, etc.

Dit script vil aldrig stoppe med en fatal fejl ("die"). Det værste der kan ske er, at du får et `NaN`som resultat.
```

Specielle nummeriske værdier tilfører formelt datatypen "number", selv om de ikke i ordets forstand er tal.

Du lærer mere om at arbejde med tal i kapitlet <info:number>.

## BigInt [#bigint-type]

I JavaScript kan datatypen "Number" ikke repræsentere heltal større end <code>(2<sup>53</sup>-1)</code> (det svarer til `9007199254740991`), eller mindre end <code>-(2<sup>53</sup>-1)</code> for negative tal. Dette skyldes en intern begrænsning.

I de fleste tilfælde er det mere end rigeligt, men nogle gange har du brug for virkelig store tal, f.eks. til kryptografi eller microsekund-præcision i tidsstempler.

`BigInt` datatypen er tilføjet sproget for nyligt til at repræsentere heltal af en vilkårlig længde.

En `BigInt` værdi oprettes ved at tilføje et `n` i slutningen af tallet:

```js
// Et "n" i slutningen betyder at det er et BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Fordi `BigInt` bruges meget sjældent vil jeg ikke dække det yderligere her, men du kan læse mere om dem i et seperat kapitel <info:bigint>. Læs det, hvis du skal arbejde med virkelig store tal.


```smart header="Kompatibilitet"
Som det er nu, understøttes`BigInt` i Firefox/Chrome/Edge/Safari, men ikke i IE.
```

Du kan tjekke [*MDN* BigInt kompatabilitetstabel](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) for et overblik over, hvilke browsere der understøtter.

## String

En string (tekststreng) i JavaScript skal omkranses af anførselstegn (citationstegn).

```js
let str = "Hallo";
let str2 = 'enkelt anførselstegn er også ok';
let phrase = `backtick kan indlejre variable ${str}`;
```

I JavaScript er der tre typer af anførselstegn.

1. Dobbelt anførselstegn: `"Hallo"`.
2. Enkelt anførselstegn: `'Hallo'`.
3. Grave (Backticks): <code>&#96;Hallo&#96;</code>.

Dobbelt og enkelt anførselstegn er "simple" anførselstegn. Der er stort set ingen forskel på dem i JavaScript.

Backticks har "udvidet funktionalitet". De tillader dig at indlejre variable og udtryk i tekststrengen ved at skrive `${…}`, for eksempel:

```js run
let name = "John";

// embed a variable
alert( `Hej, *!*${name}*/!*!` ); // Hej, John!

// embed an expression
alert( `resultatet er *!*${1 + 2}*/!*` ); // resultatet er 3
```

Udtryk inde i `${…}` evalueres først og resultatet bliver en del af tekststrengen. Du kan putte stort set alt ind: en variabel i stil med `name`, en aritmetisk operation som `1 + 2` eller noget mere komplekst.

Vær opmærksom på, at du kun kan gøre dette i backticks. Normale anførselstegn har ikke denne mulighed!
```js run
alert( "resultatet er ${1 + 2}" ); // resultatet er ${1 + 2} (anførselstegn udfører ikke beregningen)
```

Du vil lære mere om tekststrenge i kapitlet <info:string>.

```smart header="Der er ikke en *character* datatype."
I nogle sprog er der en speciel "character" datatype for enkelte karakterer. F.eks. i sproget C og Java findes typen "char".

I JavaScript er der ikke sådan en type. Her er kun én type: `string`. En tekststreng kan indeholde nul karakterer (være tom), en karakter eller mange af dem.
```

## Boolean (logisk type)

Datatypen boolean har to værdier: `true` og `false`.

Denne type bruges normalt til at gemme ja/nej værdier: `true` byder "ja, rigtigt", og `false` betyder "nej, forkert".

For eksempel:

```js
let nameFieldChecked = true; // ja, name feltet er krydset af
let ageFieldChecked = false; // nej, age feltet er ikke krydset af
```

Boolean værdier kan ske som et resultat af en sammeligning:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (sammeligningen er rigtig "ja")
```

Du lærer mere om booleans i kapitlet <info:logical-operators>.

## Værdien "null"

Den specielle `null` værdi hører ikke til nogle af datatyperne beskrevet ovenfor.

Den er sin egen type og kan kun indeholde en `null` værdi:

```js
let age = null;
```

I JavaScript er `null` ikke en "reference til et ikke-eksiserende objekt" eller en "null pointer" som i nogle andre sprog.

Det er simpelthen bare en speciel værdi til at repræsentere "ingenting" eller "tom".

Koden ovenfor fortæller at værdien for `age` ikke findes.

## Værdien "undefined"

Den specielle værdi `undefined` skiller sig også ud. Den er sin egen datatype på samme måde som `null`.

Meningen med `undefined` er "værdien er ikke blevet tildelt".

Hvis en variabel er blevet deklareret, men ikke tildelt en reel værdi er dens værdi `undefined`:

```js run
let age;

alert(age); // viser "undefined"
```

Teknisk set er det muligt eksplicit at tildele en variabel værdien `undefined`:

```js run
let age = 100;

// Ændr værdien til undefined
age = undefined;

alert(age); // "undefined"
```

... men, det anbefaleas ikke. Normalt vil du bruge `null` til at tildele en variabel værdien "tomt" eller "ukendt", hvor `undefined` er reserveret til standard default værdien for variable der ikke har fået værdi tildelt endnu.

## Object og Symbol

Datatypen `object` er speciel.

Alle andre typer kaldes "primitive" fordi deres værdi indeholder én information (en tekststreng, et tal osv.). I modsætning til dette kan objekter gemme komplekse samlinger af information.

Med så mange underliggende muligheder fortjener objekter specialbehandling. Du lærer mere om dem senere i kapitlet <info:object>, efter du har lært mere om primitiver.

Datatypen `symbol` bruges til at skabe unikke identifikationer for objekter. Jeg skriver det her for at du ved, at de findes som datatype, men jeg venter med at forklare dem yderligere før du ved mere om objekter.

## typeof operator [#type-typeof]

`typeof` operatoren returnere datatypen af det argument den modtager. Dette er brugbart hvis du vil arbejde mde værdier af forskellige typer, eller bare vil sikre, at en variabel er af en bestemt type.

<<<<<<< HEAD
Den understøtter to former for syntaks:

1. Som en operator: `typeof x`.
2. Som en funktion: `typeof(x)`.

Sagt på en anden måde, den virker både med og uden paranteser. Resultatet er det samme.

Et kald til `typeof x` returnerer en tekststreng med datatypens navn:
=======
A call to `typeof x` returns a string with the type name:
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

De sidste tre linjer kræver lidt yderligere forklaring:

<<<<<<< HEAD
1. `Math` er et indbygget objekt, der leverer matematiske operationer. Du lærer mere om det i kapitlet <info:number>. Her, skal det bare ses som et eksempel på et objekt.
2. Resultatet af `typeof null` er `"object"`. Det er officielt anerkendt som en fejl i `typeof` opførsel. Det startede i de tidlige dage af JavaScript og er blevet på grund af kompatibilitet. Det er sikkert at `null` ikke er et objekt, men sin egen datatype ... men JavaScript ved det bare ikke.
3. Resultatet af `typeof alert` er `"function"`, fordi `alert` er en funktion. Du lærer mere om funktioner i næste kapitel, hvor du vil se, at der ikke er nogen speciel "funktion" datatype  i JavaScript. Funktioner tilhører typen `object`. Men `typeof` behandler dem forskelligt og returnerer `"function"`. Det fører også tilbage til gamle dage. Teknisk set er det forkert, men kan være praktisk i det daglige.

## Opsummering
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

Der er 8 grundlæggende datatyper i JavaScript.

- `number` til alle slags tal: heltal og kommatal. Heltal er begrænset af <code>±(2<sup>53</sup>-1)</code>.
- `bigint` er til heltal der er meget store.
- `string` er til tekststrenge. En tekststreng kan have nul, en eller flere karakterer. Der er ikke en seperat datatype for enkelte karakterer..
- `boolean` er til `true`/`false` værdier.
- `null` for ukendte værdier -- en selvstændig datatype der kun kan have værdien `null`.
- `undefined` for ikke tildelte værdier -- en selvstændig datatype der kun kan have værdien `undefined`.
- `object` til mere komplekse datastrukturer.
- `symbol` til unik identifikation.

`typeof` operatoren tillader dig at se, hvilken datatype en variabel er.

<<<<<<< HEAD
- To måder: `typeof x` eller `typeof(x)`.
- Returnerer en tekststreng med navnet på datatypen, i stil med `"string"`.
- `null` returnerer `"object"` -- dette er en fejl i sproget, det er ikke et objekt.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

I det næste kapitel vil jeg koncentrere mig om primitive værdier. Så snart du er fortrolig med dem vil jeg gå videre med objekter.
