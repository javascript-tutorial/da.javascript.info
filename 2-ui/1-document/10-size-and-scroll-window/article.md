# Størrelse på vinduet og scrolling

Hvordan finder vi bredden og højden på browserens vindue? Hvordan får vi den fulde bredde og højde af dokumentet ... inklusiv den del, der er rullet ud så vi ikke kan se den? Hvordan ruller vi siden ved hjælp af JavaScript?

Til denne type information kan vi bruge det roden dokumentelement `document.documentElement`, der svarer til `<html>` taggen. Men der er en del særheder at overveje, fordi de virker lidt forskelligt i forskellige browsere. Og det kan være svært at gennemskue.

## Bredde/højde på vinduet

For at få vinduets bredde og højde kan vi bruge `clientWidth/clientHeight` af `document.documentElement`:

![](document-client-width-height.svg)

```online
For eksempel viser denne knap højden på dit vindue:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

````warn header="Ikke `window.innerWidth/innerHeight`"
Browsere understøtter også egenskaber som `window.innerWidth/innerHeight`. De ser ud til at være det vi vil have, så hvorfor ikke bruge dem i stedet?

Hvis der er et scrollbar, og det optager plads, giver `clientWidth/clientHeight` bredden og højden uden (minus) det. Med andre ord returnerer de bredden og højden af den synlige del af dokumentet, klar til brug af indholdet.

`window.innerWidth/innerHeight` inkluderer scrollbar'en.

Hvis der er et scrollbar, og det optager plads, så viser disse to linjer forskellige værdier:

```js run
alert( window.innerWidth ); // fuld bredde af vinduet
alert( document.documentElement.clientWidth ); // vinduets bredde minus scrollbar'en
```

I de fleste tilfælde har vi brug for den *tilgængelige* bredde af vinduet for at kunne tegne eller placere noget inden for scrollbars (hvis der er nogen), så vi bør bruge `documentElement.clientHeight/clientWidth`.
````

```warn header="`DOCTYPE` er vigtigt"
Bemærk: top-level geometri egenskaber kan virke en smule anderledes, når der ikke er et `<!DOCTYPE HTML>` i HTML'en. Lidt mærkeligt men sandt.

I moderne HTML bør vi altid skrive `DOCTYPE`.
```

## Bredde/højde på dokumentet

Teoretisk set er `document.documentElement` roden - det vil sige det element der indeholder alt indholdet - så vi kunne forvente at kunne måle dokumentets fulde størrelse som `document.documentElement.scrollWidth/scrollHeight`.

Men for siden som helhed virker disse egenskaber ikke altid som forventet. For eksempel kan `document.documentElement.scrollHeight` være mindre end `document.documentElement.clientHeight` i Chrome/Safari/Opera, hvis der ikke er noget scrollbar. Mærkeligt, ikke? 

For at få den fulde højde på dokumentet med sikkerhed, skal vi tage maksimum af følgende egenskaber:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Dokumentets fulde højde, inklusiv den del der er scrollet ud: ' + scrollHeight);
```

Hvorfor det? Jeg tror det er bedre at lade være med at spørge. Disse uoverensstemmelser stammer fra gamle dage, ikke fra en "smart" logik.

## Find den nuværende scroll position [#page-scroll]

DOM-elementer har deres nuværende scroll information i deres `scrollLeft/scrollTop` egenskaber.

`document.documentElement.scrollLeft/scrollTop` virker i de fleste browsere, undtagen ældre WebKit-baserede browsere, som Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), hvor vi skal bruge `document.body` i stedet for `document.documentElement`.

Heldigvis behøver vi slet ikke at huske disse særheder, for scroll positionen er tilgængelig i de specielle egenskaber `window.pageXOffset/pageYOffset`:

```js run
alert('Aktuelle scroll position fra toppen: ' + window.pageYOffset);
alert('Aktuelle scroll position fra venstre: ' + window.pageXOffset);
```

Disse egenskaber kan kun læses.

```smart header="Findes også som `window`-egenskaberne `scrollX` og `scrollY`"
Af historiske årsager eksisterer begge egenskaber, men de er det samme:
- `window.pageXOffset` er et alias for `window.scrollX`.
- `window.pageYOffset` er et alias for `window.scrollY`.
```

## Scrolling: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
For at rulle siden med JavaScript skal dens DOM være fuldt udbygget.

For eksempel vil det ikke virke, hvis vi forsøger at rulle siden med et script i `<head>`.
```

Regelmæssige elementer kan rulles ved at ændre `scrollTop/scrollLeft`.

Vi kan gøre det samme for siden ved hjælp af `document.documentElement.scrollTop/scrollLeft` (undtagen Safari, hvor `document.body.scrollTop/Left` skal bruges i stedet).

Alternativt er der en simplere, universel løsning: de specielle metoder [window.scrollBy(x,y)](mdn:api/Window/scrollBy) og [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- Metoden `scrollBy(x,y)` ruller siden *relativt til dens nuværende position*. For eksempel vil `scrollBy(0,10)` rulle siden `10px` ned.

    ```online
    Knappen herunder demonstrerer dette:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- Metoden `scrollTo(pageX,pageY)` ruller siden *til absolutte koordinater*, således at øverste venstre hjørne af den synlige del har koordinaterne `(pageX, pageY)` relativt til dokumentets øverste venstre hjørne. Det er som at sætte `scrollLeft/scrollTop`.

    For at rulle til helt i begyndelsen kan vi bruge `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Disse metoder virker på tværs af alle browsere på samme måde.

## scrollIntoView

For fuldstændighedens skyld, lad os dække én metode mere: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).

Kaldet til `elem.scrollIntoView(top)` ruller siden for at gøre `elem` synlig. Den har et argument:

- Hvis `top=true` (standard), så rulles siden for at gøre `elem` synlig øverst i vinduet. Elementets øvre kant vil blive justeret med vinduets top.
- Hvis `top=false`, så rulles siden for at gøre `elem` synlig nederst. Elementets nedre kant vil blive justeret med vinduets bund.

```online
Knappen herunder ruller siden for at positionere sig selv øverst i vinduet:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

Og denne knap ruller siden for at positionere sig selv nederst:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Forbud mod scrolling

Nogle gange skal vi gøre dokumentet "unscrollable". For eksempel, når vi skal dække siden med en stor besked, der kræver øjeblikkelig opmærksomhed, og vi ønsker, at den besøgende skal interagere med den besked, ikke med dokumentet.

For at forhindre scrolling i dokumentet er det nok at sætte `document.body.style.overflow = "hidden"`. Siden vil "fryse" ved sin nuværende scroll position.

```online
Prøv det:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

Den første knap forhindrer scrollingen, mens den anden frigiver den.
```

Den samme teknik kan bruges til at forhindre scrollingen for andre elementer end `document.body`.

Ulempen ved metoden er, at scrollbaren forsvinder. Hvis den optog noget plads, så er den plads nu fri og indholdet "springer" for at fylde den.

Det ser lidt mærkeligt ud, men kan løses ved at sammenligne `clientWidth` før og efter pausen. Hvis den steg (scrollbaren forsvandt), så tilføjes `padding` til `document.body` i stedet for scrollbaren for at holde indholdets bredde den samme.

## Opsummering

Geometri:

- Bredde/højde på den synlige del af dokumentet (indholdsområdets bredde/højde): `document.documentElement.clientWidth/clientHeight`
- Bredde/højde af hele dokumentet, med den del der er scrollet ud:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Scrolling:

- Læs den aktuelle scroll: `window.pageYOffset/pageXOffset`.
- Ændr den aktuelle scroll:

    - `window.scrollTo(pageX,pageY)` -- absolutte koordinater,
    - `window.scrollBy(x,y)` -- scroll relativt til den aktuelle position,
    - `elem.scrollIntoView(top)` -- scroll for at gøre `elem` synlig (juster med toppen/bunden af vinduet).
