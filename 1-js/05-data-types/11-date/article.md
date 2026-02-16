# Dato og tid

Lad os se på et andet indbygget objekt: [Date](mdn:js/Date). Det gemmer datoen, tiden og giver metoder til håndtering af dato/tid.

For eksempel kan vi bruge det til at gemme oprettelses-/ændringstider, måle tid eller blot udskrive den nuværende dato.

## Oprettelse

For at oprette et nyt `Date` objekt kalder vi `new Date()` med en af følgende argumenter:

`new Date()`
: uden argumenter -- opretter et `Date` objekt med nuværende dato og tid:

    ```js run
    let now = new Date();
    alert( now ); // viser nuværende dato/tid
    ```

`new Date(millisekunder)`
: Opretter et `Date` objekt med tiden lig med antallet af millisekunder (1/1000 af en sekund) der er gået efter 1. januar 1970 UTC+0.

    ```js run
    // 0 betyder 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // tilføjer 24 timer, giver 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Et heltal der repræsenterer antallet af millisekunder der er gået siden 1. januar 1970 UTC+0 kaldes en *timestamp* (tidsstempel).

    Det er en simpel numerisk repræsentation af en dato som heltal. Vi kan altid oprette en dato fra et timestamp ved hjælp af `new Date(timestamp)` og konvertere et eksisterende `Date` objekt til et timestamp ved hjælp af metoden `date.getTime()` (se nedenfor).

    Datoer før 01.01.1970 har negative timestamps, e.g.:
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Hvis der sendes et enkelt argument og det er en streng, så bliver den automatisk fortolket. Algoritmen er den samme som `Date.parse` bruger - den ser vi på senere.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Tiden er ikke defineret, så det antages at være midnat GMT og
    // justeres i forhold til tidszonen hvor koden køres
    // Så resultatet kan være
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // eller
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(år, måned, dag, timer, minutter, sekunder, millisekunder)`
: Opretter et date objekt med de givne komponenter i den lokale tidszone. Kun de første to argumenter er obligatoriske.

    - `år` skal have 4 tal. For kompatibilitet er to tal også tilladt og betragtes som `19xx`. F.eks. `98` er det samme som `1998`. Men, brug af 4 tal er stærkt anbefalet.
    - `måned` tallet for måned starter fra `0` (Jan), op til `11` (Dec).
    - `dag` parameteren er den aktuelle dag i måneden. Hvis den ikke gives sættes den til `1`.
    - Hvis `timer/minutter/sekunder/millisekunder` ikke gives, sættes de til `0`.

    For eksempel, for at oprette et `Date` objekt for 1. januar 2011 kl. 00:00:00, kan vi bruge:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // samme resultat, timer osv. er sat til 0 som standard
    ```

    Maksimal præcision er 1 ms (1/1000 sekund):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Tilgå de enkelte komponenter i et dato objekt

Der er metoder til at tilgå år, måned og så videre fra et `Date` objekt:

[getFullYear()](mdn:js/Date/getFullYear)
: Henter årstallet (4 cifre)

[getMonth()](mdn:js/Date/getMonth)
: Henter måneden, **fra 0 til 11**.

[getDate()](mdn:js/Date/getDate)
: Henter dagen i måneden, fra 1 til 31 (Metodens navn er lidt mærkeligt).

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Henter de tilsvarende tidskomponenter.

```warn header="Ikke `getYear()`, men `getFullYear()`"
Mange JavaScript motorer har implememnteret en ikke-standard metode ved navn `getYear()`. Denne metode er udfaset. Den returnerer ofte 2-cifret år. Brug `getFullYear()` til at hente årstallet.
```

Derudover kan vi også få ugedagen:

[getDay()](mdn:js/Date/getDay)
: Henter ugedagen, fra `0` (søndag) til `6` (lørdag). Den første dag er som standard altid søndag. I Danmark er det mandag der betragtes som første ugedag, men det kan ikke ændres.

**Alle metoderne ovenfor returnerer komponenterne i forhold til den lokale tidszone.**

Der er også deres UTC-modsvar, som returnerer dag, måned, år og så videre for tidszonen UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Bare indsæt `"UTC"` lige efter `"get"`.

Hvis din lokale tidszone er forskellig fra UTC, så viser koden nedenfor forskellige timer:

Hvis din lokale tidszone er forskellig fra UTC, så viser koden nedenfor forskellige timer:

```js run
// nuværende dato
let date = new Date();

// Timer i den lokale tidszone
alert( date.getHours() );

// Timer i UTC+0 tidszone (London tid uden sommertid)
alert( date.getUTCHours() );
```

Udover de givne metoder er der to specielle der ikke har en UTC-variant:

[getTime()](mdn:js/Date/getTime)
: Returnerer en timestamp for datoen -- det antal millisekunder der er gået fra 1. januar 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Returnerer forskellen mellem UTC og den lokale tidszone, i minutter. For eksempel, hvis du er i tidszonen UTC-1, så returnerer den `60` (fordi UTC er 60 minutter foran). Hvis du er i tidszonen UTC+3, så returnerer den `-180` (fordi UTC er 180 minutter bagud).:

    ```js run
    // hvis du er i tidszonen UTC-1, gives 60
    // hvis du er i tidszonen UTC+3, gives -180
    alert( new Date().getTimezoneOffset() );

    ```

## Sæt de enkelte komponenter i et dato objekt

De følgende metoder tillader at sætte dato/tidskomponenter:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (sætter hele datoen baseret på antal millisekunder siden 01.01.1970 UTC)

Hver af disse undtaget `setTime()` har en UTC-variant, for eksempel: `setUTCHours()`.

Som vi kan se, kan nogle metoder sætte flere komponenter på én gang, for eksempel `setHours`. De komponenter der ikke er nævnt ændres ikke.

For eksempel:

```js run
let today = new Date();

today.setHours(0);
alert(today); // stadig dagen idag, men timer er ændret til 0

today.setHours(0, 0, 0, 0);
alert(today); // stadig dagen idag, men tiden er sat til 00:00:00.
```

## Automatisk korrektion

*autokorrektion* er en praktisk feature af `Date` objekter. Vi kan sætte værdier uden for det normale interval, og det vil automatisk justere sig.

For eksempel:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...bliver til 1st februar 2013!
```

Datokomponenter uden for det normale interval distribueres automatisk.

Lad os sige at vi vil forøge datoen "28 Feb 2016" med 2 dage. Det kan være "2 Mar" eller "1 Mar" i tilfældet af et skudår. Vi behøver ikke at tænke over det. Bare tilføj 2 dage. `Date` objektet vil gøre resten:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1. marts 2016
```

Denne feature er ofte brugt til at få datoen efter en given tidsperiode. For eksempel, lad os få datoen for "70 sekunder efter nu":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // viser den korrekte dato, 70 sekunder efter nu
```

Vi kan også indstille nul eller endda negative værdier. For eksempel, hvis vi sætter dag til nul, så bliver det den sidste dag i den forrige måned:

```js run
let date = new Date(2016, 0, 2); // 2. januar 2016

date.setDate(1); // sæt dagen til den 1. i måneden
alert( date );

date.setDate(0); // mindste dag er 1, så 0 vil sætte den til sidste dag i måneden før
alert( date ); // 31. december 2015
```

## Date til tal kan bruges til at trække datoer fra hinanden

Når et `Date` objekt konverteres til et tal, bliver det til en timestamp på samme måde som `date.getTime()`:

```js run
let date = new Date();
alert(+date); // antal millisekunder, samme som date.getTime()
```

En vigtig sideeffekt: datoer kan trækkes fra, og resultatet er deres forskel i millisekunder.

Det kan bruges til tidsmålinger:

```js run
let start = new Date(); // start måling af tid

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // slut tidsmåling

alert( `Loopet tog ${end - start} ms at gennemføre` );
```

## Date.now()

Hvis vi kun vil måle tid, behøver vi ikke hele `Date` objektet.

Der er en speciel metode `Date.now()` som returnerer den aktuelle timestamp.

Det er det samme som hvis du skriver `new Date().getTime()`, men det opretter ikke selve `Date` objektet. På den måde er det en hurtigere metode uden at påvirke garbage collection.

Det bruges mest fordi det er bekvemmeligt og hvis hastighed er kritisk, som ved udvikling af spil eller andre specialiserede programmer.

Så viil dette nok være bedre:

```js run
*!*
let start = Date.now(); // millisekunder tæller fra 1. januar 1970
*/!*

// Udfør en hansling
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // færdig
*/!*

alert( `Loopet tog ${end - start} ms at gennemføre` ); // træk de to tal fra hinanden
```

## Hastighedsmåling (benchmarking)

Hvis vi ønsker en pålidelig benchmark af en CPU-intensiv funktion, bør vi være forsigtige.

For eksempel, lad os måle to funktioner der beregner forskellen mellem to datoer: hvilken er hurtigere?

Sådanne ydeevne-målinger kaldes ofte "benchmarks".

```js
// Vi har date1 og date2. Hvilken funktion er hurtigere til at returnere forskellen i ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// eller måske denne?
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Disse to funktioner gør præcis det samme, men en af dem bruger et eksplicit `date.getTime()` for at få datoen i millisekunder, og den anden bruger en dato-til-tal konvertering. Deres resultat er altid det samme.

Så, hvilken er hurtigere?

Den første idé kan være at køre dem mange gange i træk og måle tidsforskellen. For vores tilfælde er funktionerne meget simple, så vi skal gøre det mindst 100000 gange.

Lad os måle det:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Tiden for diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Tiden for diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Brugen af `getTime()` er ret meget hurtigere! Hovedårsagen er at der ikke er nogen konvertering af datatype, det er meget lettere for motorer at optimere.

Okay, vi er på vej med noget. Men det er ikke en god benchmark endnu.

Forestil dig at der, mens `bench(diffSubtract)` kører, at CPU'en havde brug for at køre noget parallelt der optog ressourcer. Hvad hvis den opgave så var slut i den periode hvor `bench(diffGetTime)` kører?

Det er et meget realistisk scenarie i et moderne OS med flere porcesser der kører samtidig.

Resultatet vil være at den første benchmark vil have mindre CPU-ressourcer end den anden. Det kan føre til forkerte resultater.

**For en mere troværdig benchmarking, bør hele bunken af benchmarks blive kørt flere gange.**

For eksempel, som dette:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Moderne JavaScript motorer er begyndt at udføre avanceret optimering med fokus på "hot code" der kører mange gange - der er sjældent behov for at optimere kode der bruges sjældent. Så i eksemplet ovenfor er de første par afviklinger ikke godt optimerede. Vi ønsker måske at tilføje en "heat-up" kørsel før den egentlige benchmark for at få mere pålidelige resultater.:

```js
// Tilføj en "opvarming" før loopet
bench(diffSubtract);
bench(diffGetTime);

// nu til benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Vær opmærksom på at lave microbenchmarking"
Moderne JavaScript motorer udfører mange optimeringer. De kan godt tweake "artificielle tests" i forhold til "normal brug", især når vi benchmarker noget meget lille, som hvordan en operator virker eller en indbygget funktion. Så hvis du ønsker at forstå ydeevne, så studér venligst hvordan JavaScript-motoren virker. Og så vil du sandsynligvis ikke have brug for microbenchmarks overhovedet.

Der findes en god samling af artikler om V8 på <https://mrale.ph>.
```

## Date.parse fra en streng

Metoden [Date.parse(str)](mdn:js/Date/parse) kan læse en dato fra en streng.

Strengformatet skal være: `YYYY-MM-DDTHH:mm:ss.sssZ`, hvor:

- `YYYY-MM-DD` -- er datoen: år-måned-dag.
- Tegnet `"T"` bruges som separator.
- `HH:mm:ss.sss` -- er tiden: timer, minutter, sekunder og millisekunder.
- Den frivillige `'Z'` del markerer tidszonen i formatet `+-hh:mm`. En enkeltkarakter `Z` vil betyde UTC+0.

Kortere varianter er også mulige, f.eks. `YYYY-MM-DD` eller `YYYY-MM` eller endda `YYYY`.

Kaldet til `Date.parse(str)` tolker strengen i det givne format og returnerer tidsstempel (antal millisekunder fra 1. januar 1970 UTC+0). Hvis formatet er ugyldigt, returneres `NaN`.

For eksempel:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

Vi kan med det samme oprette et `new Date` objekt fra tidsstempel:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);
```

## Opsummering

- Dato og tid i JavaScript er repræsenteret med [Date](mdn:js/Date) objektet. Vi kan ikke oprette "kun dato" eller "kun tid": `Date` objekter bærer altid begge dele.
- Måneder tælles fra nul (ja, januar er måneden 0).
- Dagen på ugen hentes med `getDay()`. Den er også talt fra nul (det er søndag).
- `Date` autokorrigerer sig selv når delkomponenter sættes. Det er praktisk for at tilføje eller trække dage/måneder/timer fra hinanden.
- Datoer kan trækkes fra hinanden, hvilket giver deres forskel i millisekunder. Det skyldes at et `Date` objekt bliver et tidsstempel når det konverteres til et tal.
- Brug `Date.now()` for hurtigt at få det aktuelle tidsstempel.

Bemærk at, ulig mange andre systemer, er tidsstempel i JavaScript i millisekunder, ikke sekunder.

Nogle gange har vi brug for en mere præcis måling af tid. JavaScript har ikke en måde at måle tid i mikrosekunder (1 milliontedel af en sekund), men de fleste miljøer har det. For eksempel har browseren [performance.now()](mdn:api/Performance/now) som giver antallet af millisekunder fra starten af sideindlæsningen med mikrosekund præcision (3 cifre efter kommaet):

```js run
alert(`Siden blev indlæst for ${performance.now()}ms siden`);
// Noget i stil med: "Siden blev indlæst for 34731.26000000001ms siden"
// .26 er mikrosekunder (260 mikrosekunder)
// mere end 3 cifre efter kommaet er præcisionsfejl, kun de første 3 er korrekte
```

Node.js har `microtime` modulet og andre måder. Næsten alle enheder har miljøer tilgængeligt, der tillader stor præcision. Teknisk set tillader næsten enhver enhed og miljø at få mere præcise målinger, det er bare ikke i `Date`.
