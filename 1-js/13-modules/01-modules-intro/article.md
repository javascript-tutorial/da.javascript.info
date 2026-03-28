
# Moduler, introduktion

Efterhånden som vores applikation vokser sig større, stiger behovet for at splitte den op i flere filer, såkaldte "moduler". Et modul kan indeholde en klasse eller et bibliotek af funktioner til et specifikt formål.

I mange år levede JavaScript uden nogen syntaks for moduler på sprogniveau. Det var ikke det helt store problem, da scripts ofte var små og simple - så der var ikke det store behov for det.

Men i takt med at scripts blev mere og mere komplekse, opfandt fællesskabet en række måder at organisere kode i moduler, samt specielle biblioteker til at indlæse moduler efter behov.

For at nævne nogle (af historiske grunde, da de ikke længere er så relevante):

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- en af de helt gamle modulsystemer, oprindeligt implementeret af biblioteket [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- et modulsystem skal til Node.js server.
- [UMD](https://github.com/umdjs/umd) -- endnu et modulsystem, foreslået som et universelt system og kompatibelt med AMD og CommonJS.

Nu bliver alle disse langsomt en del af historien, men vi kan stadig finde dem i gamle scripts.

Moduler på sprogniveau så dagens lys i standarden i 2015. Den har gradvist udviklet sig siden og er nu understøttet i alle større browsere og i Node.js - så vil vil studere disse moderne moduler implementeret i JavaScript og lade de andre systemer i fred.

## Hvad er et modul?

Et modul er bare en fil. Et script er ét modul. Det er så simpelt som det kan være.

Moduler kan hente hinanden og bruge specielle direktiver `export` og `import` til at bytte funktionalitet, kalde funktioner fra et modul i et andet:

- `export` nøgleordet mærker variabler og funktioner, der skal være tilgængelige fra uden for det nuværende modul.
- `import` tillader import af funktionalitet fra andre moduler.

For eksempel, hvis vi har en fil `sayHi.js` der eksporterer en funktion:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hej, ${user}!`);
}
```

...Så kan en anden fil importere og bruge den:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hej, John!
```

Direktivet `import` henter modulet med stien `./sayHi.js` relativt til den nuværende fil. Den tildeler den eksporterede funktion `sayHi` til den tilsvarende variabel skrevet i de krøllede parenteser.

Lad os køre eksemplet i browseren.

Da moduler understøtter specielle nøgleord og funktioner, skal vi fortælle browseren, at et script skal behandles som et modul, ved at bruge attributten `<script type="module">`.

Som her:

[codetabs src="say" height="140" current="index.html"]

Browseren henter og evaluerer automatisk det importerede modul (og dets importerede moduler hvis nødvendigt), for derefter at køre scriptet.

```warn header="Moduler virker kun via HTTP(s), ikke lokalt"
Hvis du forsøger at åbne en web-side som en fil lokalt (via `file://` protocol), vil du opleve at `import/export` direktiverne ikke virker. Brug en lokal web-server, såsom [static-server](https://www.npmjs.com/package/static-server#getting-started) eller brug "live server" muligheden i din editor, såsom VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) til at teste moduler.
```

## Fundamentale modul funktionaliteter

Hvad er forskellen mellem moduler og "normale" scripts?

Der er en række grundlæggende træk, som er gyldige både for browser og server-side JavaScript.

### Altid "use strict"

Moduler arbejder altid i strict mode. Hvis du f.eks. forsøger at tildele en variabel uden at deklarere den først, vil det give en fejl.

```html run
<script type="module">
  a = 5; // fejl, a er ikke deklareret
</script>
```

### Scope på modul-niveau

Hvert modul har sit eget top-level scope. Med andre ord, top-level variable og funktioner fra et modul er ikke synlige i andre scripts.

I eksemplet nedenfor importeres to scripts, og `hello.js` forsøger at bruge `user` variablen deklareret i `user.js`. Det mislykkes, fordi det er et separat modul (du vil se fejlen i konsollen):

[codetabs src="scopes" height="140" current="index.html"]

Moduler skal bruge `export` til at fortælle, hvad der skal være tilgængeligt udenfor modulet og selv bruge `import` til det der er brug for udefra.

- `user.js` bør eksportere variablen `user`.
- `hello.js` bør importere den fra `user.js` modulet.

Med andre ord: Med moduler bruger vi import/export i stedet for at stole på globale variabler.

Her er den korrekte udgave af koden før:

[codetabs src="scopes-working" height="140" current="hello.js"]

I browseren, hvis vi taler om HTML sider, eksisterer der også et uafhængigt top-level scope for hvert `<script type="module">`.

Her ser du to scripts på den samme side, begge med `type="module"`. De ser ikke hinandens top-level variable, fordi de er separate moduler:

```html run
<script type="module">
  // Variablen er kun synlig i dette module script
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

```smart
I browseren, kan vi lave en variabel window-level global ved at eksplicit tildele den til en `window` egenskab, f.eks. `window.user = "John"`. 

Derefter vil alle scripts se den, både med `type="module"` og uden for det. 

Det skal dog understreges, at den måde at oprette globale variable på "giver panderynker" hos andre udviklere. Så prøv at undgå det med mindre at det er nødvendigt.
```

### Koden i et modul evalueres kun den første gang det importeres

Hvis det samme modulet importeres af flere andre moduler, evalueres dens kode kun én gang, når det importeres første gang. Derefter gives dens eksporteringer til alle yderligere importører.

Den ene evaluering har vigtige konsekvenser, som vi bør være opmærksomme på.

Lad os se et par eksempler.

Først, hvis det at eksekvere koden i et modul medfører sideeffekter, f.eks. visning af en besked, så vil import af det samme modul flere gange kun udløse sideeffekten én gang -- første gang:

```js
// 📁 alert.js
alert("Modulet er evalueret!");
```

```js
// Importer det samme modul fra forskellige filer

// 📁 1.js
import `./alert.js`; // Modulet er evalueret!

// 📁 2.js
import `./alert.js`; // (viser intet)
```

Den anden gang modulet importeres, vises intet, fordi modulet allerede er blevet evalueret.

Der er en regel: top-level modul-kode skal bruges til initialisering, oprettelse af modulspecifikke insterne datastrukture. Hvis vi har behov for at gøre noget kaldbart flere gange - bør vi eksportere det som en funktion, som vi gjorde med `sayHi` ovenfor.

Lad os nu se et mere komplekst eksempel.

Lad os sige, at et modul eksporterer et objekt:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Hvis dette modul importeres fra flere filer, evalueres modulet kun første gang, `admin` objektet oprettes, og derefter sendes det til alle yderligere importører.

Alle importører får præcis det samme `admin` objekt:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Både 1.js og 2.js refererer til samme admin objekt
// Ændringer lavet i 1.js er synlige i 2.js
*/!*
```

Som du kan se, når `1.js` ændrer `name` egenskaben i det importerede `admin`, så kan `2.js` se den nye `admin.name`.

Det er netop fordi modulet kun bliver eksekveret én gang. Eksporteringer genereres, og derefter deles de mellem importørerne, så hvis noget ændrer `admin` objektet, vil andre importører se det.

**Sådan adfærd er faktisk meget praktisk, fordi den tillader os at *konfigurere* moduler.**

Med andre ord kan moduler levere generisk funktionalitet, der har brug for opsætning - f.eks. noget der kræver autentifikation. Så kan det eksportere et konfigurationsobjekt, som det forventes, at den ydre kode tildele det.

Her er det klassiske mønster for at konfigurere moduler:
1. Et modul eksporterer nogle metoder til konfiguration, f.eks. et konfigurationsobjekt.
2. Ved første import initialiserer vi det og skriver til dets egenskaber. Det kan et top-level applikationsscript f.eks. gøre.
3. Yderligere importeringer bruger modulet.

For eksempel kan `admin.js` modulet levere bestemte funktionaliteter (f.eks. autentifikation), men forvente, at legitimationsoplysningerne kommer ind i `config` objektet udefra:

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Jeg er klar, ${config.user}!`);
}
```

Her eksporterer, `admin.js` selve objektet `config` (Her er det helt tomt, men det kan også indeholde standard egenskaber).

Så i `init.js`, det første script i vores app, importerer vi `config` og sætter `config.user`:

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...Nu er modulet `admin.js` konfigureret. 

Yderligere importører kan kalde det, og det viser korrekt den nuværende bruger:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Jeg er klar, *!*Pete*/!*!
```


### import.meta

Objektet `import.meta` indeholder informationen om det nuværende modul.

Dets indhold afhænger af miljøet. I browseren indeholder det URL'en for scriptet, eller en nuværende webpage URL hvis det er inde i HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL
  // for et inline script er URL den aktuelle HTML-sides URL
</script>
```

### I et modul har "this" værdien undefined

Det er måske en mindre ting, men for komplethedens skyld bør vi nævne det.

I et modul er `this` undefined.

Sammenlign det med scripts der ikke er sat som moduler, hvor `this` er det globale objekt:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Browserspecifikke features

Der er også flere browser-specifikke forskelle på scripts med `type="module"` i forhold til regulære scripts.

Du kan vælge at springe denne sektion over for nu, hvis du læser om JavaScript for første gang, eller hvis du ikke bruger JavaScript i en browser.

### Scripts der er moduler er deferred

Når du sætter et script som et modul, er det *altid* deferred. Så har det samme effekt som `defer` attributten (beskrevet i kapitlet [](info:script-async-defer)), for både eksterne og inline scripts.

Med andre ord:
- Hentning af externe modul-scripts `<script type="module" src="...">` blokerer ikke processering af HTML. De bliver hentet ind parallelt med andre ressourcer.
- modul-scripts venter indtil HTML-dokumentet er fuldt indlæst (selv hvis de er små og loader hurtigere end HTML).- Først når al HTML er hentet kører de.
- Den relative orden af scripts er bevaret: Scripts der er først i dokumentet, eksekvereres først.

Som en praktisk sideeffekt af dette vil modul-scripts altid "se" den fuldt indlæste HTML-side - også HTML-elementer der kommer efter dem.

For eksempel:

```html run
<script type="module">
*!*
  alert(typeof button); // object: scriptet kan 'se' knappen under den
*/!*
  // da moduler er deferred, kører scriptet efter at hele siden er indlæst
</script>

Sammelignet med et regulært script nedenfor:

<script>
*!*
  alert(typeof button); // button er undefined - scriptet kan ikke se elementer nedenfor
*/!*
  // regulære scripts kører med det samme, før resten af siden er processeret.
</script>

<button id="button">Button</button>
```

Bemærk: Det andet script afvikles faktisk før det første! Så vi ser`undefined` først, efterfulgt af `object`.

Det er fordi moduler er deferred, så vi venter på, at dokumentet bliver processeret. Det regulære script kører med det samme, så vi ser dens output først.

Når man bruger moduler, bør man være opmærksom på, at HTML-siden vises, mens den indlæses, og JavaScript-moduler først kører efter, så brugeren måske ser siden før JavaScript-applikationen er klar. Noget funktionalitet virker muligvis endnu ikke. Vi bør tilføje "loading indicators", eller på anden måde sikre, at besøgende ikke bliver forvirret af det.

### Async virker på inline scripts

For scripts der ikke er moduler, virker `async` attributten kun på eksterne scripts. Async scripts kører med det samme, når de er klare, uafhængigt af andre scripts eller HTML-dokumentet.

For modul-scripts, virker det også på inline scripts.

For eksempel har inline scriptet nedenfor `async`, så det venter ikke på noget.

Det udfører importen (henter `./analytics.js`) og kører når det er klart, selv hvis HTML-dokumentet ikke er færdigt endnu, eller hvis andre scripts stadig afventer.

Det er godt for funktionalitet, der ikke afhænger af noget, som tællere, reklamer, og dokumentniveau event listeners.

```html
<!-- alle afhængigheder er hentet (analytics.js), og scriptet kører -->
<!-- venter ikke på dokumentet eller andre <script> tags -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Eksterne scripts

Eksterne scripts der har `type="module"` er forskellige i to aspekter:

1. Eksterne scripts med samme `src` kører kun én gang:
    ```html
    <!-- script my.js hentes og eksekveres kun én gang -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Eksterne scripts der er hentet fra en anden såkaldt *origin* (f.eks. en anden hjemmeside) kræver [CORS](mdn:Web/HTTP/CORS) headers, som beskrevet i kapitlet <info:fetch-crossorigin>. Med andre ord, hvis et modul-script er hentet fra en anden origin, skal den eksterne server tilbyde en header `Access-Control-Allow-Origin` som tillader fetch.
    ```html
    <!-- another-site.com skal tilbyde Access-Control-Allow-Origin -->
    <!-- ellers vil scriptet ikke virke -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Dette sikrer bedre sikkerhed som standard.

### Ingen "bare" modules er tilladt

I browseren skal `import` modtage en relative eller absolut URL. Moduler uden nogen sti kaldes "bare" modules. Sådanne moduler er ikke tilladt i `import`.

Denne `import` er derfor ugyldig:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// modulet skal have en sti, f.eks. './sayHi.js' der peger på hvor modulet er
```

Nogle miljøer, som f.eks. Node.js eller bundle tools, tillader "bare" modules, uden nogen sti, da de har deres egne måder at finde moduler og hooks til at justere dem. Men browsere understøtter ikke "bare" modules endnu.

### Kompatibilitet, "nomodule"

Gamel browsere forstår ikke `type="module"`. Scripts der har en ukendt type ignoreres. For dem er det muligt at give en fallback ved hjælp af `nomodule` attributten, som fortæller browseren at det script kun skal køres hvis den ikke forstår `type="module"`.:

```html run
<script type="module">
  alert("Kører i moderne browsere der forstår moduler");
</script>

<script nomodule>
  alert("Moderne browsere kender både type=module og nomodule, så denne springes over")
  alert("Gamle browsere ignorerer script med ukendt type=module, men eksekverer denne.");
</script>
```

## Build tools

I virkelige projekter bliver moduler bundlet sammen med et specielt værktøj såsom [Vite](https://vite.dev/) og distribueret til produktionsserveren.

Der er flere fordele ved at bruge bundlere. De giver mere kontrol over hvordan moduler løses, hvilket tillader "bare" moduler og meget mere, som f.eks. CSS/HTML moduler.

Build tools gør følgende:

1. Tager et "main" module, det modul som er beregnet til at blive placeret i `<script type="module">` i HTML.
2. Analyserer dets afhængigheder: imports og derefter imports af imports osv.
3. Bygger en enkelt fil med alle moduler (eller flere filer, hvis det er valgt), erstatter native `import` kald med bundler funktioner, så det virker. "Special" typer af moduler som HTML/CSS moduler er også understøttet.
4. I processen, kan andre transformationer og optimieringer anvendes:
    - Ikke-tilgængelig kode fjernes.
    - Ubrugte eksporteringer fjernes ("tree-shaking").
    - Udvikingsspecifikke udtryk som `console` og `debugger` fjernes.
    - Helt ny JavaScript syntaks kan transformeres til en ældre version med lignende funktionalitet ved hjælp af [Babel](https://babeljs.io/) eller andre værktøjer.
    - Den endelige fil bliver formindsket eller *minified* (mellemrum fjernes, variabelnavne erstattes med korte navne, etc).

Hvis vi bruger bundlere, såsom [Vite](https://vite.dev/), så bliver moduler bundlet sammen til en enkelt fil (eller flere filer), og `import/export`-sætninger indeni disse scripts erstattes af specielle bundler-funktioner. Så det resulterende "bundled" script indeholder ikke nogle `import/export`, det kræver ikke `type="module"`, og vi kan putte det ind i et almindeligt script:

```html
<!-- Forudsat at vi fik bundle.js fra et værktøj som Vite -->
<script src="bundle.js"></script>
```

Med det sagt er native modules også brugbare. Vi vil ikke bruge Vite her: du kan konfigurere det senere.

## Opsummering

For at opsummere, er de vigtigste ting at huske om moduler:

1. Et modul er en fil. For at `import/export` skal virke, har browsere brug for `<script type="module">`. Moduler har flere forskelle i forhold til almindelige scripts:
    - Deferred som standard.
    - Async virker på inline scripts.
    - At hente eksterne scripts fra en anden origin (domain/protocol/port), kræver såkaldte CORS headers.
    - Duplikerede eksterne scripts ignoreres.
2. Moduler har deres egen lokale scope og udveksler funktionalitet via `import/export`.
3. Moduler bruger altid `use strict`.
4. Moduler kode eksekveres kun én gang. Exports skabes en gang og deles mellem imports.

Når vi bruger moduler vil hvert modul implementere sin egen funktionalitet og eksportere den. Derefter bruger vi `import` til at importere det hvor det er nødvendigt. Browseren loader og evaluerer scriptene automatisk.

I produktion bruger folk ofte bundlere såsom [Vite](https://vite.dev/) til at bandle moduler sammen for ydeevne og andre grunde.

 næste kapitel vil vi se flere eksempler på moduler, og hvordan ting kan eksporteres/importeres.
