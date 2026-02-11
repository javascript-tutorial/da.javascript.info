# Tal (Numbers)

I moderne JavaScript findes der to typer tal:

1. Almindelige tal i JavaScript gemmes i 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), også kendt som "double precision floating point numbers". Det er de tal, vi bruger det meste af tiden, og vi vil tale om dem i dette kapitel.

2. BigInt-tal repræsenterer heltal af vilkårlig længde. De er nogle gange nødvendige, fordi et almindeligt heltal ikke sikkert kan overstige <code>(2<sup>53</sup>-1)</code> eller være mindre end <code>-(2<sup>53</sup>-1)</code>, som vi nævnte tidligere i kapitlet <info:types>. Da bigints bruges i nogle få særlige tilfælde, dedikerer vi dem til et særligt kapitel <info:bigint>.

Så her vil vi tale om almindelige tal. Lad os udvide vores viden om dem.

## Flere måder at skrive et tal på

Forestil dig, at vi skal skrive 1 milliard. Den oplagte måde er:

```js
let billion = 1000000000;
```

Vi kan også bruge underscore `_` som separator:

```js
let billion = 1_000_000_000;
```

Her spiller underscore `_` rollen som "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", det gør tallet mere læsbart. JavaScript-motoren ignorerer simpelthen `_` mellem cifre, så det er præcis den samme milliard som ovenfor.

I dagligdagen prøver vi dog at undgå at skrive lange sekvenser af nuller. Vi er for dovne til det. Vi prøver at skrive noget som `"1 mio."` for en million eller `"7.3 mia."` for 7 milliarder 300 millioner. Det samme gælder for de fleste store tal.

I JavaScript kan vi forkorte et tal ved at tilføje bogstavet `"e"` til det og angive antallet af nuller:

```js run
let mia = 1e9;  // 1 milliard, bogstaveligt: 1 og 9 nuller

alert( 7.3e9 );  // 7.3 milliarder (det samme som 7300000000 eller 7_300_000_000)
```

Med andre ord multiplicerer `e` tallet med `1` efterfulgt af det angivne antal nuller.

```js
1e3 === 1 * 1000; // e3 betyder *1000
1.23e6 === 1.23 * 1000000; // e6 betyder *1000000
```

Nu lad os skrive noget der er meget småt. For eksempel, 1 mikrosekund (en milliontedel af et sekund):

```js
let mсs = 0.000001;
```

Ligesom før kan brugen af `"e"` hjælpe. Hvis vi gerne vil undgå at skrive nullerne eksplicit, kan vi skrive det samme som:

```js
let mcs = 1e-6; // fem nuller til venstre for 1
```

Hvis vi tæller nullerne i `0.000001`, er der 6 af dem. Så naturligvis er det `1e-6`.

Med andre ord betyder et negativt tal efter `"e"` en division med 1 efterfulgt af det angivne antal nuller:

```js
// -3 dividerer med 1 med 3 nuller
1e-3 === 1 / 1000; // 0.001

// -6 dividerer med 1 med 6 nuller
1.23e-6 === 1.23 / 1000000; // 0.00000123

// et eksempel med et større tal
1234e-2 === 1234 / 100; // 12.34, decimalpunktet flytter sig 2 gange
```

### Hexadecimale, binære og oktale tal

[Hexadecimale](https://en.wikipedia.org/wiki/Hexadecimal) tal bruges bredt i JavaScript til at repræsentere farver, kode tegn og til mange andre ting. Så naturligvis findes der en kortere måde at skrive dem på: `0x` og derefter tallet.

For eksempel:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (det samme, store og små bogstaver betyder ikke noget)
```

Binære og oktale talsystemer bruges sjældent, men understøttes også ved hjælp af præfikserne `0b` og `0o`:


```js run
let a = 0b11111111; // binær form af 255
let b = 0o377; // oktal form af 255

alert( a == b ); // true, det samme tal 255 på begge sider
```

Der er kun 3 talsystemer der direkte understøttes på denne måde. For andre talsystemer skal vi bruge funktionen `parseInt` (som vi vil se senere i dette kapitel).

## toString(base)

Metoden `num.toString(base)` returnerer en strengrepræsentation af `num` i talsystemet med den givne `base`.

For example:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` kan variere fra `2` til `36`. Som standard er den `10`.

Udbredte brugsscenarier for dette er:

- **base=16** bruges til hex farver, tegnkodninger osv., cifrene kan være `0..9` eller `A..F`.
- **base=2** bruges mest til fejlfinding af bitvise operationer, cifrene kan være `0` eller `1`.
- **base=36** er det maksimale, cifrene kan være `0..9` eller `A..Z`. Hele det latinske alfabet bruges til at repræsentere et tal. Et sjovt, men nyttigt tilfælde for `36` er, når vi skal gøre en lang numerisk identifikator kortere, for eksempel for at lave en kort URL. Kan simpelthen repræsentere det i talsystemet med base `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="To punktummer To punktummer for at kalde en metode direkte på et tal"
Bemærk, at to punktummer i `123456..toString(36)` ikke er en slåfejl. Hvis vi vil kalde en metode direkte på et tal, som `toString` i eksemplet ovenfor, så skal vi placere to punktummer `..` efter det.

Hvis vi placerer et enkelt punktum: `123456.toString(36)`, så vil der opstå en fejl, fordi JavaScript-syntaksen antyder den decimale del efter det første punktum. Og hvis vi placerer et punktum mere, så ved JavaScript, at den decimale del er tom, og nu bruger den metoden.

Vi kan også skrive `(123456).toString(36)`.

```

## Afrunding

En af de mest brugte operationer, når man arbejder med tal, er afrunding.

Der findes flere indbyggede funktioner til afrunding:

`Math.floor`
: Runder nedad: `3.1` bliver til `3`, og `-1.1` bliver til `-2`.

`Math.ceil`
: Runder opad: `3.1` bliver til `4`, og `-1.1` bliver til `-1`.

`Math.round`
: Runder til det nærmeste heltal: `3.1` bliver til `3`, `3.6` bliver til `4`. I midtertilfælde runder `3.5` op til `4`, og `-3.5` runder op til `-3`.

`Math.trunc` (understøttes ikke af Internet Explorer)
: Fjerner alt efter decimaltegnet uden afrunding: `3.1` bliver til `3`, `-1.1` bliver til `-1`.

Her er en tabel, der opsummerer forskellene mellem dem:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Disse funktioner dækker alle mulige måder at håndtere decimaldelen af et tal på. Men hvad nu hvis vi gerne vil runde tallet til det `n-te` ciffer efter decimaltegnet?

Hvad hvis vi for eksempel har `1.2345` og ønsker at runde det til 2 cifre, så vi kun får `1.23`?

Der er to måder at gøre det på:

1. Multiplicer-og-divider.
    Hvis vi vil afrunde tallet til det 2. ciffer efter decimaltegnet, kan vi multiplicere tallet med `100`, kalde afrundingsfunktionen og derefter dividere det tilbage.
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Metoden [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) runder tallet til `n` cifre efter decimaltegnet og returnerer en strengrepræsentation af resultatet.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Dette runder op eller ned til den nærmeste værdi, svarende til `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Bemærk, at resultatet af `toFixed` er en tekststreng. Hvis decimaldelen er kortere end krævet, tilføjes nuller til slutningen:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", tilføjede nuller for at få præcis 5 cifre
    ```

    Vi kan konvertere det til et tal ved hjælp af det unære plus eller et `Number()`-kald, f.eks. skriv `+num.toFixed(5)`.

## Unøjagtige beregninger

Internt repræsenteres et tal i 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), så der er præcis 64 bits til at gemme et tal: 52 af dem bruges til at gemme cifrene, 11 af dem gemmer positionen af decimaltegnet, og 1 bit er til fortegnet.

Hvis et tal er virkelig stort, kan det overskride 64-bit lageret og blive en speciel numerisk værdi `Infinity`:

```js run
alert( 1e500 ); // Infinity
```

Hvad der måske er lidt mindre åbenlyst, men sker ret ofte, er tab af præcision.

Overvej denne (falske!) lighedstest:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Det er korrekt, hvis vi tjekker, om summen af `0.1` og `0.2` er `0.3`, får vi `false`.

Underligt! Hvad er det så, hvis det ikke er `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Av! Forestil dig, at du laver en e-handelside, og besøgende lægger varer til $0,10 og $0,20 i deres indkøbskurv. Ordretotalen vil være $0,30000000000000004. Det ville overraske enhver.

Men hvorfor sker det her?

Et tal gemmes i hukommelsen i sin binære form, en sekvens af bits - et-taller og nuller. Men brøker som `0.1`, `0.2`, der ser simple ud i det decimale talsystem, er faktisk uendelige brøker i deres binære form.

```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

Hvad er `0.1`? Det er en divideret med ti `1/10`, en tiendedel. I det decimale talsystem er sådanne tal let repræsentable. Sammenlign det med en tredjedel: `1/3`. Det bliver en uendelig brøk `0.33333(3)`.

Så division med potenser af `10` er garanteret at fungere godt i det decimale system, men division med `3` gør ikke. Af samme grund er division med potenser af `2` garanteret at fungere i det binære talsystem, men `1/10` bliver en uendelig binær brøk.

Der er simpelthen ingen måde at gemme *præcis 0.1* eller *præcis 0.2* ved hjælp af det binære system, ligesom der ikke er nogen måde at gemme en tredjedel som en decimaltalbrøk.

Det numeriske format IEEE-754 løser dette ved at runde til det nærmeste mulige tal. Disse afrundingsregler tillader normalt ikke, at vi ser det "små præcisionstab", men det eksisterer.

Vi kan se dette i praksis:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Og når vi summerer to tal, lægges deres "præcisionstab" sammen.

Derfor er `0.1 + 0.2` ikke præcis `0.3`.

```smart header="Ikke kun JavaScript"
Det samme problem findes i mange andre programmeringssprog.

PHP, Java, C, Perl og Ruby giver præcis det samme resultat, fordi de er baseret på det samme numeriske format.
```

Kan vi arbejde uden om problemet? Selvfølgelig, den mest pålidelige metode er at runde resultatet ved hjælp af metoden [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Bemærk at `toFixed` altid returnerer en streng. Den sikrer, at der er 2 cifre efter decimalpunktet. Det er faktisk praktisk, hvis vi har en e-handelside og skal vise `$0.30`. For andre tilfælde kan vi bruge det unære plus for at tvinge det til et tal:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Vi kan også midlertidigt multiplicere tallene med 100 (eller et større tal) for at gøre dem til heltal, udføre beregningerne og derefter dividere tilbage. Da vi arbejder med heltal, mindskes fejlen en smule, men vi får den stadig ved division:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Så multiplikations-/divisionsmetoden reducerer fejlen, men fjerner den ikke helt.

Nogle gange kan vi prøve helt at undgå brøker. Hvis vi for eksempel har en butik, kan vi gemme priser i cent i stedet for dollars. Men hvad hvis vi anvender en rabat på 30 %? I praksis er det sjældent muligt helt at undgå brøker. Bare rund dem af for at fjerne "haler", når det er nødvendigt.

````smart header="En sjov detalje"
Prøv at køre dette:

```js run
// Hej! Jeg er et tal der selv vokser!
alert( 9999999999999999 ); // viser 10000000000000000
```

Dette lider af det samme problem: et tab af præcision. Der er 64 bits til tallet, 52 af dem kan bruges til at gemme cifre, men det er ikke nok. Så de mindst betydningsfulde cifre forsvinder.

JavaScript udløser ikke en fejl i sådanne tilfælde. Det gør sit bedste for at tilpasse tallet til det ønskede format, men desværre er dette format ikke stort nok.
````

```smart header="To nuller"
En anden sjov konsekvens af den interne repræsentation af tal er eksistensen af to nuller: `0` og `-0`.

Det skyldes, at et fortegn repræsenteres af et enkelt bit, så det kan være sat eller ikke sat for ethvert tal, inklusive nul.

I de fleste tilfælde er forskellen ubetydelig, fordi operatorer er designet til at behandle dem som det samme.
```

## Test: isFinite og isNaN

Husker du disse to specielle numeriske værdier?

- `Infinity` (og `-Infinity`) er en speciel numerisk værdi, der er større (mindre) end noget som helst.
- `NaN` repræsenterer en fejl.

De tilhører typen `number`, men er ikke "normale" tal, så der er specielle funktioner til at tjekke for dem:


- `isNaN(value)` konverterer sit argument til et tal og tester derefter, om det er `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Men har vi brug for denne funktion? Kan vi ikke bare bruge sammenligningen `=== NaN`? Desværre ikke. Værdien `NaN` er unik ved, at den ikke er lig med noget som helst, inklusive sig selv:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` konverterer sit argument til et tal og returnerer `true`, hvis det er et almindeligt tal, ikke `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, fordi det er en speciel værdi: NaN
    alert( isFinite(Infinity) ); // false, fordi det er en speciel værdi: Infinity
    ```

Nogle gange bruges `isFinite` til at validere, om en strengværdi er et almindeligt tal:


```js run
let num = +prompt("Indtast et tal", '');

// vil være sandt, medmindre du indtaster Infinity, -Infinity eller ikke et tal
alert( isFinite(num) );
```

Bemærk, at en tom streng eller en streng med kun mellemrum behandles som `0` i alle numeriske funktioner, inklusive `isFinite`.

````smart header="`Number.isNaN` og `Number.isFinite`"
Metoderne [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) og [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) er de mere "strenge" versioner af `isNaN` og `isFinite` funktionerne. De konverterer ikke automatisk deres argument til et tal, men tjekker i stedet, om det tilhører typen `number`.

- `Number.isNaN(value)` returnerer `true`, hvis argumentet tilhører typen `number` og det er `NaN`. I alle andre tilfælde returnerer det `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Bemærk forskellen:
    alert( Number.isNaN("str") ); // false, fordi "str" tilhører typen string, ikke typen number
    alert( isNaN("str") ); // true, fordi isNaN konverterer strengen "str" til et tal og får NaN som resultat af denne konvertering
    ```

- `Number.isFinite(value)` returnerer `true`, hvis argumentet tilhører typen `number` og det ikke er `NaN/Infinity/-Infinity`. I alle andre tilfælde returnerer det `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Bemærk forskellen:
    alert( Number.isFinite("123") ); // false, fordi "123" tilhører typen string, ikke typen number
    alert( isFinite("123") ); // true, fordi isFinite konverterer strengen "123" til et tal 123
    ```

På en måde er `Number.isNaN` og `Number.isFinite` enklere og mere ligetil end `isNaN` og `isFinite` funktionerne. I praksis bruges `isNaN` og `isFinite` dog mest, da de er kortere at skrive.
````

```smart header="Sammenligning med `Object.is`"
Der er en speciel indbygget metode `Object.is`, der sammenligner værdier som `===`, men er mere pålidelig for to særlige tilfælde:

1. Den fungerer med `NaN`: `Object.is(NaN, NaN) === true`, det er en god ting.
2. Værdierne `0` og `-0` er forskellige: `Object.is(0, -0) === false`, teknisk set er det korrekt, fordi tallet internt har et fortegnsbit, der kan være forskelligt, selvom alle andre bits er nul.

I alle andre tilfælde er `Object.is(a, b)` det samme som `a === b`.

Vi nævner `Object.is` her, fordi det ofte bruges i JavaScript-specifikationen. Når en intern algoritme har brug for at sammenligne to værdier for at være præcis de samme, bruger den `Object.is` (internt kaldet [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt og parseFloat

Nummerisk konvertering ved hjælp af et plus `+` eller `Number()` er streng. Hvis en værdi ikke er præcis et tal, fejler det:

```js run
alert( +"100px" ); // NaN
```

Den eneste undtagelse er mellemrum i starten eller slutningen af strengen - de ignoreres.

Men i virkeligheden har vi ofte værdier med enheder, som `"100px"` eller `"12pt"` i CSS. Også i mange lande kommer valutasymbolet efter beløbet, så vi har `"19€"` og vil gerne udtrække en numerisk værdi fra det.

Det er det, `parseInt` og `parseFloat` er til.
De "læser" et tal fra en streng, indtil de ikke kan længere. I tilfælde af en fejl returneres det indsamlede tal. Funktionen `parseInt` returnerer et heltal, mens `parseFloat` returnerer et flydende punkt-tal:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, returnerer kun heltalsdelen
alert( parseFloat('12.3.4') ); // 12.3, det andet punktum stopper læsningen
```

Der er situationer, hvor `parseInt/parseFloat` vil returnere `NaN`. Det sker, når der ikke kunne læses nogen cifre overhovedet, for eksempel:

```js run
alert( parseInt('a123') ); // NaN, det første symbol stopper processen
```

````smart header="Det andet argument af `parseInt(str, radix)`"
Funktionen `parseInt()` har en valgfri anden parameter. Den angiver basen for talsystemet, så `parseInt` også kan analysere strenge med hexadecimale tal, binære tal og så videre:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, uden 0x virker også

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Andre matematiske funktioner

JavaScript har et indbygget [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) objekt, som indeholder et lille bibliotek af matematiske funktioner og konstanter.

Et par eksempler:

`Math.random()`
: Returnerer et tilfældigt tal fra 0 til 1 (ikke inklusiv 1).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (vilkårlige tilfældige tal)
    ```

`Math.max(a, b, c...)` og `Math.min(a, b, c...)`
: Returnerer det største og mindste af et vilkårligt antal argumenter.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Returnerer `n` opløftet til den givne potens.

    ```js run
    alert( Math.pow(2, 10) ); // 2 i 10nde potens = 1024
    ```

Der er flere funktioner og konstanter i `Math` objektet, inklusive trigonometri, som du kan finde i [dokumentationen for Math-objektet](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Opsummering

For at skrive tal med mange nuller:

- Tilføj `"e"` med antallet af nuller til tallet. For eksempel er `123e6` det samme som `123` med 6 nuller `123000000`.
- Et negativt tal efter `"e"` får tallet til at blive divideret med 1 efterfulgt af det givne antal nuller. F.eks. betyder `123e-6` `0.000123` (`123` milliontedele).

For forskellige talsystemer:

- Vi kan skrive tal direkte i hex (`0x`), oktal (`0o`) og binære (`0b`) systemer.
- `parseInt(str, base)` analyserer strengen `str` til et heltal i talsystemet med den givne `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` konverterer et tal til en streng i talsystemet med den givne `base`.

For normale tal-tests:

- `isNaN(value)` konverterer sit argument til et tal og tester derefter, om det er `NaN`
- `Number.isNaN(value)` tjekker, om sit argument tilhører typen `number`, og hvis ja, tester det for at være `NaN`
- `isFinite(value)` konverterer sit argument til et tal og tester derefter, om det ikke er `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` tjekker, om sit argument tilhører typen `number`, og hvis ja, tester det for ikke at være `NaN/Infinity/-Infinity`

For konvertering af værdier som `12pt` og `100px` til et tal:

- Brug `parseInt/parseFloat` til den "bløde" konvertering, som læser et tal fra en streng og derefter returnerer den værdi, de kunne læse før fejlen.

For brøker:

- Rund af ved hjælp af `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` eller `num.toFixed(precision)`.
- Husk, at der er et tab af præcision, når man arbejder med brøker.

Flere matematiske funktioner:

- Se [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) objektet, når du har brug for dem. Biblioteket er meget lille, men kan dække grundlæggende behov.
