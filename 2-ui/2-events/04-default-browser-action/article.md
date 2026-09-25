# Browserens standard handlinger

Mange events følger automatisk med bestemte handlinger, som udføres af browseren.

For eksempel:

- Et klik på et link - starter navigation til dens URL.
- Et klik på en form submit-knap - starter indsendelsen af formen til serveren.
- Tryk på en museknap over en tekst og flytter den efterfølgende - vælger teksten.

Hvis vi håndterer et event i JavaScript, vil vi måske ikke ønske den tilsvarende browserhandling skal ske. Det kan være, at vi ønsker at implementere en anden adfærd i stedet.

## Forhindring af browserhandling

Der er to måder at sige til browseren, at vi ikke vil have den til at handle:

- Standardmetoden er at bruge `event`-objektet. I den er der metode `event.preventDefault()`.
- Hvis handleren er tildelt ved hjælp af `on<event>` (ikke ved hjælp af `addEventListener`), så virker det samme, hvis man returnerer `false`.

I dette HTML vil et klik på et link ikke føre til navigation; browseren gør ikke noget:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Klik her</a>
eller
<a href="/" onclick="event.preventDefault()">her</a>
```

I det næste eksempel vil vi bruge denne teknik til at skabe et menu baseret på JavaScript.

```warn header="Returnering af `false` fra en handler er en undtagelse"
Værdien der returneres fra en event handler ignoreres normalt.

Den eneste undtagelse er `return false` fra en handler tildelt ved hjælp af `on<event>`.

I alle andre tilfælde bliver `return`-værdien ignoreret. Der er i hvert fald ingen mening i at returnere `true`.
```

### Eksempel: en menu

Forestil dig en menu på et websted, som denne:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Her er hvordan det ser ud med noget CSS:

[iframe height=70 src="menu" link edit]

Menupunkter implementeres som HTML-links `<a>`, ikke knapper `<button>`. Der er flere grunde til at gøre det på denne måde, for eksempel:

- Mange brugere foretrækker at bruge "højreklik" -- "åbn i et nyt vindue". Hvis vi bruger `<button>` eller `<span>`, virker det ikke.
- Søgemaskiner følger `<a href="...">` links mens de indexerer.

Så vi bruger `<a>` i markup'en. Men normalt vil vi håndtere klik i JavaScript. Så vi bør forhindre den standard browserhandling.

Sådan her:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...kan være at der hentes fra en server, generering af UI osv.

*!*
  return false; // forhindrer browserhandling (gå ikke til URL'en)
*/!*
};
```

Hvis vi udelader `return false`, vil browseren efter vores kode eksekveres køre sin "standardhandling" -- navigere til URL'en i `href`. Det har vi ikke brug for her, da vi håndterer klikket selv.

Forresten vil event delegation gøre vores menu meget fleksibel. Vi kan tilføje indre lister og style dem så de "glider ned" ved hjælp af CSS.

````smart header="Follow-up events"
Bestemte events flyder fra den ene til den anden. Hvis vi forhindrer det første event, vil der ikke være noget andet.

For eksempel fører `mousedown` på et `<input>`-felt til fokus i det, og eventet `focus`. Hvis vi forhindrer eventet `mousedown`, er der ingen fokus.

Prøv at klikke på det første `<input>` nedenfor -- eventet `focus` sker. Men hvis du klikker på det andet, er der ingen fokus.

```html run autorun
<input value="Fokus virker" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Klik mig">
```

Det er fordi den browserhandling, der sker ved `mousedown`, bliver annulleret. Fokusering er stadig muligt, hvis vi bruger en anden måde at komme ind i inputfeltet på. For eksempel tasterne `key:Tab` for at skifte fra det 1. input til det 2. input. Men museklik virker ikke mere.
````

## Den "passive" handler mulighed

Den frivillige indstilling `passive: true` i `addEventListener` signalerer til browseren, at handleren ikke vil kalde `preventDefault()`.

Hvorfor vil det være nødvendigt?

Der findes events som `touchmove` på mobile enheder (når brugeren flytter sin finger over skærmen), som forårsager rulning (scrolling) som standard, men hvor denne rulning kan forhindres ved hjælp af `preventDefault()` i handleren.

Så når browseren registrerer et sådant event, skal den først behandle alle handlers, og derefter, hvis `preventDefault` ikke kaldes nogen steder, kan den fortsætte med rulningen. Det kan forårsage unødige forsinkelser og "hakker" i brugerfladen.

Indstillingen `passive: true` fortæller browseren, at handleren ikke vil annullere rulningen. Derefter ruller browseren umiddelbart, hvilket giver bedst mulighed for en flydende oplevelse, og eventet håndteres på den måde.

For noglebrowsere (Firefox, Chrome), er `passive` sat til `true` som standardværdi for `touchstart` og `touchmove` events.


## event.defaultPrevented

Egenskaben `event.defaultPrevented` er `true`, hvis standardhandlingen blev forhindret, og `false` ellers.

Der er et interessant case for det.

Du husker måske kapitlet <info:bubbling-and-capturing> hvor vi talte om `event.stopPropagation()` og hvorfor det er dårligt at stoppe bubbling?

Nogle gange kan vi bruge `event.defaultPrevented` i stedet for at signalere andre event handlers, at eventet er blevet håndteret.

Lad os se et praktisk eksempel.

Som udgangspunkt viser browseren ved et `contextmenu`-event (højre museklik) en kontekstmenu med standardindstillinger. Vi kan forhindre dette og vise vores egen menu, på følgende måde:

```html autorun height=50 no-beautify run
<button>Højreklik viser browserens kontekstmenu</button>

<button *!*oncontextmenu="alert('Tegn vores kontekstmenu'); return false"*/!*>
  Højreklik viser vores kontekstmenu
</button>
```

Nu, udover den kontekstmenu, vi har, vil vi gerne implementere en kontekstmenu på dokumentniveau.

Ved højre museklik skal den nærmeste kontekstmenu vises.

```html autorun height=80 no-beautify run
<p>Højreklik her for dokumentets kontekstmenu</p>
<button id="elem">Højreklik her for knappens kontekstmenu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Knappens kontekstmenu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Dokumentets kontekstmenu");
  };
</script>
```

Problemet er, at når vi klikker på `elem`, får vi to menuer: den ene på knapniveau og (eventet bobler op) den anden på dokumentniveau.

Hvordan fikser vi det? En løsning kunne være at tænke: "Når vi håndterer højre museklik i knap-håndteringen, så stopper vi dens bobling" og bruger `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Højreklik for dokumentets kontekstmenu</p>
<button id="elem">Højreklik for knappens kontekstmenu (rettet med event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Knappens kontekstmenu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Dokumentets kontekstmenu");
  };
</script>
```

Nu virker knappens kontekstmenu som forventet. Men prisen er høj. Vi forhindrer for altid adgang til information om højre museklik for enhver ydre kode, herunder tællere, der indsamler statistik og så videre. Det er ikke helt klogt.

En alternativ løsning ville være at tjekke i `document`-håndteringen, om standardhandlingen blev forhindret? Hvis det er tilfældet, så blev eventet håndteret, og vi behøver ikke reagere på det.


```html autorun height=80 no-beautify run
<p>Højreklik for dokumentets kontekstmenu (tilføjet en kontrol af event.defaultPrevented)</p>
<button id="elem">Højreklik for knappens kontekstmenu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Knappens kontekstmenu");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Dokumentets kontekstmenu");
  };
</script>
```

Nu virker alt som forventet. Hvis vi har indlejrede elementer, og hvert enkelt har sin egen kontekstmenu, vil det også virke. Sørg blot for at tjekke for `event.defaultPrevented` i hver `contextmenu`-håndtering.

```smart header="event.stopPropagation() og event.preventDefault()"
Det er tydeligt, at `event.stopPropagation()` og `event.preventDefault()` (også kendt som `return false`) er to forskellige ting. De er ikke relaterede til hinanden.
```

```smart header="Indlejret kontekstmenuers arkitektur"
Der er også alternative måder at implementere indlejrede kontekstmenuer. En af dem er at have et enkelt globalt objekt med en håndtering af `document.oncontextmenu`, og metoder, der tillader os at gemme andre håndteringer i det.

Objektet vil fange alle højreklik, kigge gennem de gemte håndteringer og køre den der passer.

Men så skal al kode der ønsker en kontekstmenu kende til det objekt og bruge dets hjælp i stedet for dens egen `contextmenu`-håndtering.
```

## Opsummering

Der er mange standard browser-handlinger:

- `mousedown` -- starter valg (flyt musen for at vælge).
- `click` på `<input type="checkbox">` -- markerer/afmarkerer et `input`.
- `submit` -- Klik på `<input type="submit">` eller tast `key:Enter` inde i et formularfelt medfører at denne event opstår, og browseren sender formen.
- `keydown` -- tryk på en tast kan medføre tilføjelse af et tegn i et felt, eller andre handlinger.
- `contextmenu` -- denne event opstår ved et højreklik, og handlingen er at vise browserens kontekstmenu.
- ...og der er flere...

Alle de standard handlinger kan forhindres, hvis vi ønsker at håndtere eventen udelukkende med JavaScript.

For at forhindre en standard handling -- brug enten `event.preventDefault()` eller  `return false`. Den anden metode virker kun for håndteringer, der er tildelt med `on<event>`.

Indstillingen `passive: true` på `addEventListener` fortæller browseren, at handlingen ikke vil blive forhindret. Det er nyttigt for nogle mobile events, som `touchstart` og `touchmove`, for at fortælle browseren, at den ikke skal vente på, at alle håndteringer er færdige, før den begynder at scrolle.

Hvis en standard handling blev forhindret, bliver værdien af `event.defaultPrevented` til `true`, ellers er det `false`.

```warn header="Fokus på semantik, ikke misbrug"
Teknisk set, kan vi ved at forhindre standard handlinger og tilføje JavaScript tilpasse adfærd for ethvert element. For eksempel kan vi få et link `<a>` til at virke som en knap, og en knap `<button>` til at opføre sig som et link (omdirigere til en anden URL osv.).

Men vi bør generelt holde den semantiske betydning af HTML-elementer. For eksempel bør `<a>` udføre navigation, ikke en knap.

Udover bare at være "god stil", så gør det også din HTML bedre i forhold til tilgængelighed.

Endelig, hvis vi tager eksemplet med `<a>` i betragtning, så bør vi bemærke følgende: En browser tillader os at åbne sådanne links i et nyt vindue (ved at højreklikke på dem og andre midler) ... og folk kan lide det. Men hvis vi designer en knap så den opfører sig som et link ved hjælp af JavaScript og endda ser ud som et link ved hjælp af CSS, så vil `<a>`-specifikke browserfunktioner stadig ikke virke for det.
```
