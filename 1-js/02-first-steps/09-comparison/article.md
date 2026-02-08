# Sammenligning

Vi kender mange sammenligningsoperatorer fra matematik.

I JavaScript skrives de sådan her:

- Større end/Mindre end: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Større end eller lig med/Mindre end eller lig med: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Lighed: `a == b`, bemærk at dobbelt lighedstegn `==` betyder lighedstest, mens et enkelt `a = b` betyder en tildeling.
- Ulighed: I matematik er notationen <code>&ne;</code>, men i JavaScript skrives det som <code>a != b</code>.

I denne artikel vil vi lære mere om forskellige typer sammenligninger, hvordan JavaScript udfører dem, og vigtige ting at være opmærksomme på.

Til sidst vil du få en opskrift til at undgå problemer relateret til "JavaScript quirks".

## Boolean er resultatet

Alle sammenligningsoperatorer returnerer en boolean værdi:

- `true` -- betyder "ja", "korrekt" eller "sandheden".
- `false` -- betyder "nej", "forkert" eller "ikke sandheden".

For eksempel:

```js run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

Et sammenligningsresultat kan tildeles en variabel, ligesom enhver anden værdi:

```js run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## Sammenligning af tekststrenge

For at se, om en tekststreng er større end en anden, bruger JavaScript den såkaldte "ordbogs-" eller "leksikografiske" rækkefølge.

Sagt på en anden måde, sammenlignes tekststrenge bogstav for bogstav.

For eksempel:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

Algoritmen til at sammenligne to tekststrenge er simpel:

1. Sammenlign det første tegn i begge tekststrenge.
2. Hvis det første tegn i den første tekststreng er større (eller mindre) end det tilsvarende tegn i den anden tekststreng, så er den første tekststreng større (eller mindre) end den anden. Vi er færdige.
3. Ellers, hvis begge tekststrenges første tegn er ens, sammenlignes de andet tegn på samme måde.
4. Gentag indtil slutningen af en af tekststrengene.
5. Hvis begge tekststrenge ender ved samme længde, er de lige. Ellers er den længste tekststreng større.

I eksemplet ovenfor når sammenligningen `'Z' > 'A'` til et resultat ved det første trin.

Den anden sammenligning `'Glow'` og `'Glee'` kræver flere trin, da tekststrengene sammenlignes tegn for tegn:

1. `G` er det samme som `G`.
2. `l` er det samme som `l`.
3. `o` er større end `e`. Stop her. Den første tekststreng er større.

```smart header="Ikke en rigtig ordbog, men Unicode-rækkefølge"
Sammenligningsalgoritmen givet ovenfor svarer omtrent til den, der bruges i ordbøger eller telefonbøger, men det er ikke helt det samme.

For eksempel betyder store og små bogstaver noget. Et stort bogstav `"A"` er ikke det samme som det lille `"a"`. Hvilket er større? Det lille `"a"`. Hvorfor? Fordi det lille bogstav har en større indeks i den interne kodningstabel, som JavaScript bruger (Unicode). Vi vender tilbage til specifikke detaljer og konsekvenser af dette i kapitlet <info:string>.
```

## Sammenligning af forskellige typer

Når værdier af forskellige typer sammenlignes, konverterer JavaScript værdierne til tal.

For eksempel:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean værdier, bliver `true` til `1` og `false` til `0`.

For eksempel:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="En sjov konsekvens"
Det er muligt, at på samme tid:

- To værdier er lige.
- Den ene er `true` som en boolean og den anden er `false` som en boolean.

For eksempel:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

Fra JavaScripts synspunkt er dette resultat helt normalt. En lighedstjek konverterer værdier ved hjælp af numerisk konvertering (derfor bliver `"0"` til `0`), mens den eksplicitte `Boolean`-konvertering bruger et andet sæt regler.
````

## Streng lighed (strict equality)

Et almindeligt lighedstjek `==` har et problem. Det kan ikke skelne `0` fra `false`:

```js run
alert( 0 == false ); // true
```

Det samme sker med en tom tekststreng:

```js run
alert( '' == false ); // true
```

Dette sker, fordi operander af forskellige typer konverteres til tal af lighedsoperatoren `==`. En tom tekststreng, ligesom `false`, bliver til nul.

Hvad gør vi, hvis vi gerne vil skelne `0` fra `false`?

**En streng lighedsoperator `===` tjekker lighed uden typekonvertering.**

Med andre ord, hvis `a` og `b` er af forskellige typer, så returnerer `a === b` straks `false` uden at forsøge at konvertere dem.

Lad os prøve det:

```js run
alert( 0 === false ); // false, fordi typerne er forskellige
```

Der findes også en "streng ikke-ligheds" operator `!==`, som svarer til `!=`.

Den strenge lighedsoperator er lidt længere at skrive, men gør det tydeligt, hvad der foregår, og efterlader mindre plads til fejl.

## Sammenligning med null og undefined

Der er en ikke-intuitiv opførsel, når `null` eller `undefined` sammenlignes med andre værdier.

For et strengt lighedstjek `===`
: Disse værdier er forskellige, fordi hver af dem er en forskellig type.

    ```js run
    alert( null === undefined ); // false
    ```

For et ikke-strengt tjek `==`
: Der er en særlig regel. Disse to er et "sødt par": de er lige med hinanden (i betydningen af `==`), men ikke med nogen anden værdi.

    ```js run
    alert( null == undefined ); // true
    ```

For matematik og andre sammenligninger `< > <= >=`
: `null/undefined` konverteres til tal: `null` bliver til `0`, mens `undefined` bliver til `NaN`.

Lad os nu se på nogle sjove ting, der sker, når vi anvender disse regler. Og hvad der er endnu vigtigere, hvordan man undgår at falde i en fælde med dem.

### Underligt resultat: null vs 0

Lad os sammenligne `null` med nul:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematisk set er det mærkeligt. Det sidste resultat siger, at "`null` er større end eller lig med nul", så i en af sammenligningerne ovenfor må det være `true`, men de er begge falske.

Grunden er, at et lighedstjek `==` og sammenligninger `> < >= <=` fungerer forskelligt. Sammenligninger konverterer `null` til et tal, og behandler det som `0`. Derfor er (3) `null >= 0` sandt, og (1) `null > 0` falsk.

På den anden side er lighedstjekket `==` for `undefined` og `null` defineret sådan, at uden nogen konverteringer er de lige med hinanden og ikke med nogen anden værdi. Derfor er (2) `null == 0` falsk.

### En u-sammenlignelig undefined

Værdien `undefined` bør ikke sammenlignes med andre værdier:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Hvorfor kan den ikke lide nul så meget? Altid falsk!

Vi får disse resultater, fordi:

- Sammenligningerne `(1)` og `(2)` returnerer `false`, fordi `undefined` konverteres til `NaN`, og `NaN` er en speciel numerisk værdi, som returnerer `false` for alle sammenligninger.
- Lighedstjekket `(3)` returnerer `false`, fordi `undefined` kun er lig med `null`, `undefined` og ingen andre værdier.

### Undgå problemer

Hvorfor gennemgå disse eksempler? Skal vi huske disse særheder hele tiden? Ikke rigtig. Faktisk vil disse tricky ting gradvist blive mere velkendte over tid, men der er en solid måde at undgå problemer med dem på:

- Behandl enhver sammenligning med `undefined/null` undtagen det strenge lighedstjek `===` med særlig forsigtighed.
- Brug ikke sammenligninger `>= > < <=` med en variabel, der kan være `null/undefined`, medmindre du er helt sikker på, hvad du gør. Hvis en variabel kan have disse værdier, så tjek dem separat.

## Opsummering

- Sammenligningsoperatorer returnerer en boolesk værdi.
- Strenge sammenlignes bogstav for bogstav i "ordbogs" rækkefølge.
- Når værdier af forskellige typer sammenlignes, konverteres de til tal (med undtagelse af et strengt lighedstjek).
- Værdierne `null` og `undefined` er lige `==` med sig selv og hinanden, men ikke med nogen anden værdi.
- Vær forsigtig, når du bruger sammenligninger som `>` eller `<` med variabler, der lejlighedsvis kan være `null/undefined`. Det er en god idé at tjekke for `null/undefined` separat.
