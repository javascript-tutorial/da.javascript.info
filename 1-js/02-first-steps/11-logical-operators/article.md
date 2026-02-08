# Logiske operatorer

Der er fire logiske operatorer i JavaScript: `||` (ELLER), `&&` (OG), `!` (IKKE), `??` (Nullish Coalescing). Her dækker vi de første tre, `??`-operatoren er i den næste artikel.

Selvom de kaldes "logiske", kan de anvendes på værdier af enhver type, ikke kun boolean. Deres resultat kan også være af enhver type.

Lad os se detaljerne.

## || (ELLER)

"ELLER"-operatoren repræsenteres med to lodrette stregsymboler:

```js
result = a || b;
```

I klassisk programmering er den logiske ELLER beregnet til kun at manipulere booleske værdier. Hvis nogen af dens argumenter er `true`, returnerer den `true`, ellers returnerer den `false`.

I JavaScript er operatoren lidt mere kompliceret og mere kraftfuld. Men først, lad os se hvad der sker med booleske værdier.

Der er fire mulige logiske kombinationer:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Som vi kan se, er resultatet altid `true` undtagen i tilfælde, hvor begge operander er `false`.

Hvis en operand ikke er en boolean, konverteres den til en boolean for evalueringen.

For eksempel behandles tallet `1` som `true`, tallet `0` som `false`:

```js run
if (1 || 0) { // virker ligesom if( true || false )
  alert( 'sand!' );
}
```

For det meste bruges ELLER `||` i et `if`-udsagn til at teste, om *nogen* af de givne betingelser er `true`.

For eksempel:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'Kontoret er lukket.' );
}
```

Vi kan tilføje flere betingelser:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'Kontoret er lukket.' ); // det er weekenden
}
```

## OR "||" finder den første sandfærdige værdi [#or-finds-the-first-truthy-value]

Den logik, der er beskrevet ovenfor, er noget klassisk. Nu bringer vi "ekstra" funktioner i JavaScript.

Den udvidede algoritme fungerer som følger.

Givet flere OR'ed værdier:

```js
result = value1 || value2 || value3;
```

OR `||` operatoren gør følgende:

- Evaluerer operander fra venstre mod højre.
- For hver operand konverteres den til en boolean. Hvis resultatet er `true`, stopper den og returnerer den oprindelige værdi af den operand.
- Hvis alle operander er blevet evalueret (dvs. alle var `false`), returneres den sidste operand.

En værdi returneres i sin oprindelige form, uden konvertering.

Med andre ord returnerer en kæde af OR `||` den første sandfærdige værdi eller den sidste, hvis ingen sandfærdig værdi findes.

For eksempel:

```js run
alert( 1 || 0 ); // 1 (1 er sandfærdig også kaldet "truthy")

alert( null || 1 ); // 1 (1 er den første sandfærdige værdi)
alert( null || 0 || 1 ); // 1 (den første sandfærdige værdi)

alert( undefined || null || 0 ); // 0 (alle falsy, returnerer den sidste værdi)
```

Dette fører til nogle interessante anvendelser sammenlignet med en "ren, klassisk, kun boolean-OR".

1. **At få den første sandfærdige værdi fra en liste af variabler eller udtryk.**

    For eksempel har vi variablerne `firstName`, `lastName` og `nickName`, alle valgfrie (dvs. kan være undefined eller have falsy værdier).

    Lad os bruge OR `||` til at vælge den, der har data, og vise den (eller `"Anonymous"` hvis intet er sat):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

    Hvis alle variabler var falsy, ville `"Anonymous"` blive vist.

2. **Kortslutningsevaluering (Short-circuit evaluation).**

    En anden funktion ved OR `||` operatoren er den såkaldte "kortslutningsevaluering".

    Det betyder, at `||` behandler sine argumenter, indtil den første sandfærdige værdi nås, og derefter returneres værdien straks, uden at røre ved det andet argument.

    Det vigtige ved denne funktion bliver tydeligt, hvis en operand ikke bare er en værdi, men et udtryk med en bivirkning, såsom en variabeltildeling eller et funktionskald.

    I eksemplet nedenfor udskrives kun den anden besked:

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

    I den første linje stopper OR `||` operatoren evalueringen straks, når den ser `true`, så `alert` køres ikke.

    Nogle gange bruger folk denne funktion til kun at udføre kommandoer, hvis betingelsen i venstre del er falsy.

## && (AND)

AND operatoren repræsenteres med to ampersand `&&`:

```js
result = a && b;
```

I klassisk programmering returnerer AND `true`, hvis begge operander er sandfærdige, og `false` ellers:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Et eksempel med `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'Klokken er 12:30' );
}
```

På samme måde som med OR, er enhver værdi tilladt som operand for AND:

```js run
if (1 && 0) { // evaluated as true && false
  alert( "virker ikke, fordi resultatet er falsy" );
}
```


## AND "&&" finder den første falsy værdi

Givet flere AND'ed værdier:

```js
result = value1 && value2 && value3;
```

AND `&&` operatoren gør følgende:

- Evaluerer operander fra venstre mod højre.
- For hver operand konverteres den til en boolean. Hvis resultatet er `false`, stopper den og returnerer den oprindelige værdi af den operand.
- Hvis alle operander er blevet evalueret (dvs. alle var `true`), returneres den sidste operand.

Med andre ord returnerer AND den første falsy værdi eller den sidste værdi, hvis ingen blev fundet.

Reglerne ovenfor ligner OR. Forskellen er, at AND returnerer den første *falsy* værdi, mens OR returnerer den første *truthy*.

Eksempler:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "uanset hvad" ); // 0
```

Vi kan også give flere værdier i træk. Se hvordan den første falsy værdi returneres:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Når alle værdier er truthy, returneres den sidste værdi:

```js run
alert( 1 && 2 && 3 ); // 3, den sidste
```

````smart header="Præcedens for AND `&&` er højere end OR `||`"
Præcedensen for AND `&&` operatoren er højere end OR `||`.

Så koden `a && b || c && d` er i det væsentlige det samme, som hvis `&&`-udtryk var i parenteser: `(a && b) || (c && d)`.
````

````warn header="Erstat ikke `if` med `||` eller `&&`"
Nogle gange bruger folk AND `&&` operatoren som en "kortere måde at skrive `if` på".

For eksempel:

```js run
let x = 1;

(x > 0) && alert( 'Større end nul!' );
```

Handlingen i højre del af `&&` vil kun blive udført, hvis evalueringen når dertil. Det vil sige, kun hvis `(x > 0)` er sand.

Så vi har grundlæggende en analog til:

```js run
let x = 1;

if (x > 0) alert( 'Større end nul!' );
```

Selvom varianten med `&&` virker kortere, er `if` mere tydelig og har en tendens til at være lidt mere læsbar. Derfor anbefaler vi at bruge hver konstruktion til sit formål: brug `if`, hvis vi vil have `if`, og brug `&&`, hvis vi vil have AND.
````


## ! (NOT)

Boolean NOT operatoren repræsenteres med et udråbstegn `!`.

Syntaksen er ret simpel:

```js
result = !value;
```

Operatoren accepterer et enkelt argument og gør følgende:

1. Konverterer operandet til boolean type: `true/false`.
2. Returnerer den inverse værdi.

For eksempel:

```js run
alert( !true ); // false
alert( !0 ); // true
```

En dobbelt NOT `!!` bruges nogle gange til at konvertere en værdi til boolean type:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

Det første NOT konverterer værdien til boolean og returnerer den modsætning, og det andet NOT inverterer det igen. Til sidst har vi en simpel værdi-til-boolean konvertering.

Der er en lidt mere omstændelig måde at gøre det samme på -- en indbygget `Boolean` funktion:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

Præcedensen for NOT `!` er den højeste af alle logiske operatorer, så den udføres altid først, før `&&` eller `||`.
