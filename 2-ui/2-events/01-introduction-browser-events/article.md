# Introduktion til browser events

*En event* (på dansk en hændelse)er en signal, der indikerer, at noget er sket. Alle DOM-noder genererer sådanne signaler (men events er ikke begrænset til DOM).

Her er en liste over et par af de mere nyttige DOM-events, bare så du får en fornemmelse af, hvad der er muligt.:
**Mouse events:**
- `click` -- når musen klikker på et element (ved touchskærme er det når der trykkes på skærmen).
- `contextmenu` -- når musen højreklikker på et element.
- `mouseover` / `mouseout` -- når musen peger over / forlader et element.
- `mousedown` / `mouseup` -- når museknappen trykkes / frigives over et element.
- `mousemove` -- når musen bevæges.

**Keyboard events:**
- `keydown` and `keyup` -- når en tast på tastaturet trykkes og frigives.

**Form element events:**
- `submit` -- når besøgende indsender et `<form>`.
- `focus` --  når besøgende fokuserer på et element, f.eks. på et `<input>`.

**Document events:**
- `DOMContentLoaded` -- når HTML er hentet og processeret, DOM er færdigbygget.

**CSS events:**
- `transitionend` -- når en CSS-animation er færdig.

Der er mange andre events. Vi vil dække dem i detaljer i de kommende kapitler.

## Event-håndtering

Til at reagere på events kan vi tildele en *handler* -- en funktion, der kører i tilfælde af en event.

Handlers er en måde at køre JavaScript-kode der reagerer på system- eller brugerhandlinger.

Der er flere måder at tildele en handler. Lad os se nærmere på dem, begyndende med den mest simple.
### HTML-attribut

En handler kan sættes direkte i HTML ved med en attribut kaldet `on<event>`.

For eksempel, for at tildele en `click` handler til et `input`, kan vi bruge `onclick`, som her:

```html run
<input value="Klik mig" *!*onclick="alert('Klik!')"*/!* type="button">
```

Når musen klikker på elementet, kører koden inden i `onclick`.

Bemærk, at inde i `onclick` bruger vi enkelt anførelsestegn, fordi attributten selv er i dobbelte anførelsestegn. Hvis vi glemmer, at koden er inde i attributten og bruger dobbelte anførelsestegn inde, som dette:  `onclick="alert("Click!")"`, så vil det ikke virke korrekt.

En HTML-attribut er ikke et praktisk sted at skrive meget kode, så vi bør oprette en JavaScript-funktion og kalde den der.

Her vil et klik køre funktionen kaldet `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Kanin nummer " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Tæl kaniner!">
```

Som vi ved så er HTML-attributter ikke case-sensitive, så `ONCLICK` virker lige så godt som `onClick` og `onCLICK`... Men ofte er attributter i små bogstaver: `onclick`.

### DOM egenskaber

Vi kan tildele en handler ved hjælp af en DOM-egenskab `on<event>`.

For eksempel, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Klik mig">
<script>
*!*
  elem.onclick = function() {
    alert('Mange tak!');
  };
*/!*
</script>
```

Hvis en handler tildeles ved hjælp af en HTML-attribut, så læser browseren den, opretter en ny funktion fra attributindholdet og skriver den om til en DOM-egenskab.

Så denne måde er faktisk den samme som den forrige.

Disse to stykker kode virker ens:

1. Kun HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Klik!')"*/!* value="Button">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Button">
    <script>
    *!*
      button.onclick = function() {
        alert('Klik!');
      };
    */!*
    </script>
    ```

I det første eksempel bruges HTML-attributten til at initialisere `button.onclick`, mens det i det andet eksempel er selve scriptet ... grundklæggende ingen forskel.

**Da der kun er en `onclick`-egenskab, kan vi ikke tildele mere end én eventhandler.**

I eksemplet nedenfor overskriver tildelelsen af en handler med JavaScript den eksisterende handler:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Før')" value="Klik mig">
<script>
*!*
  elem.onclick = function() { // overskriver den eksisterende handler
    alert('Efter'); // du vil kun se denne
  };
*/!*
</script>
```

For at fjerne en handler -- tildel elementet `elem.onclick = null`.

## Tilgå elementet: this

Værdien af `this` inde i en handler er elementet. Det element, som har handleren på sig.

I koden nedenfor viser `button` sit indhold ved hjælp af `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Klik mig</button>
```

## Mulige fejl

Når du starter med at arbejde med events så er der små detaljer der er værd at have i baghovedet.

Vi kan sætte en eksisterende funktion som en handler:

```js
function sayThanks() {
  alert('Tak!');
}

elem.onclick = sayThanks;
```

Men vær forsigtig: funktionen skal tildeles som `sayThanks`, ikke `sayThanks()`.

```js
// rigtigt
button.onclick = sayThanks;

// forkert
button.onclick = sayThanks();
```

Hvis vi tilføjer paranteser, så bliver `sayThanks()` til et funktionskald. Så den sidste linje tager faktisk *resultatet* af funktionskaldet, som er `undefined` (da funktionen ikke returnerer noget), og tildeler det til `onclick`. Det virker ikke.

...Modsat så behøver vi paranteser i markup'en:

```html
<input type="button" id="button" onclick="sayThanks()">
```

Forskellen er relativ simpel. Når browseren læser attributten, opretter den en handlerfunktion hvor kroppen er indholdet fra attributten.

Så markup'en genererer denne egenskab:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- attributtens indhold placeres her
*/!*
};
```

**Brug ikke `setAttribute` til handlere.**

Et kald som dette vil ikke virke:

```js run no-beautify
// et klik på <body> vil generere fejl,
// fordi attributter altid er strenge, bliver function til en streng
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-egenskaber kigger efter store og små bogstaver.**

Tildel en handler til `elem.onclick`, ikke `elem.ONCLICK`, fordi DOM-egenskaber er case-sensitive.

## addEventListener

Et grundlæggende problem med de ovenstående måder at tildele handlere er, at vi *ikke kan tildele flere handlere til en begivenhed*.

Lad os sige, at en del af vores kode vil ønske at fremhæve en knap ved klik, og en anden vil ønske at vise en besked på samme klik.

Vi vil gerne tildele to event-handlere for det. Men en ny DOM-egenskab vil overskrive den eksisterende:
```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // erstatter den forrige handler
```

Udviklere af web standarden forstod dette for lang tid siden og foreslog en alternative måde at håndtere handlere ved hjælp af de specielle metoder `addEventListener` og `removeEventListener`, som ikke er bundet af denne begrænsning.

Syntaksen for at tilføje en handler er:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Navn på begivenheden, f.eks. `"click"`.

`handler`
: Handlerfunktionen.

`options`
: Et objekt der kan indeholde yderligere valgfrie egenskaber:
    - `once`: hvis `true`, vil listeneren automatisk fjernes efter den udløses.
    - `capture`: den *fase* der skal håndtere hændelsen. Dette bliver dækket senere i kapitlet <info:bubbling-and-capturing>. Af historiske grunde kan `options` også sættes til `false/true`, der betyder det samme som `{capture: false|true}`.
    - `passive`: hvis `true`, vil handleren ikke kalde `preventDefault()`. Det forklares senere i <info:default-browser-action>.

For at fjerne en handler, brug `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Fjernelse kræver den samme funktion"
For at fjerne en handler skal vi overføre nøjagtigt den samme funktion, som blev tildelt.

Dette virker ikke:

```js no-beautify
elem.addEventListener( "click" , () => alert('Tak!'));
// ....
elem.removeEventListener( "click", () => alert('Tak!'));
```

Denne handler vil ikke blive fjernet, fordi `removeEventListener` får en anden anonym funktion -- med den samme kode. Det spiller ingen rolle, da funktionen er et andet objekt.

Her er den rigtige måde:

```js
function handler() {
  alert( 'Tak!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Bemærk venligt -- hvis vi ikke gemmer funktionen i en variabel så kan vi ikke fjerne den. Der er ikke nogen mulighed for at "trække en handler ud" af et element der har fået den tildelt med `addEventListener`.
````

Flere kald til `addEventListener` tillader os at tilføje flere handlere, som her:

```html run no-beautify
<input id="elem" type="button" value="Klik mig"/>

<script>
  function handler1() {
    alert('Tak!');
  };

  function handler2() {
    alert('Tak igen!');
  }

*!*
  elem.onclick = () => alert("Hej");
  elem.addEventListener("click", handler1); // Tak!
  elem.addEventListener("click", handler2); // Tak igen!
*/!*
</script>
```

Som det fremgår af eksemplet ovenfor, kan vi sætte handlere *både* ved hjælp af en DOM-egenskab og `addEventListener`. Men generelt bruger vi kun én af metoderne.

````warn header="For nogle events, vil handlere kun virke med `addEventListener`"
Der findes events der ikke kan tildeles via en DOM-egenskab. Kun med `addEventListener`.

For eksempel eventen `DOMContentLoaded`, der affyres når documentet er hentet og DOM-træet er bygget færdigt.

```js
// vil aldrig køre
document.onDOMContentLoaded = function() {
  alert("DOM er klar");
};
```

```js
// denne måde virker
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM er klar");
});
```
Så `addEventListener` er mere universiel ... selvom sådanne event mere er undtagelsen end reglen.
````

## Event objekt

For at kunne håndtere en event ordentligt skal vi vide mere om, hvad der er sket. Informationen "click" eller "keydown" er sjældent nok. Vi har ofte også brug for information om, hvilket koordinat musen havde eller hvilken tast der blev trykket på, etc.

Når en event sker så opretter browseren et *event objekt*, putter detaljer ind i det og sender det som et argument til handleren.

Her er et eksempel på, hvordan man henter musemarkørens koordinater fra event objektet:

```html run
<input type="button" value="Klik mig" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // vis event type, element og koordinaterne for klikket
    alert(event.type + " på " + event.currentTarget);
    alert("Koordinater: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Et par gængse egenskaber for `event` objekt er:

`event.type`
: Typen af event. Her er det `"click"`.

`event.currentTarget`
: Elementet som håndterede eventet. Det er præcis det samme som `this`, medmindre handleren er en arrow function, eller dens `this` er bundet til noget andet, så kan vi altid få elementet fra  `event.currentTarget`.

`event.clientX` / `event.clientY`
: Koordinater for musemarkøren (og andre pege-events) relativt til vinduet.

Der er mange andre egenskaber. Mange af dem er afhængige af event typen: keyboard events har ét sæt af egenskaber, pointer events har andre. Vi kigger nærmere på de forskellige egenskaber, når vi undersøger dem enkeltvis.

````smart header="Event objektet er også tilgængeligt i HTML handlere"
Hvis vi tildeler en handler i HTML, kan vi også bruge `event` objektet sådan her:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

Dette er muligt fordi browseren læser attributten og opretter et handler objekt:  `function(event) { alert(event.type) }`. Det betyder: dets første argument kaldes `"event"` og indholdet bliver taget fra attributten.
````


## Object handlere: handleEvent

Vi kan tildele andet end funktioner med `addEventListener` - det kan også være et objekt. Når en event sker, kaldes dens `handleEvent` metode.

For eksempel, her er et objekt der håndterer en `click` event:


```html run
<button id="elem">Klik mig</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " på " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

Som vi kan se, når `addEventListener` modtager et objekt som handler, kalder det `obj.handleEvent(event)` i tilfælde af en event.

Vi kunne også bruge objekter af en brugerdefineret klasse, som dette:


```html run
<button id="elem">Klik mig</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Musen trykkes ned";
          break;
        case 'mouseup':
          elem.innerHTML += "...og slippes.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Her håndterer det samme objekt begge evens. Bemærk, at vi stadig er nødt til at sætte alle listeners med `addEventListener`. Objektet `menu` giver os kun `mousedown` og `mouseup` her - ikke enhver type af events.

Metoden `handleEvent` behøver ikke at gøre alt arbejdet selv. Den kan kalde andre event-specifikke metoder i stedet, som dette:

```html run
<button id="elem">Klik mig</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Musen trykkes ned";
    }

    onMouseup() {
      elem.innerHTML += "...og slippes.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Nu er event handlere klart adskilt på en måde der er nemmere at vedligeholde.

## Opsummering

Der er 3 måder at tildele event handlere:

1. HTML attribut: `onclick="..."`.
2. DOM egenskab: `elem.onclick = function`.
3. Metoderne: `elem.addEventListener(event, handler[, phase])` til at tilføje, og `removeEventListener` til at fjerne.

HTML attributer bruges sjældent fordi JavaScript midt inde i et HTML tag ikke er god skik. Vi kan heller ikke skrive meget kode i forbindelse med hændelsen.

DOM egenskaber er ok at bruge, men vi kan ikke tildele mere end én handler af den pågældende event. I mange tilfælde er denne begrænsning ikke kritisk.

Den sidste måde er den mest fleksible, men den er også den længste at skrive. Der er få events, der kun virker med denne måde, for eksempel `transitionend` og `DOMContentLoaded` (forklares i et senere kapitel). `addEventListener` understøtter også objekter som event handlere. I det tilfælde kaldes metoden `handleEvent` i tilfælde af eventen.

Lige meget hvordan du tildeler en handler får det et event-objekt som det første argument. Objektet indeholder detaljer om hvad der er sket.

Vi lærer mere om events i det hele tag og om forskellige typer af events i de næste kapitler.
