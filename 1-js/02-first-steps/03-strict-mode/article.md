# Den 'moderne' metode, "use strict"

I lang tid udviklede JavaScript sig uden problemer med kompatibilitet. Nye muligheder blev tilføjet til sproget, men den gamle funktionalitet blev ikke ændret.

Det havde den fordel at gammel kode aldrig fejlede. Man det havde den ulempe at uperfekte beslutninger lavet af skaberne af JavaScript blevet fanget i sproget for evigt.

Sådan var det indtil 2009, hvor ECMAScript 5 (ES5) kom frem. Det tilføjede en række nye muligheder til sproget og ændrede nogle af de eksisterende. FOr at holde den gamle kode kørende var de fleste ændringer slået fra som standard. Du skulle aktivt slå dem til med et specielt direktiv kaldet `"use strict"`.

## "use strict"

Direktivet ligner en simpel tekststreng: `"use strict"` eller `'use strict'`. Når den står skrevet øverst i dit script vil hele scriptet virke på "den nye måde".

For eksempel

```js
"use strict";

// Denne kode bruger de nye funktioner i JavaScript
...
```

Du vil snart lære om funktioner, som er en måde at gruppere kommandoer.

I denne sammenhæng skal det dog nævnes at `"use strict"` kan skrives i starten af en funktion (de fleste funktioner, i hvert fald) i stedet for øverst i scriptet. Hvis du gør det, vil strict mode kun være aktiv inde i funktionen. Men, det mest normale er at sætte det for hele ens script.


````warn header="Sørg for at \"use strict\" er placeret i toppen"
Du skal sikre dig at `"use strict"` er allerøverst i dit dokument, ellers vil de dele af din kode der er over ikke forholde sig til det.

strict mode er ikke aktiv her:

```js no-strict
alert("noget kode");
// "use strict" under bliver ignoreret. Det skal stå øverst.

"use strict";

// strict mode bliver ikke aktiveret
```

Kun kommentarer må stå over `"use strict"`.
````

```warn header="Der er ingen måde at fortryde `use strict`"
Der findes ikke et direktiv i stil med`"no use strict"`, der vil vende tilbage til den gamle måde.

Så snart du har aktiveret strict mode, er der ingen vej tilbage.
```

## Brug altid "use strict"

Forskellene mellem `"use strict"` og "standard" tilstand manger vi stadig at gennemgå.

I de næste kapitler, efterhånden som vi lærer flere af sprogets muligheder, vil du blive bekendt med forskelle i strict mode. Heldigvis er der ikke så mange og de gør faktisk livet som udvikler bedre.

For nu er det nok, at du kender til det mere generelle:

1. `"use strict"` er et direktiv der skrifter JavaScrip-motoren til "modern" tilstand og ændrer måden den går til indbyggede muligheder. Det vil vil lære mere om, efterhånden som vi støder på dem.
2. strict mode aktiveres ved at skrive `"use strict"` i toppen. Der er flere muligeheder i sproget (som klasser og moduler) der aktiverer stricvt mode automatisk.
3. strict mode understøttes af alle moderne browsere.
4. Det anbefales altid at starte et script med `"use strict"`. Alle eksempler i denne tutorial regner med at det er gjort. I sjældne tilfælde vil du blive bedt om andet.
