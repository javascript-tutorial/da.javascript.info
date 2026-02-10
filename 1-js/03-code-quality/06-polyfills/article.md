
# Polyfills og transpilers

Sproget JavaScript udvikler sig konstant. Nye forslag til sproget dukker regelmæssigt op, de bliver analyseret og, hvis de anses for værdige, tilføjes de til listen på <https://tc39.github.io/ecma262/> og går derefter videre til [specifikationen](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).

Teams bag JavaScript-motorer har deres egne idéer om, hvad der skal implementeres først. De kan beslutte at implementere forslag, der stadig er i udkast, og udsætte ting, der allerede er i specifikationen, fordi de er mindre interessante eller bare sværere at gøre.

Derfor er det ganske almindeligt, at en motor kun implementerer en del af standarden.

En god side til at se den aktuelle støtte for sprogfunktioner er <https://compat-table.github.io/compat-table/es6/> (den er stor, vi har stadig meget at studere).

Som programmører vil vi gerne bruge de nyeste funktioner. Jo flere gode ting - jo bedre!

På den anden side, hvordan får vi vores moderne kode til at fungere på ældre motorer, der endnu ikke forstår de nyeste funktioner?

Der er to værktøjer til det:

1. Transpilers.
2. Polyfills.

Her, i dette kapitel, er vores formål at få en idé om, hvordan de fungerer, og deres plads i webudvikling.

## Transpilers

En [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) er et specielt stykke software, der oversætter kildekode til en anden kildekode. Den kan analysere ("læse og forstå") moderne kode og omskrive den ved hjælp af ældre syntaks-konstruktioner, så den også fungerer i forældede motorer.

F.eks. havde JavaScript før år 2020 ikke "nullish coalescing operator" `??`. Så hvis en besøgende bruger en forældet browser, kan den fejle i at forstå koden som `height = height ?? 100`.

En transpiler ville analysere vores kode og omskrive `height ?? 100` til `(height !== undefined && height !== null) ? height : 100`.

```js
// før kørsel af transpiler
height = height ?? 100;

// efter kørsel af transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Nu er den omskrevne kode egnet til ældre JavaScript-motorer.

Som regel kører en udvikler transpiler på sin egen computer og uploader derefter den transpilerede kode til serveren.

Når vi taler om navne, er [Babel](https://babeljs.io) en af de mest fremtrædende transpilers derude.

Moderne projektbygge-systemer, såsom [Vite](https://vite.dev/), giver mulighed for at køre en transpiler automatisk ved hver kodeændring, så det er meget nemt at integrere i udviklingsprocessen.

## Polyfills

Nye sprogfunktioner kan inkludere ikke kun syntaks-konstruktioner og operatorer, men også indbyggede funktioner.

For eksempel, `Math.trunc(n)` er en funktion, der "skærer" decimaldelen af et tal væk, f.eks. `Math.trunc(1.23)` returnerer `1`.

I nogle (meget forældede) JavaScript-motorer findes der ikke `Math.trunc`, så sådan kode vil fejle.

Da vi taler om nye funktioner, ikke syntaksændringer, er der ikke behov for at transpile noget her. Vi skal bare erklære den manglende funktion.

Et script, der opdaterer/tilføjer nye funktioner, kaldes en "polyfill". Det "fylder hullet ud" og tilføjer manglende implementeringer.

For dette særlige tilfælde er polyfillen for `Math.trunc` et script, der implementerer det, sådan her:

```js
if (!Math.trunc) { // hvis funktionen ikke findes
  // implementer den
  Math.trunc = function(number) {
    // Math.ceil og Math.floor findes selv i gamle JavaScript-motorer
    // de dækkes senere i tutorialen
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript er et meget dynamisk sprog. Scripts kan tilføje/ændre enhver funktion, selv indbyggede.

Et interessant polyfill-bibliotek er [core-js](https://github.com/zloirock/core-js), som understøtter en bred vifte af funktioner og giver dig mulighed for kun at inkludere dem, du har brug for.

## Opsummering

I dette kapitel vil vi gerne motivere dig til at studere moderne og endda "bleeding-edge" sprogfunktioner, selvom de endnu ikke er godt understøttet af JavaScript-motorer.

Glem bare ikke at bruge en transpiler (hvis du bruger moderne syntaks eller operatorer) og polyfills (for at tilføje funktioner, der måske mangler). De sikrer, at koden fungerer.

For eksempel, senere når du er fortrolig med JavaScript, kan du opsætte et kodebygge-system baseret på [Vite](https://vite.dev/) der bruger  [esbuild](https://github.com/evanw/esbuild) plugin'et.

Gode ressourcer, der viser den aktuelle støtte for forskellige funktioner:
- <https://compat-table.github.io/compat-table/es6/> - for ren JavaScript.
- <https://caniuse.com/> - for browser-relaterede funktioner.

P.S. Google Chrome er normalt den mest opdaterede med sprogfunktioner, prøv den, hvis en tutorial-demo fejler. De fleste tutorial-demos fungerer dog med enhver moderne browser.

