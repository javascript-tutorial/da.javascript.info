# Export og Import

Der findes flere variationer af direktivet import og eksport.

I den forrige artikel så vi en simpel brug. Lad os nu udforske lidt flere eksempler.

## Export før deklerationer

Vi kan navngive deklarationer som eksporteret ved at skrive `export` foran dem, hvad end det er en variabel, funktion eller klasse.

Alle disse eksporteringer er gyldige:

```js
// eksporter et array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// eksporter en constant
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// eksporter en class
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="Ingen semikolon efter export class/function"
Bemærk, at `export` før en class eller en function ikke gør den til en [function expression](info:function-expressions). Det er stadig en function deklarering, selvom den er eksporteret.

De fleste JavaScript style guides anbefaler ikke semikolon efter deklarationer af function og class.

Det er derfor, at der ikke er behov for en semicolon i slutningen af `export class` og `export function`:

```js
export function sayHi(user) {
  alert(`Hej, ${user}!`);
} *!* // Ingen ; i slutningen */!*
```

````

## Export andre steder end deklarationer

Vi kan også skrive `export` separat.

Her deklarerer vi først og eksporterer bagefter:

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hej, ${user}!`);
}

function sayBye(user) {
  alert(`Farvel, ${user}!`);
}

*!*
export {sayHi, sayBye}; // en liste af eksporterede variable
*/!*
```

... eller, teknisk set kan vi også placere `export` før funktionerne.

## Import *

Normal vil vi opstille en liste over, hvad vi vil importere, i krøllede parenteser `import {...}`, som dette:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hej, John!
sayBye('John'); // Farvel, John!
```

Men, hvis der er meget der skal importeres, kan vi importere alt som et objekt ved hjælp af `import * as <obj>`, for eksempel:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

Umiddelbart virker "importer alt" som en smart ting - kort at skrive. Hvorfor skulle vi nogensinde eksplicit liste hvad vi har brug for at importere?

Der er faktisk et par grunde.

1. Eksplicit oplistning af hvad du vil importere giver kortere navne: `sayHi()` i stedet for `say.sayHi()`.
2. Eksplicit oplistning af import giver et bedre overblik over kodestrukturen: hvad er brugt og hvor. Det gør det lettere at vedligeholde og refaktorere kode.

```smart header="Du skal ikke være bange for at importere for meget"
Moderne build tools, såsom[Vite](https://vitejs.dev/), [webpack](https://webpack.js.org/) og andre, samler moduler optimerer for at siden loader hurtigere. Her vil de også fjerne imports der ikke anvendes.

Hvis du for eksempel skriver `import * as library` fra et stort kodebibliotek og kun bruger et par af metoderne, vil de ubrugte metoder [ikke blive inkluderet](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) i det optimerede bundle.
```

## Import "as"

Vi kan også bruge `as` til at importere under forskellige navne.

For eksempel, lad os importere `sayHi` til den lokale variabel `hi` for at gøre det kortere, og importere `sayBye` som `bye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hej, John!
bye('John'); // Farvel, John!
```

## Export "as"

En lignende syntakst eksisterer for `export`.

Lad os eksportere funktionerne som  `hi` og `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Nu er `hi` og `bye` de officielle navne for kode udefra, når der skal importeres:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hej, John!
say.*!*bye*/!*('John'); // Farvel, John!
```

## Export default

I praksis er der grundlæggende to slags moduler.

1. Moduler der indeholder et bibliotek, en pakke af funktioner, som `say.js` ovenfor.
2. Moduler der deklarerer en enkelt entitet, f.eks. et modul `user.js` eksporterer kun `class User`.

For det meste er den anden tilgang foretrukket, så hver "ting" bor i sit eget modul.

Det kræver naturligvis en del filer, da alt gerne vil være sit eget modul, men det er ikke noget problem. Faktisk bliver navigation af kode nemmere, hvis filerne er godt navngivet og strukturet i mapper.

Moduler har en særlig syntaks `export default` ("standard eksportering") der får "en ting per modul" til at se bedre ud.

Skriv `export default` før den entitet du vil eksportere:

```js
// 📁 user.js
export *!*default*/!* class User { // tilføj et "default"
  constructor(name) {
    this.name = name;
  }
}
```

Der må der kun være en `export default` per fil.

... og nu kan du importere den uden krøllede parenteser:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // ikke {User}, bare User

new User('John');
```

Importering uden krøllede parenteser ser rensere ud. En almindelig fejl, når man begynder at bruge moduler, er at glemme krøllede parenteser. Så husk, `import` har brug for krøllede parenteser for navngivne eksporteringer og har ikke brug for dem for standard eksporteringen.

| Named export | Default export |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Teknisk set kan vi både have én default og flere navngivne eksporteringer i et enkelt modul, men i praksis bliver de sjældent blandet. Et modul har enten navngivne eksporteringer eller en standard eksportering.

Da der må højst være en standard eksport per fil, behøver den eksporterede entitet ikke at have et navn.

For eksempel, disse er alle perfekt gyldige standard eksporteringer:

```js
export default class { // intet navn til class
  constructor() { ... }
}
```

```js
export default function(user) { // intet navn til function
  alert(`Hej, ${user}!`);
}
```

```js
// eksport som en enkelt værdi uden at oprette en variabel
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Det er helt i orden at ikke give et navn, fordi der kun er en `export default` per fil. En `import` uden krøllede parenteser ved hvad der skal importeres.

Uden `default` vil sådan en eksportering give en fejl:

```js
export class { // Fejl! (ikke-standard export behøver et navn)
  constructor() {}
}
```

### "default" navnet

I nogle situationer bruges nøgleordet `default` til at referere til standardeksporten.

For eksempel, for at eksportere en funktion separat fra dens definition:

```js
function sayHi(user) {
  alert(`Hej, ${user}!`);
}

// dette er det samme som hvis vi tilføjede "export default" før funktionen
export {sayHi as default};
```

Eller, en anden situation. Lad os antage at et modul `user.js` eksporterer en hoved "default" ting, og et par navngivne (sjældent tilfældet, men det sker):

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hej, ${user}!`);
}
```

Så skal du skrive således for at importere standardeksporten sammen med en navngiven:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

Og, til slut, hvis du importerer alt `*` som et objekt, så er egenskaben `default` præcis det samme som default export:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // default export
new User('John');
```

### Lidt der taler imod default eksport

Navngivne eksporteringer er eksplicitte - de navngiver præcis hvad der importeres; det er en god ting.

Navngivne eksporteringer tvinger os til at bruge det præcise navn til at importere:

```js
import {User} from './user.js';
// import {MyUser} vil ikke virke, navnet skal være {User}
```

...men ved en default export, vælger vi altid selv navnet når vi importerer:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// det kan være import HvadSomHelst ... det vil stadig virke
```

Det gør at medlemmer i et team vil kunne bruge forskellige navne til at importere det samme, og det er ikke godt.

Normalt, og for at holde koden konsistent, er der en regel om at variabler, der importeres, skal svare til filnavne, f.eks:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

På trods af dette er der stadig udviklere der ser denne fleksibilitet som en stor ulempe for standard eksport, så de vil altid benytte navngivne eksporteringer - også når det kun er en enkelt ting, der eksporteres er den stadig eksporteret under et navn, uden `default`.

Dette gør også at geneksportering (se nedenfor) er lidt lettere.

## Geneksportering (re-export)

Syntaksen for geneksportering `export ... from ...` tillader at importere ting og umiddelbart eksportere dem (muligvis under et andet navn), som her:

```js
export {sayHi} from './say.js'; // geneksporter sayHi

export {default as User} from './user.js'; // geneksporter default
```

Hvorfor er det overhovedet en ting? Lad os se på et praktisk eksempel.

Forestil dig, at vi skriver en "package": en mappe med mange moduler, hvor noget af funktionaliteten eksporteres til brug andre steder. Værktøjer som NPM tillader os at publicere og distribuere sådanne pakker, men vi behøver ikke at bruge dem. Mange af modulerne er kun "hjælpere", til intern brug i andre pakke-moduler, så det er ikke alle der skal ses udefra.

En filstruktur kunne være som følger:
```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

Vi vil gerne eksponere pakkens funktionalitet via et enkelt indgangspunkt.

Med andre ord, en person der gerne vil bruge vores package, bør kun behøve at importere fra "hovedfilen" `auth/index.js`.

Sådan her:

```js
import {login, logout} from 'auth/index.js'
```

"Hovedfilen", `auth/index.js` eksporterer al den funktionalitet, vi gerne vil tilbyde i vores package.

Ideen er, at udenforstående (andre programmører) der bruger vores package, ikke bør blande sig med dens interne struktur og søge efter filer inde i vores undermapper. Vi eksporterer kun det, der er nødvendigt i `auth/index.js` og holder resten skjult.

Da den faktiske eksporterede funktionalitet er spredt rundt i undermapper i pakken, kan vi importere til `auth/index.js` og eksportere videre derfra:
```js
// 📁 auth/index.js

// importer login/logout og eksporter dem med det samme
import {login, logout} from './helpers.js';
export {login, logout};

// importer default som User og eksporter den
import User from './user.js';
export {User};
...
```

Nu vil brugere af vores package kunne skrive `import {login} from "auth/index.js"`.

Syntaksen `export ... from ...` er simpelthen en kortere måde at skrive sådanne import-export:

```js
// 📁 auth/index.js
// geneksporter login/logout
export {login, logout} from './helpers.js';

// geneksporter default export som User
export {default as User} from './user.js';
...
```

En vigtig forskel mellem`export ... from` og `import/export` er at de geneksporterede moduler ikke er tilgængelige i den aktuelle fil. Så i eksemplet ovenfor kan vi ikke inde i `auth/index.js` bruge de geneksporterede funktioner `login/logout`.

### Geneksportering af default export

Standardeksporteringen "default export" kræver lidt speciel behandling ved geneksportering.

Lad os sige, at vi har `user.js` med `export default class User` og gerne vil geneksportere den i `auth/index.js`:

```js
// 📁 user.js
export default class User {
  // ...
}
```

Vi kan støde på to problemer her:

1. `export User from './user.js'` vil ikke virke. Dette vil give en syntaksfejl.

    For at geneksportere default export, skal vi skrive `export {default as User}`, som i eksemplet ovenfor.

2. `export * from './user.js'` geneksporterer kun navngivne eksporteringer, men ignorerer default eksporteringen.

    Hvis vi vil geneksportere både navngivne og default eksporteringer, så er to udsagn nødvendige:
    ```js
    export * from './user.js'; // for at geneksportere navngivne eksporteringer
    export {default} from './user.js'; // for at geneksportere default eksporteringen
    ```

Dette er endnu mere brænde til bålet for de udviklere der ikke kan lide default eksporteringer og derfor sværger til navngivne eksporteringer.

## Opsummering

Her er alle typer af `export` der er omtalt i denne og forrige artikel.

Du kan teste dig selv ved at læse dem og prøve om du kan huske hvad de betyder:

- Før deklarationen af en klasse/funktion/..:
  - `export [default] class/function/variable ...`
- Selvstændig eksportering (Standalone export):
  - `export {x [as y], ...}`.
- Geneksportering (Re-export):
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (geneksporterer ikke default).
  - `export {default [as y]} from "module"` (geneksporterer default).

Import:

- Importer navngivne eksporteringer:
  - `import {x [as y], ...} from "module"`
- Importer default eksporteringen:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Importer alle:
  - `import * as obj from "module"`
- Importer modulet (det kode afvikles), men tildel ikke nogle af dets eksporteringer til lokale variabler:
  - `import "module"`

Vi kan placere `import/export` udtryk i starten eller slutningen af en script, det gør ikke noget.

Så denne kode er teksnisk set fin nok:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import i slutningen af filen
```

I praksis er import normalt i begyndelsen af filen, men det er kun for læsbarheden og overblikkets skyld.

**Bemærk at import/export udtryk ikke virker hvis de er inde i `{...}`.**

En betinget import, som denne, vil ikke virke:
```js
if (something) {
  import {sayHi} from "./say.js"; // Fejl: import skal være top-level
}
```

... men hvad så, hvis vi gerne vil importere noget baseret på en betingelse? Eller på det rigtige tidspunkt? Som i: loade et modul op opfordring, når der er brug for det?

Det kan vi med dynamiske imports. Dem ser vi på i den næste artikel.
