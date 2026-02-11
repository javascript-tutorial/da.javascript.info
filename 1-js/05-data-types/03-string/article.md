# Tekststrenge (Strings)

I JavaScript gemmes tekstdata som strenge. Der findes ikke en separat type for et enkelt tegn.

Det interne format for strenge er altid [UTF-16](https://en.wikipedia.org/wiki/UTF-16), det er ikke bundet til sidekodningen.

## Anførselstegn

Lad os genkalde os typerne af anførselstegn.

Strenge kan omsluttes enten af enkelt anførselstegn, dobbelte anførselstegn eller backticks:
```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Enkelt og dobbelte anførselstegn er stort set det samme. Backticks, derimod, tillader os at indlejre enhver udtryk i strengen ved at omslutte det med `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

En anden fordel ved at bruge backticks er, at de tillader en streng at strække sig over flere linjer:

```js run
let guestList = `Gæster:
 * John
 * Pete
 * Mary
`;

alert(guestList); // en liste over gæster, flere linjer
```

Ser naturligt ud, ikke? Men enkelt- eller dobbelte anførselstegn fungerer ikke på denne måde.

Hvis vi bruger dem og forsøger at bruge flere linjer, vil der opstå en fejl:

```js run
let guestList = "Gæster: // Error: Unexpected token ILLEGAL
  * John";
```

Enkelt- og dobbelte anførselstegn stammer fra de gamle dage af sprogets oprettelse, hvor behovet for multiline-strenge ikke blev taget i betragtning. Backticks dukkede op meget senere og er derfor mere alsidige.

Backticks tillader os også at angive en "template-funktion" før det første backtick. Syntaksen er: <code>func&#96;string&#96;</code>. Funktionen `func` kaldes automatisk, modtager strengen og indlejrede udtryk og kan behandle dem. Denne funktion kaldes "taggede templates", det ses sjældent, men du kan læse om det i MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Specialtegn

Det er stadig muligt at lave multiline-strenge med enkelt- og dobbelte anførselstegn ved at bruge et såkaldt "newline-tegn", skrevet som `\n`, som angiver et linjeskift:

```js run
let guestList = "Gæster:\n * John\n * Pete\n * Mary";

alert(guestList); // en liste over gæster, flere linjer
```

Som et enklere eksempel er disse to linjer ens, bare skrevet forskelligt:

```js run
let str1 = "Hej\nVerden"; // to linjer ved hjælp af et "newline-tegn"

// to linjer ved hjælp af en normal newline og backticks
let str2 = `Hej
Verden`;

alert(str1 == str2); // true
```

Der findes også andre, mindre almindelige specialtegn:

| Tegn | Beskrivelse |
|-----------|-------------|
|`\n`|Ny linje|
|`\r`|I Windows-tekstfiler repræsenterer en kombination af to tegn `\r\n` et linjeskift, mens det på ikke-Windows OS kun er `\n`. Det skyldes historiske årsager, de fleste Windows-programmer forstår også `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Anførselstegn|
|`\\`|Backslash|
|`\t`|Tabulator|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- nævnt for fuldstændighedens skyld, stammer fra gamle dage, bruges ikke længere (du kan glemme dem lige nu). |

Som du kan se, starter alle specialtegn med et backslash-tegn `\`. Det kaldes også et "escape-tegn".

Fordi det er så specielt, hvis vi skal vise et faktisk backslash `\` i strengen, skal vi fordoble det:

```js run
alert( `En backslash: \\` ); // En backslash: \
```

Såkaldte "escaped" anførselstegn `\'`, `\"`, <code>\\`</code> bruges til at indsætte et anførselstegn i en streng med samme anførselstegn.

For eksempel:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Som du kan se, skal vi foranstille det indre anførselstegn med backslash `\'`, fordi det ellers ville indikere slutningen af strengen.

Selvfølgelig skal kun de anførselstegn, der er de samme som de omsluttende, escapes. Så som en mere elegant løsning kunne vi skifte til dobbelte anførselstegn eller backticks i stedet:

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

Udover disse specialtegn findes der også en særlig notation for Unicode-koder `\u…`, det bruges sjældent og dækkes i det valgfrie kapitel om [Unicode](info:unicode).

## Længden af en streng

Egenskaben `length` indeholder længden af strengen:

```js run
alert( `Min\n`.length ); // 4
```

Bemærk, at `\n` er et enkelt "specialtegn", så længden er faktisk `4`.

```warn header="`length` er en egenskab"
Folk med baggrund i nogle andre sprog skriver nogle gange forkert ved at kalde `str.length()` i stedet for bare `str.length`. Det virker ikke.

Bemærk venligst, at `str.length` er en numerisk egenskab, ikke en funktion. Der er ikke behov for at tilføje parenteser efter den. Ikke `.length()`, men `.length`.
```

## Tilgang til enkelte tegn

For at få et tegn på position `pos`, brug firkantede parenteser `[pos]` eller kald metoden [str.at(pos)](mdn:js/String/at). Det første tegn starter fra nulpositionen:

```js run
let str = `Hejsa`;

// den første karakter
alert( str[0] ); // H
alert( str.at(0) ); // H

// det sidste tegn
alert( str[str.length - 1] ); // a
alert( str.at(-1) ); // a
```

Som du kan se, har metoden `.at(pos)` den fordel, at den tillader negative positioner. Hvis `pos` er negativ, tælles det fra slutningen af strengen.

Så `.at(-1)` betyder det sidste tegn, og `.at(-2)` er det næstsidste osv.

Firkantede parenteser returnerer altid `undefined` for negative indekser, for eksempel:

```js run
let str = `Hejsa`;

alert( str[-2] ); // undefined
alert( str.at(-2) ); // s
```

Vi kan også iterere over tegn ved hjælp af `for..of`:

```js run
for (let char of "Hejsa") {
  alert(char); // H,e,j,s,a (char bliver "H", derefter "e", derefter "j" osv.)
}
```

## Strenge er uforanderlige (immutable)

Tekststrenge kan ikke ændres i JavaScript. Det er umuligt at ændre et enkelt tegn.

Lad os prøve for at vise, at det ikke virker:

```js run
let str = 'Hi';

str[0] = 'h'; // fejl
alert( str[0] ); // virker ikke
```

Den sædvanlige løsning er at oprette en helt ny streng og tildele den til `str` i stedet for den gamle.

For eksempel:

```js run
let str = 'Hi';

str = 'h' + str[1]; // erstat strengen

alert( str ); // hi
```

I de følgende afsnit vil vi se flere eksempler på dette.

## Ændring af store og små bogstaver

Metoderne [toLowerCase()](mdn:js/String/toLowerCase) og [toUpperCase()](mdn:js/String/toUpperCase) ændrer store og små bogstaver:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Eller, hvis vi vil have et enkelt tegn i små bogstaver:

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Søgning efter en delstreng

Der er flere måder at lede efter en delstreng i en streng på.

### str.indexOf

Den første metode er [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Den leder efter `substr` i `str`, startende fra den givne position `pos`, og returnerer positionen hvor matchen blev fundet eller `-1` hvis intet kan findes.

For eksempel:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, fordi 'Widget' findes i starten
alert( str.indexOf('widget') ); // -1, ikke fundet, søgningen er case-sensitive

alert( str.indexOf("id") ); // 1, "id" findes på position 1 (..idget with id)
```

Den valgfrie anden parameter tillader os at starte søgningen fra en given position.

For eksempel, den første forekomst af `"id"` er på position `1`. For at finde den næste forekomst, lad os starte søgningen fra position `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Hvis vi er interesserede i alle forekomster, kan vi køre `indexOf` i en løkke. Hver ny kald foretages med positionen efter det forrige match:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // lad os lede efter det

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Fundet ved ${foundPos}` );
  pos = foundPos + 1; // fortsæt søgningen fra den næste position
}
```

Den samme algoritme kan skrives kortere ved at kombinere tildelingen og betingelsen i `while`:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Der er også en lignende metode [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf), som søger fra slutningen af en streng mod begyndelsen.

Den vil liste forekomsterne i omvendt rækkefølge.
```

Der er en lille ulempe ved `indexOf` i `if`-testen. Vi kan ikke sætte det i `if` som dette:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("Vi fandt det"); // virker ikke!
}
```

`alert` i det ovenstående eksempel vises ikke, fordi `str.indexOf("Widget")` returnerer `0` (hvilket betyder, at det fandt matchen ved startpositionen). Men `if` betragter `0` som `false`.

Så vi skal faktisk tjekke for `-1`, som dette:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Vi fandt det"); // virker nu!
}
```

### includes, startsWith, endsWith

Den mere moderne metode [str.includes(substr, pos)](mdn:js/String/includes) returnerer `true/false` afhængigt af, om `str` indeholder `substr`.

Det er det rigtige valg, hvis vi skal teste for et match, men ikke har brug for dets position:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

Den valgfrie anden parameter af `str.includes` er positionen, hvorfra søgningen skal starte:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, fra position 3 findes der ikke "id"
```

Metoderne [str.startsWith](mdn:js/String/startsWith) og [str.endsWith](mdn:js/String/endsWith) gør præcis, hvad de siger: de tjekker, om strengen starter eller slutter med den givne delstreng:

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starter med "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" slutter med "get"
```

## Hent en delstreng

Der er 3 metoder i JavaScript til at hente en delstreng: `substring`, `substr` og `slice`.

`str.slice(start [, end])`
: Returnerer delen af strengen fra `start` til (men ikke inklusive) `end`.

    For eksempel:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', delstrengen fra 0 til 5 (ikke inklusive 5)
    alert( str.slice(0, 1) ); // 's', fra 0 til 1, men ikke inklusive 1, så kun tegnet ved 0
    ```

    Hvis der ikke er noget andet argument, går `slice` til slutningen af strengen:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', fra den 2. position til slutningen
    ```

    Negative værdier for `start`/`end` er også mulige. De betyder, at positionen tælles fra slutningen af strengen:

    ```js run
    let str = "strin*!*gif*/!*y";

    // starter ved den 4. position fra højre, slut ved den 1. fra højre
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Returnerer delen af strengen *mellem* `start` og `end` (ikke inklusive `end`).

    Dette ligner næsten `slice`, men det tillader `start` at være større end `end` (i så fald bytter det simpelthen `start` og `end` værdierne).

    For eksempel:

    ```js run
    let str = "st*!*ring*/!*ify";

    // disse er ens for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...men ikke for slice:
    alert( str.slice(2, 6) ); // "ring" (det samme)
    alert( str.slice(6, 2) ); // "" (en tom streng)

    ```

    Negative argumenter for `substring` er (i modsætning til `slice`) ikke understøttet, de behandles som `0`.

`str.substr(start [, length])`
: Returnerer delen af strengen fra `start`, med den givne `length`.

    I modsætning til de tidligere metoder, tillader denne os at angive `length` i stedet for slutpositionen. Det betyder, at den returnerer et antal tegn, startende fra `start`.:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', fra den 2. position hent 4 tegn
    ```

    Det første argument kan være negativt, for at tælle fra slutningen:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', fra den 4. position hent 2 tegn
    ```

    Denne metode findes i [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) af sprogspecifikationen. Det betyder, at kun browser-hostede Javascript-motorer bør understøtte den, og det anbefales ikke at bruge den. I praksis understøttes den overalt.

Lad os samle op på disse metoder for at undgå forvirring:

| metode | vælger... | negative værdier |
|--------|-----------|------------------|
| `slice(start, end)` | fra `start` til `end` (ikke inklusive `end`) | tillader negative værdier |
| `substring(start, end)` | mellem `start` og `end` (ikke inklusive `end`)| negative værdier betyder `0` |
| `substr(start, length)` | fra `start` hent `length` antal tegn | tillader negativ `start` |

```smart header="Hvilken en skal man vælge?"
Alle kan udføre opgaven. Formelt set har `substr` en lille ulempe: den er beskrevet ikke i den centrale JavaScript-specifikation, men i Annex B, som dækker browser-only funktioner, der hovedsageligt findes af historiske årsager. Så ikke-browser-miljøer kan muligvis ikke understøtte den. Men i praksis fungerer den overalt.

Af de to andre varianter er `slice` lidt mere fleksibel, den tillader negative argumenter og er kortere at skrive.

Så til praktisk brug er det nok kun at huske `slice`.

```

## Sammenligning af strenge

Som vi ved fra kapitlet <info:comparison>, sammenlignes strenge tegn for tegn i alfabetisk rækkefølge.

Der er dog nogle ting der er lidt mærkelige.

1. Et lille bogstav er altid større end det store:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Bogstaver med diakritiske tegn er "uden for alfabetisk rækkefølge":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Dette kan føre til mærkelige resultater, hvis vi sorterer disse landnavne. Normalt ville man forvente, at `Zealand` kommer efter `Österreich` på listen.

For at forstå, hvad der sker, skal vi være opmærksomme på, at strenge i Javascript er kodet ved hjælp af [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Det vil sige: hvert tegn har en tilsvarende numerisk kode.

Der er specielle metoder, der tillader at få tegnet for koden og tilbage:

`str.codePointAt(pos)`
: Returnerer et decimalt tal, der repræsenterer koden for tegnet på position `pos`:

    ```js run
    // forskellige store/små bogstaver har forskellige koder
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (hvis vi har brug for en hexadecimal værdi)
    ```

`String.fromCodePoint(code)`
: Opretter et tegn ud fra dets numeriske `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (vi kan også bruge en hex-værdi som argument)
    ```

Lad os se på tegn med koderne `65..220` (det latinske alfabet og lidt ekstra) ved at lave en streng af dem:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Se? Store bogstaver kommer først, så nogle få specialtegn, derefter små bogstaver, og `Ö` nær slutningen af outputtet.

Nu bliver det tydeligt, hvorfor `a > Z`.

Tegnene sammenlignes efter deres numeriske kode. Den større kode betyder, at tegnet er større. Koden for `a` (97) er større end koden for `Z` (90).

- Alle små bogstaver kommer efter store bogstaver, fordi deres koder er større.
- Nogle bogstaver som `Ö` står uden for hovedalfabetet. Her er dens kode større end noget fra `a` til `z`.

### Korrekte sammenligninger [#correct-comparisons]

Den "rigtige" algoritme til at sammenligne strenge er mere kompleks, end det måske ser ud til, fordi alfabetet er forskelligt for forskellige sprog. Du kan f.eks. se på listen ovenfor at Å kommer før Æ og Ø i det danske.

Så browseren skal kende sproget for at kunne sammenligne korrekt.

Heldigvis understøtter moderne browsere internationaliseringsstandarden [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).

Den giver en speciel metode til at sammenligne strenge på forskellige sprog efter deres regler.

Kaldet [str.localeCompare(str2)](mdn:js/String/localeCompare) returnerer et heltal, der angiver, om `str` er mindre, lig med eller større end `str2` i henhold til sprogets regler:

- Returnerer et negativt tal, hvis `str` er mindre end `str2`.
- Returnerer et positivt tal, hvis `str` er større end `str2`.
- Returnerer `0`, hvis de er ækvivalente.

For eksempel:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Denne metode har faktisk to yderligere argumenter specificeret i [dokumentationen](mdn:js/String/localeCompare), som gør det muligt at angive sproget (som som standard tages fra miljøet, bogstavrækkefølgen afhænger af sproget) og opsætte yderligere regler som f.eks. forskel på store og små bogstaver eller om `"a"` og `"á"` skal behandles som det samme osv.

## Opsummering

- Der er 3 typer anførselstegn. Backticks tillader en streng at strække sig over flere linjer og indlejre udtryk `${…}`.
- Vi kan bruge specialtegn, såsom et linjeskift `\n`.
- For at få et tegn, brug: `[]` eller `at` metoden.
- For at få en delstreng, brug: `slice` eller `substring`.
- For at gøre en streng til små/stor bogstaver, brug: `toLowerCase/toUpperCase`.
- For at lede efter en delstreng, brug: `indexOf`, eller `includes/startsWith/endsWith` for simple tjek.
- For at sammenligne strenge efter sproget, brug: `localeCompare`, ellers sammenlignes de efter tegnkoder.

Der er flere andre nyttige metoder i strenge, for eksempel:

- `str.trim()` -- fjerner ("trimmer") mellemrum fra begyndelsen og slutningen af strengen.
- `str.repeat(n)` -- gentager strengen `n` gange.
- ...og flere kan findes i [manualen](mdn:js/String).

Strenge har også metoder til at søge/erstatte med regulære udtryk. Men det er et stort emne, så det forklares i en separat tutorialsektion <info:regular-expressions>.

Desuden er det vigtigt at vide, at strenge er baseret på Unicode-kodning, og derfor er der problemer med sammenligninger. Der er mere om Unicode i kapitlet <info:unicode>.
