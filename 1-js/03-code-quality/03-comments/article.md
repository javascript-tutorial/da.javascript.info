# Kommentarer

Som vi ved fra kapitlet <info:structure>, kan kommentarer være enkeltlinje: startende med `//` og flerlinje: `/* ... */`.

Vi bruger dem normalt til at beskrive, hvordan og hvorfor koden fungerer.

Ved første øjekast kan kommentering virke indlysende, men begyndere i programmering bruger dem ofte forkert.

## Dårlige kommentarer

Begyndere har en tendens til at bruge kommentarer til at forklare "hvad der foregår i koden". Som dette:

```js
// Denne kode vil gøre denne ting (...) og den ting (...)
// ...og hvem ved hvad ellers...
meget;
kompleks;
kode;
```

Men i god kode bør mængden af sådanne "forklarende" kommentarer være minimal. Seriøst, koden bør være let at forstå uden dem.

Der er en god regel om det: "hvis koden er så uklar, at den kræver en kommentar, så bør den måske omskrives i stedet".

### Opskrift: udtræk funktioner

Nogle gange er det gavnligt at erstatte et kodeafsnit med en funktion, som her:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // Tjek om i er et primtal
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

Den bedre variant, med en udtrukket funktion `isPrime`:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Nu kan vi nemmere forstå koden. Funktionen i sig selv bliver kommentaren. Sådan kode kaldes *selvbeskrivende*.

### Opskrift: opret funktioner

Og hvis vi har et langt "kodeark" som dette:

```js
// her tilsætter vi whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// her tilsætter vi juice
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

så er det måske en bedre idé at omstrukturere (refactor) det til funktioner som:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Altså, funktioner fortæller selv, hvad der foregår. Der er ikke noget at kommentere. Kodestrukturen er ofte bedre, når den er opdelt. Det er klart, hvad hver funktion gør, hvad den tager, og hvad den returnerer.

I virkeligheden kan vi ikke helt undgå "forklarende" kommentarer. Der findes komplekse algoritmer. Og der findes smarte "justeringer" med henblik på optimering. Men generelt bør vi forsøge at holde koden simpel og selvbeskrivende.

## Gode kommentarer

Så, forklarende kommentarer er normalt dårlige. Hvilke kommentarer er så gode?

Beskriv arkitekturen
: Giv et overblik over komponenterne, hvordan de interagerer, hvad kontrolflowet er i forskellige situationer... Kort sagt -- fugleperspektivet på koden. Der findes et specielt sprog [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) til at bygge højniveau arkitekturdiagrammer, der forklarer koden. Absolut værd at studere.

Dokumenter funktionsparametre og brug
: Der findes en speciel syntaks [JSDoc](http://en.wikipedia.org/wiki/JSDoc) til at dokumentere en funktion: brug, parametre, returneret værdi.

For eksempel:
```js
/**
 * Returner x hævet til n-te potens.
 *
 * @param {number} x Tallet der skal hæves.
 * @param {number} n Potensen, skal være et naturligt tal.
 * @return {number} x hævet til n-te potens.
 */
function pow(x, n) {
  ...
}
```

Sådanne kommentarer gør det muligt for os at forstå formålet med funktionen og bruge den på den rigtige måde uden at kigge i dens kode.

For resten kan mange editorer som [WebStorm](https://www.jetbrains.com/webstorm/) også forstå dem og bruge dem til at give autocomplete og nogle automatiske kodekontroller.
Der findes også værktøjer som [JSDoc 3](https://github.com/jsdoc/jsdoc), der kan generere HTML-dokumentation ud fra kommentarerne. Du kan læse mere om JSDoc på <https://jsdoc.app>.

Hvorfor er opgaven løst på denne måde?
: Det, der er skrevet, er vigtigt. Men det, der *ikke* er skrevet, kan være endnu vigtigere for at forstå, hvad der foregår. Hvorfor er opgaven løst præcis på denne måde? Koden giver ikke nødvendigvis noget svar i sig selv.

    Hvis der er mange måder at løse opgaven på, hvorfor denne? Især når det ikke er den mest oplagte.

    Uden sådanne kommentarer er følgende situation mulig:
    1. Du (eller din kollega) åbner koden, der er skrevet for noget tid siden, og ser, at den er "mindre optimal".
    2. Du tænker: "Hvor dum var jeg dengang, og hvor meget klogere er jeg nu", og omskriver ved hjælp af den "mere oplagte og korrekte" variant.
    3. ...Trangen til at omskrive var god. Men i processen ser du, at den "mere oplagte" løsning faktisk mangler noget. Du husker endda svagt hvorfor, fordi du allerede prøvede det for længe siden. Du går tilbage til den korrekte variant, men tiden var spildt.

    Kommentarer der forklarer løsningen er meget vigtige. De hjælper med at fortsætte udviklingen på den rigtige måde.

Eventuelle subtile funktioner i koden? Hvor de bruges?
: Hvis koden har noget subtilt og kontraintuitivt, er det bestemt værd at kommentere.

## Opsummering

En vigtig indikator for en god udvikler er kommentarer: deres tilstedeværelse og endda deres fravær.

Gode kommentarer gør det muligt for os at vedligeholde koden godt, vende tilbage til den efter en pause og bruge den mere effektivt.

**Kommenter dette:**

- Overordnet arkitektur, højniveau overblik.
- Funktionsbrug.
- Vigtige løsninger, især når de ikke er umiddelbart indlysende.

**Undgå kommentarer:**

- Der fortæller "hvordan koden virker" og "hvad den gør".
- Sæt dem kun ind, hvis det er umuligt at gøre koden så simpel og selvbeskrivende, at den ikke kræver dem.

Kommentarer bruges også til automatiske dokumentationsværktøjer som JSDoc3: de læser dem og genererer HTML-dokumentation (eller dokumentation i et andet format).
