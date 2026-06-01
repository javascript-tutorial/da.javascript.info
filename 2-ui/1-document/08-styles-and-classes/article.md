# Styles og classes

Før vi dykkter ned i JavaScript's måde at arbejde med styles og classes er der en vigtig regel. Forhåbentligt er den tydelig i eksemplerne, men vi bør nok stadig nævne den fra starten.

Der er generelt to måder at style et element:

1. Opret en klasse i CSS og tilføj den: `<div class="...">`
2. Skriv egenskaber direkte ind i `style`: `<div style="...">`.

JavaScript kan både ændre både classes og `style` egenskaber.

Vi bør altid foretrække CSS-classes frem for `style`. Den sidste bør kun bruges, hvis classes "ikke kan klare det".

For eksempel er `style` acceptabel, hvis vi beregner koordinater for et element dynamisk og vil sætte dem fra JavaScript, sådan her:

```js
let top = /* kompleks beregning */;
let left = /* kompleks beregning */;

elem.style.left = left; // e.g '123px', beregnes ved kørsel
elem.style.top = top; // e.g '456px'
```

I andre situationer, som at gøre teksten rød, tilføje et baggrundsbillede -- beskriv det i CSS og tilføj derefter klassen (det kan JavaScript gøre). Det er mere fleksibelt og lettere at vedligeholde.

## className og classList

Ændring af class er en af de mest brugte handlinger i scripts.

I gamle dage var der en begrænsning i JavaScript: et reserveret ord som `"class"` kunne ikke være en egenskab for et objekt. Denne begrænsning findes ikke længere, men på det tidspunkt var det umuligt at have en `"class"`-egenskab, som `elem.class`.

Så for classes blev den lignende egenskab `"className"` introduceret: the `elem.className` corresponds to the `"class"` attribute.

For eksempel:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

Hvis vi tildeler noget til `elem.className`, erstatter det hele strengen af classes. Nogle gange er det det vi har brug for, men ofte vil vi kun tilføje/fjerne en enkelt class.

Der er en anden egenskab for det: `elem.classList`.

Objektet `elem.classList` er et specielt objekt med metoderne `add/remove/toggle` i relation til en enkelt class.

For eksempel:

```html run
<body class="main page">
  <script>
*!*
    // tilføj en class
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // main page article
  </script>
</body>
```

Så vi kan både behandle hele strengen af classes ved hjælp af `className` eller individuelle classes ved hjælp af `classList`. Hvad vi vælger, afhænger af vores behov.

Metoder for `classList`:

- `elem.classList.add/remove("class")` -- tilføjer/fjerner en class.
- `elem.classList.toggle("class")` -- tilføjer class'en, hvis den ikke eksisterer, ellers fjerner den.
- `elem.classList.contains("class")` -- tjekker for den givne class, returnerer `true/false`.

Derudover er `classList` itererbar, så vi kan opliste alle classes med `for..of`, sådan her:

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, og derefter page
    }
  </script>
</body>
```

## Element style

Egenskaben `elem.style` er et objekt, der svarer til det, der er skrevet i `"style"`-attributten. At sætte `elem.style.width="100px"` virker på samme måde som hvis vi havde strengen `width:100px` sat i attributten `style`.

For egenskaber sammensat af flere ord bruges camelCase i stedet for bindestreger. Det betyder, at bindestreger i CSS erstattes af store bogstaver i JavaScript.:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

For eksempel:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Præfikserede egenskaber"
Browser-præfiks egenskaber som `-moz-border-radius`, `-webkit-border-radius` følger også samme regle: en bindestreg betyder stort bogstav.

For eksempel:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Nulstilling af en `style` egenskab

Nogle gange vil vi tildele en værdi til en style egenskab, andre gange vil vi fjerne den.

For eksempel, for at skjule et element, kan vi sætte `elem.style.display = "none"`.

Senere vil vi måske ønske at fjerne værdien fra `style.display` som om den ikke var sat. I stedet for `delete elem.style.display` bør vi tildele en tom streng til den: `elem.style.display = ""`.

```js run
// hvis vi kører denne kode, vil <body> blinke
document.body.style.display = "none"; // hide

setTimeout(() => document.body.style.display = "", 1000); // tilbage til normal
```

Hvis vi sætter `style.display` til en tom streng, så anvender browseren egne indbyggede CSS-klasser og stil, som om der ikke var nogen sådan `style.display`-egenskab overhovedet.

Der er også en speciel metode til det, `elem.style.removeProperty('style property')`. Så kan vi fjerne en egenskab sådan her:

```js run
document.body.style.background = 'red'; //sæt background til red

setTimeout(() => document.body.style.removeProperty('background'), 1000); // fjern background efter 1 sekund
```

````smart header="Fuld omskrivning med `style.cssText`"
Normalt bruger vi `style.*` til at tildele individuelle style-egenskaber. Vi kan ikke sætte et samlet udseende (flere enkelte styles) i stil med `div.style="color: red; width: 100px"`, fordi `div.style` er et objekt, og det er read-only.

For at sætte den samlede style som en enkelt streng, er der en speciel egenskab `style.cssText`:

```html run
<div id="div">Knap</div>

<script>
  // vi kan sætte specielle style flag som "important" her
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

Denne egenskab er sjældent brugt, fordi en sådan tildeling fjerner alle eksisterende styles: det tilføjer ikke, men erstatter dem. Det kan betyde, at du kommer til at slette noget, der er nødvendigt. Men vi kan trygt bruge den for nye elementer, når vi ved, at vi ikke vil slette en eksisterende style.

Det samme kan opnås ved at sætte en attribut: `div.setAttribute('style', 'color: red...')`.
````

## Vær opmærksom på enheder

Glem ikke at tilføje CSS-enheder til værdier.

For eksempel skal vi ikke sætte `elem.style.top` til `10`, men til `10px` - ellers virker det ikke:

```html run height=100
<body>
  <script>
  *!*
    // virker ikke!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (tom streng, tildeling ignoreres)
  */!*

    // tilføj nu en CSS-enhed (px) - og så virker det
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

Bemærk: browseren "pakker egenskaber ud" så egenskaben `style.margin` i forrige eksempel afleder selv værdierne i `style.marginLeft` og `style.marginTop` fra `style.margin`.

## beregnet udseende: getComputedStyle

Så det, at modificere en style er ret nemt. Men hvordan *læser* man det?

Hvis vi f.eks. vil vide størrelsen, margenerne og farven på et element. Hvordan gør vi det?

**Egenskaben `style` opererer kun med værdien af `"style"` attributten - uden CSS cascade.**

Derfor kan vi ikke læse noget, der kommer fra CSS-klasser ved hjælp af `elem.style`.

For eksempel ser `style` ikke marginen, der er defineret i CSS:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // empty
    alert(document.body.style.marginTop); // empty
*/!*
  </script>
</body>
```

...men hvad nu hvis vi f.eks. vil øge marginen med `20px`? Til det har vi brug for at vide den nuværende værdi.

Der findes en metode til det: `getComputedStyle`.

Syntaksen er:

```js
getComputedStyle(element, [pseudo])
```

element
: Det element du vil læse værdien for.

pseudo
: Et pseudo-element hvis krævet, for eksempel `::before`. En tom streng eller intet argument betyder selve elementet.

Resultatet er et objekt med styles, som du kender dem fra `elem.style`, men nu med hensyn til alle CSS-klasser.

For eksempel:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // nu kan vi læse marginen og farven fra det

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Beregnede og udledte værdier (computed and resolved values)"
Der er to koncepter i [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. En *computed* style-værdi er værdien efter alle CSS-regler og CSS-arv er anvendt, som resultatet af CSS-kaskaden. Den kan se ud som `height:1em` eller `font-size:125%`.
2. En *resolved* style-værdi er den værdi, der endelig er anvendt på elementet. Værdier som `1em` eller `125%` er relative. Browseren tager den computed værdi og gør alle enheder faste og absolute, for eksempel: `height:20px` eller `font-size:16px`. For geometriske egenskaber kan resolved værdier have et flydende komma, som `width:50.5px`.

For lang tid siden blev `getComputedStyle` oprettet for at hente computed værdier, men det viste sig, at de endeligt udledte værdier er meget mere praktiske, og standarden ændrede sig.

Så nu om stunder returnerer `getComputedStyle` faktisk de udledte værdier, normalt i `px` for geometriske egenskaber.
```

````warn header="`getComputedStyle` kræver det fulde navn på egenskaben"
Vi bør altid spørge efter den præcise egenskab, vi vil have, som `paddingLeft` eller `marginTop` eller `borderTopWidth`. Ellers er det ikke garanteret, at vi får det korrekte resultat.

For eksempel, hvis der er sat egenskaber for `paddingLeft/paddingTop`, hvad skal vi få for `getComputedStyle(elem).padding`? Intet, eller måske en "genereret" værdi fra kendte padding-værdier? Der er ingen standardregel her.
````

```smart header="Styles påført til `:visited` links er skjulte!"
Besøgte links kan farves ved hjælp af CSS-pseudoklassen `:visited`.

Men `getComputedStyle` giver ikke adgang til den farve, fordi ellers kunne en vilkårlig side finde ud af, om brugeren har besøgt en link ved at oprette den på siden og tjekke stilene.

JavaScript kan ikke se de stilarter, der er anvendt af `:visited`. Der er også en begrænsning i CSS, der forbyder at anvende ændringer relateret til geometri i `:visited`. Det er for at garantere, at der ikke er nogen smutveje for en ond side til at teste, om en link blev besøgt og dermed bryde med regler for privatliv.
```

## Opsummering

Til at håndtere klasser, er der to DOM-egenskaber:

- `className` -- en regulær streng, god til at håndtere hele sættet af klasser.
- `classList` -- et objekt med metoder `add/remove/toggle/contains`, god til individuelle klasser.

For at ændre stilene:

- Egenskaben `style` er et objekt med camelCased styles. Læsning og skrivning til dem har samme betydning som at modificere de individuelle egenskaber i `"style"`-attributten. For at se, hvordan man anvender `important` og andre mindre brugte muligheder er der en liste af metoder på [MDN](mdn:api/CSSStyleDeclaration).

- Egenskaben `style.cssText` svarer til hele `"style"`-attributten - altså, den fulde streng af styles.

For at læse de udledte styles (resolved values) (hvor der tages hensyn til alle klasser, og efter at al CSS er anvendt og de endelige værdier er beregnet):

- `getComputedStyle(elem, [pseudo])` returnerer et style-lignende objekt med dem. Skrivebeskyttet.
