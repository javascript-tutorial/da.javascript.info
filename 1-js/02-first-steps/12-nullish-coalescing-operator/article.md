# Nullish coalescing operator '??'

[recent browser="new"]

Nullish coalescing operator skrives som to spørgsmålstegn `??`.

Da det behandler `null` og `undefined` på ens, bruger vi et særligt udtryk her i denne artikel. For korthedens skyld siger vi, at en værdi er "defineret", når den hverken er `null` eller `undefined`.

Resultatet af `a ?? b` er:
- hvis `a` er defineret, så er resultatet `a`,
- hvis `a` ikke er defineret, så er resultatet `b`.

Med andre ord, `??` returnerer det første argument, hvis det ikke er `null/undefined`. Ellers returneres det andet argument.

Nullish coalescing operator er ikke noget helt nyt. Det er bare en pæn syntaks for at få den første "definerede" værdi af de to.

Vi kan omskrive `result = a ?? b` ved hjælp af de operatorer, vi allerede kender, som dette:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Her bør det nu være helt klart, hvad `??` gør. Lad os se, hvor det hjælper.

Den almindelige brug af `??` er at give en standardværdi.

For eksempel viser vi her `user`, hvis dens værdi ikke er `null/undefined`, ellers `Anonymous`:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user is undefined)
```

Her er eksemplet med `user` tildelt et navn:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user is not null/undefined)
```

Vi kan også bruge en sekvens af `??` til at vælge den første værdi fra en liste, der ikke er `null/undefined`.

Lad os sige, at vi har en brugers data i variablerne `firstName`, `lastName` eller `nickName`. Alle kan være ikke definerede, hvis brugeren besluttede ikke at udfylde de tilsvarende værdier.

Vi vil gerne vise brugernavnet ved hjælp af en af disse variabler, eller vise "Anonymous", hvis alle er `null/undefined`.

Lad os bruge `??` operatoren til det:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparison with ||

OR `||` operatoren kan bruges på samme måde som `??`, som det blev beskrevet i [forrige kapitel](info:logical-operators#or-finds-the-first-truthy-value).

For eksempel kunne vi i koden ovenfor erstatte `??` med `||` og stadig få det samme resultat:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Historisk set var OR `||` operatoren der først. Den har været der siden begyndelsen af JavaScript, så udviklere har brugt den til sådanne formål i lang tid.

På den anden side blev nullish coalescing operator `??` tilføjet til JavaScript først for nylig, og grunden til det var, at folk ikke var helt tilfredse med `||`.

Den vigtige forskel mellem dem er, at:
- `||` returnerer den første *truthy* værdi.
- `??` returnerer den første *definerede* værdi.

Med andre ord skelner `||` ikke mellem `false`, `0`, en tom streng `""` og `null/undefined`. De er alle det samme -- falsy værdier. Hvis nogen af disse er det første argument til `||`, så får vi det andet argument som resultat.
I praksis vil vi dog måske kun bruge standardværdien, når variablen er `null/undefined`. Det vil sige, når værdien virkelig er ukendt/ikke sat.

For eksempel, overvej dette:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` tjekker `height` for at være en falsy værdi, og det er `0`, falsy faktisk.
    - så resultatet af `||` er det andet argument, `100`.
- `height ?? 100` tjekker `height` for at være `null/undefined`, og det er det ikke,
    - så resultatet er `height` "som det er", altså `0`.

I praksis er nul højde ofte en gyldig værdi, som ikke bør erstattes med standardværdien. Så `??` gør lige det rigtige.

## Præcedens

Præcedens for `??` operatoren er den samme som `||`. De har begge værdien `3` i [MDN tabellen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

Det betyder, at ligesom `||`, bliver nullish coalescing operatoren `??` evalueret før `=` og `?`, men efter de fleste andre operationer, såsom `+`, `*`.

Så vi kan have brug for at tilføje parenteser i udtryk som dette:

```js run
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Ellers, hvis vi udelader parenteser, så da `*` har højere præcedens end `??`, vil det blive udført først, hvilket fører til forkerte resultater.

```js
// uden parenteser
let area = height ?? 100 * width ?? 50;

// ...works this way (not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Brug af ?? med && eller ||

Af sikkerhedsmæssige årsager forbyder JavaScript at bruge `??` sammen med `&&` og `||` operatorer, medmindre præcedensen eksplicit er angivet med parenteser.

Koden nedenfor udløser en syntaksfejl:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

Begrændsningen er helt sikkert til diskussion. Den blev tilføjet til sprogspecifikationen med det formål at undgå programmeringsfejl, når folk begynder at skifte fra `||` til `??`.

Brug eksplicitte parenteser for at omgå det:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

alert(x); // 2
```

## Opsummering

- Nullish coalescing operator `??` giver en kort måde at vælge den første "definerede" værdi fra en liste.

    Den bruges til at tildele standardværdier til variabler:

    ```js
    // sæt height=100, hvis height er null eller undefined
    height = height ?? 100;
    ```

- Operatoren `??` har en meget lav præcedens, kun lidt højere end `?` og `=`, så overvej at tilføje parenteser, når du bruger den i et udtryk.
- Det er forbudt at bruge den sammen med `||` eller `&&` uden eksplicitte parenteser.
