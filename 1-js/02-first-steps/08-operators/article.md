# Grundlæggende operatorer, matematik

Vi kender mange operatorer fra skolen. De er ting som addition `+`, multiplikation `*`, subtraktion `-` og så videre.

I dette kapitel starter vi med simple operatorer og fokuserer derefter på JavaScript-specifikke aspekter, som ikke dækkes af skolearitmetik.

## Termer: "unary (unær)", "binær", "operand"

Før vi går videre, lad os forstå nogle almindelige termer.

- *En operand* -- er hvad operatorer anvendes på. For eksempel, i multiplikationen `5 * 2` er der to operander: den venstre operand er `5` og den højre operand er `2`. Nogle gange kalder folk disse "argumenter" i stedet for "operander".
- En operator er *unary* hvis den har en enkelt operand. For eksempel, den unære negation `-` vender fortegnet af et tal:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unary negation blev anvendt
    ```
- En operator er *binær* hvis den har to operander. Den samme minus eksisterer også i binær form:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binær minus trækker værdier fra hinanden
    ```

    Formelt set, i eksemplerne ovenfor har vi to forskellige operatorer, der deler det samme symbol: negationsoperatoren, en unær operator der vender fortegnet, og subtraktionsoperatoren, en binær operator der trækker et tal fra et andet.

## Matematik

Følgende matematiske operationer understøttes:

- Addition `+`,
- Subtraktion `-`,
- Multiplikation `*`,
- Division `/`,
- Rest `%`,
- Eksponentiering `**`.

De første fire er ligetil, mens `%` og `**` kræver nogle få ord om dem.

### Rest %

Rest-operatoren `%`, på trods af sit udseende, er ikke relateret til procenter.

Resultatet af `a % b` er [resten](https://en.wikipedia.org/wiki/Remainder) af heltalsdivisionen af `a` med `b`.

For eksempel:

```js run
alert( 5 % 2 ); // 1, resten af 5 divideret med 2
alert( 8 % 3 ); // 2, resten af 8 divideret med 3
alert( 8 % 4 ); // 0, resten af 8 divideret med 4
```

### Eksponentiering **

Eksponentieringsoperatoren `a ** b` hæver `a` til potensen `b`.

I skolematematik skriver vi det som a<sup>b</sup>.

For eksempel:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

Ligesom i matematik er eksponentieringsoperatoren også defineret for ikke-heltal.

For eksempel er en kvadratrod en eksponentiering med ½:

```js run
alert( 4 ** (1/2) ); // 2 (potens på 1/2 er det samme som en kvadratrod)
alert( 8 ** (1/3) ); // 2 (potens på 1/3 er det samme som en kubikrod)
```

## String-sammenkædning med binær +

Lad os se på funktionerne i JavaScript-operatorer, der går ud over skolearitmetik.

Normalt summerer plus-operatoren `+` tal.

Men hvis den binære `+` anvendes på strenge, sammenkæder den dem:

```js
let s = "min" + "streng";
alert(s); // minstreng
```

Bemærk, at hvis en af operanderne er en streng, så konverteres den anden også til en streng.

For eksempel:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Som du kan se, er det ligegyldigt, om den første operand er en streng eller den anden.

Her er et mere komplekst eksempel:

```js run
alert(2 + 2 + '1' ); // "41" og ikke "221"
```

Her arbejder operatorerne en efter en. Den første `+` summerer to tal, så den returnerer `4`, derefter tilføjer den næste `+` strengen `1` til det, så det er som `4 + '1' = '41'`.

```js run
alert('1' + 2 + 2); // "122" og ikke "14"
```
Her er den første operand en streng, så behandler compileren de andre to operander som strenge også. `2` bliver sammenkædet med `'1'`, så det er som `'1' + 2 = "12"` og `"12" + 2 = "122"`.

Den binære `+` er den eneste operator, der understøtter strenge på denne måde. Andre aritmetiske operatorer fungerer kun med tal og konverterer altid deres operander til tal.

Her er demoen for subtraktion og division:

```js run
alert( 6 - '2' ); // 4, konverterer '2' til et tal
alert( '6' / '2' ); // 3, konverterer begge operander til tal
```

## Numerisk konvertering, unær +

Plusset `+` findes i to former: den binære form, som vi brugte ovenfor, og den i unary form.

Det unary plus eller, med andre ord, plusoperatoren `+` anvendt på en enkelt værdi, gør ikke noget ved tal. Men hvis operanden ikke er et tal, konverterer det unary plus det til et tal.

For eksempel:

```js run
// Ingen effekt på tal
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Konverterer ikke-tal
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Den gør faktisk det samme som `Number(...)`, men er kortere.

Behovet for at konvertere strenge til tal opstår meget ofte. For eksempel, hvis vi får værdier fra HTML-formularfelter, er de normalt strenge. Hvad hvis vi vil summere dem?

Den binære plus ville tilføje dem som strenge:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", den binære plus sammenkæder strenge
```

Hvis vi vil behandle dem som tal, skal vi konvertere og derefter summere dem:

```js run
let apples = "2";
let oranges = "3";

*!*
// begge værdier konverteret til tal før den binære plus
alert( +apples + +oranges ); // 5
*/!*

// den længere variant
// alert( Number(apples) + Number(oranges) ); // 5
```

Fra en matematikers synspunkt kan overfloden af plusser virke mærkelig. Men fra en programmørens synspunkt er der ikke noget specielt: unary plusser anvendes først, de konverterer strenge til tal, og derefter summerer den binære plus dem.

Hvorfor anvendes unary plusser på værdier før de binære? Som vi skal se, er det på grund af deres *højere præcedens*.

## Operator-præcedens

Hvis et udtryk har mere end én operator, defineres eksekveringsrækkefølgen af deres *præcedens*, eller med andre ord, den standard prioriteringsrækkefølge af operatorer.

Fra skolen ved vi alle, at multiplikationen i udtrykket `1 + 2 * 2` skal beregnes før additionen. Det er præcis det, præcedens handler om. Multiplikationen siges at have *en højere præcedens* end additionen.

Parenteser tilsidesætter enhver præcedens, så hvis vi ikke er tilfredse med standardrækkefølgen, kan vi bruge dem til at ændre den. For eksempel, skriv `(1 + 2) * 2`.

Der er mange operatorer i JavaScript. Hver operator har et tilsvarende præcedensnummer. Den med det højere nummer eksekveres først. Hvis præcedensen er den samme, er eksekveringsrækkefølgen fra venstre mod højre.

Her er et uddrag fra [præcedenstabellen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (du behøver ikke at huske dette, men bemærk at unary operatorer er højere end tilsvarende binære):

| Præcedens | Navn | Tegn |
|-----------|------|------|
| ... | ... | ... |
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | eksponentiering | `**` |
| 12 | multiplikation | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraktion | `-` |
| ... | ... | ... |
| 2 | tildeling | `=` |
| ... | ... | ... |

Som vi kan se, har "unary plus" en prioritet på `14`, hvilket er højere end `11` for "addition" (binær plus). Derfor, i udtrykket `"+apples + +oranges"`, arbejder unary plusser før additionen.

## Tildeling

Bemærk, at en tildeling `=` også er en operator. Den er opført i præcedenstabellen med den meget lave prioritet `2`.

Derfor, når vi tildeler en variabel, som `x = 2 * 2 + 1`, udføres beregningerne først, og derefter evalueres `=`, hvilket gemmer resultatet i `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Tildeling = returnerer en værdi

Det faktum, at `=` er en operator og ikke en "magisk" sprogkonstruktion, har en interessant implikation.

Alle operatorer i JavaScript returnerer en værdi. Det er indlysende for `+` og `-`, men også sandt for `=`.

Kaldet `x = value` skriver `value` ind i `x` *og returnerer det derefter*.

Her er et eksempel, der bruger en tildeling som en del af et mere komplekst udtryk:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

I eksemplet ovenfor er resultatet af udtrykket `(a = b + 1)` den værdi, der blev tildelt `a` (det vil sige `3`). Det bruges derefter til yderligere evalueringer.

Sjov kode, ikke? Vi bør forstå, hvordan det fungerer, fordi vi nogle gange ser det i JavaScript-biblioteker.

Men normalt skal du ikke skrive kode som denne. Sådanne tricks gør bestemt ikke koden klarere eller mere læsbar.

### Sammenkædede tildelinger

En anden interessant funktion er muligheden for at sammenkæde tildelinger:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Sammenkædede tildelinger evalueres fra højre mod venstre. Først evalueres det højre udtryk `2 + 2` og tildeles derefter til variablerne til venstre: `c`, `b` og `a`. Til sidst deler alle variablerne en enkelt værdi.

For læsbarhedens skyld er det ofte bedre at opdele sådan kode i flere linjer:

```js
c = 2 + 2;
b = c;
a = c;
```
Det er lettere at læse, især når man hurtigt skimmer koden.

## Ændre en variabels egen værdi

Vi har ofte brug for at anvende en operator på en variabel og gemme det nye resultat i den samme variabel.

For eksempel:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Denne notation kan forkortes ved at bruge operatorerne `+=` og `*=`:

```js run
let n = 2;
n += 5; // nu er n = 7 (samme som n = n + 5)
n *= 2; // nu er n = 14 (samme som n = n * 2)

alert( n ); // 14
```

Korte "ændre-og-tildel" operatorer findes for alle aritmetiske og bitvise operatorer: `/=`, `-=`, osv.

Sådanne operatorer har samme præcedens som en normal tildeling, så de kører efter de fleste andre beregninger:

```js run
let n = 2;

n *= 3 + 5; // højre del evalueres først, samme som n *= 8

alert( n ); // 16
```

## Inkrement/dekrement

<!-- Kan ikke bruge -- i titlen, fordi den indbyggede parser omdanner det til en 'lang bindestreg' – -->

At øge eller mindske et tal med én er blandt de mest almindelige numeriske operationer.

Derfor er der specielle operatorer til det:

- **Inkrement** `++` øger en variabel med 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // fungerer på samme måde som counter = counter + 1, men er kortere
    alert( counter ); // 3
    ```
- **Dekrement** `--` mindsker en variabel med 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // fungerer på samme måde som counter = counter - 1, men er kortere
    alert( counter ); // 1
    ```

```warn
Inkrement/dekrement kan kun anvendes på variabler. Forsøg på at bruge det på en værdi som `5++` vil give en fejl.
```

Operatorerne `++` og `--` kan placeres enten før eller efter en variabel.

- Når operatoren kommer efter variablen, er den i "postfix form": `counter++`.
- "Prefix form" er, når operatoren kommer før variablen: `++counter`.

Begge disse udsagn gør det samme: øger `counter` med `1`.

Er der nogen forskel? Ja, men vi kan kun se det, hvis vi bruger den returnerede værdi af `++/--`.

Lad os præcisere. Som vi ved, returnerer alle operatorer en værdi. Inkrement/dekrement er ingen undtagelse. Prefix form returnerer den nye værdi, mens postfix form returnerer den gamle værdi (før inkrement/dekrement).

For at se forskellen, her er et eksempel:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // 2
```

I linjen `(*)` øger *prefix* formen `++counter` `counter` og returnerer den nye værdi, `2`. Så `alert` viser `2`.

Nu bruger vi postfix form:

```js run
let counter = 1;
let a = counter++; // (*) ændret ++counter til counter++

alert(a); // 1
```

I linjen `(*)` øger *postfix* formen `counter++` også `counter`, men returnerer den *gamle* værdi (før inkrement). Så `alert` viser `1`.

For at opsummere:

- Hvis resultatet af inkrement/dekrement ikke bruges, er der ingen forskel på, hvilken form der bruges:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, linjerne ovenfor gjorde det samme
    ```
- Hvis vi gerne vil øge en værdi *og* straks bruge resultatet af operatoren, har vi brug for prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Hvis vi gerne vil inkrementere en værdi, men bruge dens tidligere værdi, har vi brug for postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Inkrement/dekrement blandt andre operatorer"
Operatorerne `++/--` kan også bruges inde i udtryk. Deres præcedens er højere end de fleste andre aritmetiske operationer.

For eksempel:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Sammenlign med:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, fordi counter++ returnerer den "gamle" værdi
```

Selvom det teknisk set er okay, gør sådan notation normalt koden mindre læsbar. Én linje gør flere ting -- ikke godt.

Når man læser kode, kan et hurtigt "vertikalt" øjescan nemt overse noget som `counter++`, og det vil ikke være indlysende, at variablen blev øget.

Vi anbefaler en stil med "én linje -- én handling":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitwise operatorer

Bitwise operatorer behandler argumenter som 32-bit heltal og arbejder på niveauet af deres binære repræsentation.

Disse operatorer er ikke JavaScript-specifikke. De understøttes i de fleste programmeringssprog.

Listen over operatorer:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- VENSTRE SKIFT ( `<<` )
- HØJRE SKIFT ( `>>` )
- ZERO-FILL HØJRE SKIFT ( `>>>` )

Disse operatorer bruges meget sjældent, når vi har brug for at pille ved tal på det laveste (bitwise) niveau. Vi får ikke brug for disse operatorer foreløbig, da webudvikling har meget lidt brug for dem, men i nogle specielle områder, såsom kryptografi, er de nyttige. Du kan læse kapitlet om [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) på MDN, når behovet opstår.

## Komma

Kommaoperatoren `,` er en af de sjældneste og mest usædvanlige operatorer. Nogle gange bruges den til at skrive kortere kode, så vi skal kende den for at forstå, hvad der foregår.

Kommaoperatoren tillader os at evaluere flere udtryk, adskilt af et komma `,`. Hvert af dem evalueres, men kun resultatet af det sidste returneres.

For eksempel:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (resultatet af 3 + 4)
```

Her evalueres det første udtryk `1 + 2`, og dets resultat kasseres. Derefter evalueres `3 + 4` og returneres som resultatet.

```smart header="Komma har meget lav præcedens"
Bemærk venligst, at kommaoperatoren har meget lav præcedens, lavere end `=`, så parenteser er vigtige i eksemplet ovenfor.

Uden paranteser: `a = 1 + 2, 3 + 4` evaluerer `+` først, summerer tallene til `a = 3, 7`, derefter tildeler operatoren `=` `a = 3`, og resten ignoreres. Det er som `(a = 1 + 2), 3 + 4`.
```

Hvorfor har vi brug for en operator, der kasserer alt undtagen det sidste udtryk?

Nogle gange bruger folk den i mere komplekse konstruktioner for at udføre flere handlinger på én linje.

For eksempel:

```js
// tre operationer på én linje
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Sådanne tricks bruges i mange JavaScript-frameworks. Derfor nævnes de her. Men normalt forbedrer de ikke kodelæsbarheden, så du bør tænke dig godt om, før du bruger dem.
