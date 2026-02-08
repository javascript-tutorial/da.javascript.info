# Betinget forgrening: if, '?'

Nogle gange har vi brug for at udføre forskellige handlinger baseret på forskellige betingelser.

For at gøre det kan vi bruge `if`-udtrykket og den betingede operator `?`, som også kaldes "spørgsmålstegn"-operatoren.

## "if"-udtrykket

`if(...)`-udtrykket evaluerer en betingelse i parenteserne, og hvis resultatet er `true`, udfører det en kodeblok.

For eksempel:

```js run
let year = prompt('I hvilket år blev ECMAScript-2015-specifikationen udgivet?', '');

*!*
if (year == 2015) alert( 'Du har ret!' );
*/!*
```

I eksemplet ovenfor er betingelsen en simpel lighedstest (`year == 2015`), men den kan være meget mere kompleks.

Hvis vi vil udføre mere end én sætning, skal vi pakke vores kodeblok ind i krøllede parenteser:

```js
if (year == 2015) {
  alert( "Det er korrekt!" );
  alert( "Du er så klog!" );
}
```

Vi anbefaler at pakke din kodeblok ind i krøllede parenteser `{}` hver gang du bruger en `if`-sætning, selvom der kun er én sætning at udføre. Det forbedrer læsbarheden.

## Boolean-konvertering

`if (…)`-sætningen evaluerer udtrykket i sine parenteser og konverterer resultatet til en boolean.

Lad os huske konverteringsreglerne fra kapitlet <info:type-conversions>:

- Et tal `0`, en tom streng `""`, `null`, `undefined` og `NaN` bliver alle til `false`. Derfor kaldes de "falsy" værdier.
- Andre værdier bliver til `true`, så de kaldes "truthy".

Så koden under denne betingelse vil aldrig blive udført:

```js
if (0) { // 0 is falsy
  ...
}
```

...og inde i denne betingelse -- det vil den altid gøre:

```js
if (1) { // 1 is truthy
  ...
}
```

Vi kan også give en forud-evalueret boolean værdi til `if`, sådan her:

```js
let cond = (year == 2015); // equality evaluates to true or false

if (cond) {
  ...
}
```

## "else"-ledet

Et `if`-udtryk kan indeholde et valgfrit `else`-led. Det udføres, når betingelsen er falsk.

For eksempel:
```js run
let year = prompt('I hvilket år blev ECMAScript-2015-specifikationen udgivet?', '');

if (year == 2015) {
  alert( 'Du har ret!' );
} else {
  alert( 'Hvordan kan du tage så fejl?' ); // any value except 2015
}
```

## Flere betingelser: "else if"

Nogle gange vil vi gerne teste flere varianter af en betingelse. `else if`-leddet lader os gøre det.

For eksempel:

```js run
let year = prompt('I hvilket år blev ECMAScript-2015-specifikationen udgivet?', '');

if (year < 2015) {
  alert( 'For tidligt...' );
} else if (year > 2015) {
  alert( 'For sent' );
} else {
  alert( 'Præcis!' );
}
```

I koden ovenfor tjekker JavaScript først `year < 2015`. Hvis det er falsk, går det videre til den næste betingelse `year > 2015`. Hvis det også er falsk, viser det den sidste `alert`.

Der kan være flere `else if`-blokke. Det sidste `else` er valgfrit.

## Den betingede operator '?'

Nogle gange har vi brug for at tildele en variabel afhængigt af en betingelse.

For eksempel:

```js run no-beautify
let accessAllowed;
let age = prompt('Hvor gammel er du?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Den såkaldte "betingede" eller "spørgsmålstegn" operator lader os gøre det på en kortere og enklere måde.

Operatoren repræsenteres af et spørgsmålstegn `?`. Nogle gange kaldes det "ternary", fordi operatoren har tre operander. Det er faktisk den eneste operator i JavaScript, der har så mange.

Syntaksen er:
```js
let result = condition ? value1 : value2;
```

Betingelsen `condition` evalueres: hvis den er sand, returneres `value1`, ellers returneres `value2`.

For eksempel:

```js
let accessAllowed = (age > 18) ? true : false;
```

Teknisk set kan vi udelade parenteserne omkring `age > 18`. Spørgsmålstegn-operatoren har en lav præcedens, så den udføres efter sammenligningen `>`.

Dette eksempel vil gøre det samme som det forrige:

```js
// the comparison operator "age > 18" executes first anyway
// (no need to wrap it into parentheses)
let accessAllowed = age > 18 ? true : false;
```

Men parenteser gør koden mere læsbar, så vi anbefaler at bruge dem.

````smart
I eksemplet ovenfor kan du undgå at bruge spørgsmålstegn-operatoren, fordi sammenligningen i sig selv returnerer `true/false`:

```js
// det samme
let accessAllowed = age > 18;
```
````

## Flere '?'

En sekvens af spørgsmålstegn-operatorer `?` kan returnere en værdi, der afhænger af mere end én betingelse.

For instance:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

Det kan være svært i starten at forstå, hvad der foregår. Men efter et nærmere kig kan vi se, at det blot er en almindelig sekvens af tests:

1. Det første spørgsmålstegn tjekker, om `age < 3`.
2. Hvis det er sandt -- returnerer det `'Hi, baby!'`. Ellers fortsætter det til udtrykket efter kolon ":", hvor det tjekker `age < 18`.
3. Hvis det er sandt -- returnerer det `'Hello!'`. Ellers fortsætter det til udtrykket efter det næste kolon ":", hvor det tjekker `age < 100`.
4. Hvis det er sandt -- returnerer det `'Greetings!'`. Ellers fortsætter det til udtrykket efter det sidste kolon ":", hvor det returnerer `'What an unusual age!'`.

Sådan ser det ud ved brug af `if..else`:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Ikke-traditionel brug af '?'

Nogle gange bruges spørgsmålstegnet `?` som en erstatning for `if`:

```js run no-beautify
let company = prompt('Hvilket firma skabte JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Rigtigt!') : alert('Forkert.');
*/!*
```

Afhængigt af betingelsen `company == 'Netscape'` bliver enten det første eller det andet udtryk efter `?` udført og viser en alert.

Vi tildeler ikke et resultat til en variabel her. I stedet udfører vi forskellig kode afhængigt af betingelsen.

**Det anbefales ikke at bruge spørgsmålstegn-operatoren på denne måde.**

Notationen er kortere end den tilsvarende `if`-sætning, hvilket tiltaler nogle programmører. Men den er mindre læsbar.

Her er den samme kode ved brug af `if` til sammenligning:

```js run no-beautify
let company = prompt('Hvilket firma skabte JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Rigtigt!');
} else {
  alert('Forkert.');
}
*/!*
```

Vores øjne scanner koden lodret. Kodeblokke, der spænder over flere linjer, er lettere at forstå end en lang, horisontal instruktionssætning.

Formålet med spørgsmålstegn-operatoren `?` er at returnere en værdi eller en anden afhængigt af dens betingelse. Brug den præcis til det. Brug `if`, når du har brug for at udføre forskellige kodegrene.
