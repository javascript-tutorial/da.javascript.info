# Automatisk testning med Mocha

Automatisk testning vil blive brugt i de følgende opgaver, og det er også bredt anvendt i rigtige projekter.

## Hvorfor har vi brug for tests?

Når vi skriver en funktion, kan vi normalt forestille os, hvad den skal gøre: hvilke parametre giver hvilke resultater.

Under udviklingen kan vi kontrollere funktionen ved at køre den og sammenligne resultatet med det forventede. Dette kan vi for eksempel gøre i konsollen.

Hvis noget er galt -- så retter vi koden, kører igen, tjekker resultatet -- og så videre, indtil det virker.

Men sådanne manuelle "genkørsler" er ufuldkomne.

**Når man tester kode ved manuelle genkørsler, er det let at overse noget.**

Et eksempel kunne være at vi oprettede en funktion `f`. Skrev noget kode, testede: `f(1)` virker, men `f(2)` virker ikke. Vi retter koden, og nu virker `f(2)`. Ser det komplet ud? Men vi glemte at teste `f(1)` igen. Det kan føre til en fejl.

Det er meget typisk. Når vi udvikler noget, har vi mange mulige brugsscenarier i tankerne. Men det er svært at forvente, at en programmør manuelt tjekker dem alle efter hver ændring. Så det bliver let at rette én ting og bryde en anden.

**Automatiseret testning betyder, at tests skrives separat, ud over koden. De kører vores funktioner på forskellige måder og sammenligner resultater med det forventede.**

## Behavior Driven Development (BDD)

Lad os starte med en teknik kaldet [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) eller, kort sagt, BDD.

**BDD er tre ting i én: tests OG dokumentation OG eksempler.**

For at forstå BDD vil vi undersøge et praktisk udviklingseksempel.

## Udvikling af "pow": specifikationen

Lad os sige, at vi vil lave en funktion `pow(x, n)`, der hæver `x` til en potens af `n`. Vi antager, at `n≥0`.

Den opgave er bare et eksempel: der findes operatoren `**` i JavaScript, der kan gøre det, men her koncentrerer vi os om udviklingsflowet, som også kan anvendes til mere komplekse opgaver.

Inden vi skriver koden til `pow`, kan vi forestille os, hvad funktionen skal gøre, og beskrive det.

Sådan en beskrivelse kaldes en *specifikation* eller, kort sagt, en spec, og indeholder beskrivelser af brugsscenarier sammen med tests for dem, som dette:

```js
describe("pow", function() {

  it("hæver til n-te potens", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

En spec har tre hovedbyggesten, som du kan se ovenfor:

`describe("title", function() { ... })`
: Hvilken funktionalitet beskriver vi? I vores tilfælde beskriver vi funktionen `pow`. Bruges til at gruppere "arbejdere" -- `it`-blokkene.

`it("beskrivelse af brugsscenarie", function() { ... })`
: I titlen af `it` beskriver vi *på en menneskeligt læsbar måde* det specifikke brugsscenarie, og det andet argument er en funktion, der tester det.

`assert.equal(value1, value2)`
: Koden inde i `it`-blokken, hvis implementeringen er korrekt, skal køre uden fejl.

    Funktionen `assert.*` bruges til at tjekke, om `pow` fungerer som forventet. Her bruger vi en af dem -- `assert.equal`, den sammenligner argumenter og giver en fejl, hvis de ikke er ens. Her tjekker den, at resultatet af `pow(2, 3)` er lig med `8`. Der findes andre typer sammenligninger og tjek, som vi vil tilføje senere.

Specifikationen kan køres, og den vil køre testen specificeret i `it`-blokken. Det vil vi se senere.

## Udviklingsflowet

Udviklingsflowet ser normalt sådan ud:

1. En indelende specifikation skrives, med tests for den mest grundlæggende funktionalitet.
2. En indledende implementering oprettes.
3. For at tjekke om det virker, kører vi testframeworket [Mocha](https://mochajs.org/) (mere om det snart), som kører specifikationen. Mens funktionaliteten ikke er komplet, vises fejl. Vi laver rettelser indtil alt virker.
4. Nu har vi en fungerende indledende implementering med tests.
5. Vi tilføjer flere brugsscenarier til specifikationen, sandsynligvis endnu ikke understøttet af implementeringerne. Tests begynder at fejle.
6. Gå til 3, opdater implementeringen indtil tests ikke giver fejl.
7. Gentag trin 3-6 indtil funktionaliteten er klar.

Så udviklingen er *iterativ*. Vi skriver specifikationen, implementerer den, sikrer os at testene passerer, skriver flere tests, sikrer os at de virker osv. Til sidst har vi både en fungerende implementering og tests for den.

Lad os se dette udviklingsflow i vores praktiske tilfælde.

Det første trin er allerede fuldført: vi har en indledende specifikation for `pow`. Nu, før vi laver implementeringen, lad os bruge nogle JavaScript-biblioteker til at køre testene, bare for at se, at de virker (de vil alle fejle).

## Specifikationen i aktion

Her i vejledningen vil vi bruge følgende JavaScript-biblioteker til tests:

- [Mocha](https://mochajs.org/) -- kerneframeworket: det leverer almindelige testfunktioner inklusive `describe` og `it` samt hovedfunktionen, der kører testene.
- [Chai](https://www.chaijs.com/) -- biblioteket med mange påstande (asserts). Det tillader brug af mange forskellige påstande, for nu har vi kun brug for `assert.equal`.
- [Sinon](https://sinonjs.org/) -- et bibliotek til at spionere på funktioner, emulere indbyggede funktioner og mere, det får vi brug for meget senere.

Disse biblioteker er velegnede til både browser- og server-side testning. Her vil vi se på browser-varianten.

Den fulde HTML-side med disse frameworks og `pow`-specifikationen:

```html src="index.html"
```

Siden kan opdeles i fem dele:

1. `<head>` -- tilføj tredjepartsbiblioteker og stilarter til tests.
2. `<script>` med funktionen, der skal testes, i vores tilfælde -- med koden til `pow`.
3. Testene -- i vores tilfælde et eksternt script `test.js`, der har `describe("pow", ...)` fra ovenfor.
4. HTML-elementet `<div id="mocha">` vil blive brugt af Mocha til at vise resultater.
5. Testene startes med kommandoen `mocha.run()`.

Resultatet:

[iframe height=250 src="pow-1" border=1 edit]

For nu vil testen fejle - der er en fejl. Det er logisk: vi har en tom funktionskode i `pow`, så `pow(2,3)` returnerer `undefined` i stedet for `8`.

For fremtiden, lad os bemærke, at der findes mere avancerede test-runners, som [karma](https://karma-runner.github.io/) og andre, der gør det nemt at autorun mange forskellige tests.

## Indledende implementering

Lad os lave en simpel implementering af `pow`, så testene passerer:

```js
function pow(x, n) {
  return 8; // :) vi kan snyde!
}
```

Wow, nu virker det!

[iframe height=250 src="pow-min" border=1 edit]

## Forbedring af specifikationen

Det, vi har gjort, er bestemt snyd. Funktionen virker ikke: et forsøg på at beregne `pow(3,4)` ville give et forkert resultat, men testene passerer.

...Men situationen er ret typisk, det sker i praksis. Testene passerer, men funktionen virker forkert. Vores specifikation er ufuldstændig. Vi skal tilføje flere brugsscenarier til den.

Lad os tilføje en test mere for at tjekke, at `pow(3, 4) = 81`.

Vi kan vælge en af to måder at organisere testen på her:

1. Den første variant -- tilføj en mere `assert` i samme `it`:

    ```js
    describe("pow", function() {

      it("hæver til n-te potens", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. Den anden -- lav to tests:

    ```js
    describe("pow", function() {

      it("2 hævet til tredje potens er 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 hævet til fjerde potens er 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

Den grundlæggende forskel er, at når `assert` udløser en fejl, afsluttes `it`-blokken straks. Så i den første variant, hvis den første `assert` fejler, vil vi aldrig se resultatet af den anden `assert`.

At gøre testene separate er nyttigt for at få mere information om, hvad der foregår, så den anden variant er bedre.

Og derudover er der en regel mere, som er god at følge.

**En test tjekker én ting.**

Hvis vi ser på testen og ser to uafhængige tjek i den, er det bedre at opdele den i to enklere.

Så lad os fortsætte med den anden variant.

Resultatet:

[iframe height=250 src="pow-2" edit border="1"]

Som vi kunne forvente, fejlede den anden test. Selvfølgelig returnerer vores funktion altid `8`, mens `assert` forventer `81`.

## Forbedring af implementeringen

Lad os skrive noget mere rigtigt, så testene passerer:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

For at være sikre på, at funktionen virker godt, lad os teste den for flere værdier. I stedet for at skrive `it`-blokke manuelt, kan vi generere dem i en `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} i i tredje potens er ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

Resultatet:

[iframe height=250 src="pow-3" edit border="1"]

## Indlejret describe

Vi vil tilføje endnu flere tests. Men før det, lad os bemærke, at hjælpefunktionen `makeTest` og `for` bør grupperes sammen. Vi får ikke brug for `makeTest` i andre tests, den er kun nødvendig i `for`: deres fælles opgave er at tjekke, hvordan `pow` hæver til den givne potens.

Gruppering gøres med en indlejret `describe`:

```js
describe("pow", function() {

*!*
  describe("hæver x til tredje potens", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} i i tredje potens er ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... flere tests følger her, både describe og it kan tilføjes
});
```

Den indlejrede `describe` definerer en ny "undergruppe" af tests. I outputtet kan vi se den titlerede indrykning:

[iframe height=250 src="pow-4" edit border="1"]

I fremtiden kan vi tilføje flere `it` og `describe` på topniveau med hjælpefunktioner af deres egne, de vil ikke se `makeTest`.

````smart header="`before/after` and `beforeEach/afterEach`"
Vi kan opsætte `before/after` funktioner, der kører før/efter testene, og også `beforeEach/afterEach` funktioner, der kører før/efter *hver* `it`.

For eksempel:

```js no-beautify
describe("test", function() {

  before(() => alert("Testning startet – før alle tests"));
  after(() => alert("Testning færdig – efter alle tests"));

  beforeEach(() => alert("Før en test – ind i en test"));
  afterEach(() => alert("Efter en test – ud af en test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

Afviklingen vil være:

```
Testning startet – før alle tests (before)
Før en test – ind i en test (beforeEach)
1
Efter en test – ud af en test   (afterEach)
Før en test – ind i en test (beforeEach)
2
Efter en test – ud af en test   (afterEach)
Testning færdig – efter alle tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Normalt bruges `beforeEach/afterEach` og `before/after` til at udføre initialisering, nulstille tællere eller gøre noget andet mellem testene (eller testgrupperne).
````

## Udvidelse af specifikationen

Den grundlæggende funktionalitet af `pow` er færdig. Den første iteration af udviklingen er færdig. Når vi er færdige med at fejre og drikke champagne -- lad os gå videre og forbedre den.

Som det blev sagt, er funktionen `pow(x, n)` beregnet til at arbejde med positive heltal `n`.

For at indikere en matematisk fejl returnerer JavaScript-funktioner normalt `NaN`. Lad os gøre det samme for ugyldige værdier af `n`.

Lad os først tilføje adfærden til specifikationen(!):

```js
describe("pow", function() {

  // ...

  it("for negativt n er resultatet NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for ikke-heltal n er resultatet NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

Resultatet med de nye tests:

[iframe height=530 src="pow-nan" edit border="1"]

De nyligt tilføjede tests fejler, fordi vores implementering ikke understøtter dem. Sådan gør man BDD: først skriver vi fejlede tests, og så laver vi en implementering for dem.

```smart header="Andre assertions"
Bemærk påstanden `assert.isNaN`: den tjekker for `NaN`.

Der er også andre påstande i [Chai](https://www.chaijs.com/) for eksempel:

- `assert.equal(value1, value2)` -- tjekker ligheden  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- tjekker den strenge lighed `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse tjek til de ovenstående.
- `assert.isTrue(value)` -- tjekker at `value === true`
- `assert.isFalse(value)` -- tjekker at `value === false`
- ...den fulde liste findes i [dokumentationen](https://www.chaijs.com/api/assert/)
```

Så vi bør tilføje et par linjer til `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Nu virker det, alle tests består:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Åbn det fulde endelige eksempel i sandkassen."]

## Opsummering

I BDD går specifikationen først, efterfulgt af implementeringen. Til sidst har vi både specifikationen og koden.

Specifikationen kan bruges på tre måder:

1. Som **Tests** - de garanterer, at koden fungerer korrekt.
2. Som **Dokumentation** -- titlerne på `describe` og `it` fortæller, hvad funktionen gør.
3. Som **Eksempler** -- testene er faktisk fungerende eksempler, der viser, hvordan en funktion kan bruges.

Med specifikationen kan vi trygt forbedre, ændre eller endda omskrive funktionen fra bunden og sikre, at den stadig fungerer korrekt.

Det er især vigtigt i store projekter, hvor en funktion bruges mange steder. Når vi ændrer en sådan funktion, er der simpelthen ingen måde manuelt at kontrollere, om alle steder, der bruger den, stadig fungerer korrekt.

Uden tests har folk to muligheder:

1. At udføre ændringen uanset hvad. Og så møder vores brugere fejl, da vi sandsynligvis ikke får tjekket noget manuelt.
2. Eller, hvis straffen for fejl er hård, da der ikke er tests, bliver folk bange for at ændre sådanne funktioner, og så bliver koden forældet, ingen vil røre ved den. Ikke godt for udviklingen.

**Automatiske tests hjælper med at undgå disse problemer!**

Hvis projektet er dækket af tests, findes der simpelthen ikke sådan et problem. Efter enhver ændring kan vi køre tests og se mange kontroller udført på få sekunder.

**Derudover har en veltestet kode bedre arkitektur.**

Naturligvis er det fordi auto-testet kode er nemmere at ændre og forbedre. Men der er også en anden grund.

For at skrive tests skal koden være organiseret på en sådan måde, at hver funktion har en klart beskrevet opgave, veldefineret input og output. Det betyder en god arkitektur fra starten.

I virkeligheden er det nogle gange ikke så let. Nogle gange er det svært at skrive en specifikation før den faktiske kode, fordi det endnu ikke er klart, hvordan den skal opføre sig. Men generelt gør skrivning af tests udviklingen hurtigere og mere stabil.

Senere i vejledningen vil du møde mange opgaver med indbyggede tests. Så du vil se flere praktiske eksempler.

At skrive tests kræver god JavaScript-viden. Men vi er lige begyndt at lære det. Så for at få det hele på plads, er du indtil videre ikke forpligtet til at skrive tests, men du bør allerede kunne læse dem, selvom de er en smule mere komplekse end i dette kapitel.
