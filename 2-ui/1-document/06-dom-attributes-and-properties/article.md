# Attributter og egenskaber

Når en browser henter en side, læser den (et andet ord: "parser") HTML'en og genererer DOM-objekter ud fra dem. For elementnoder bliver de fleste standard HTML-attributter automatisk til egenskaber for DOM-objekterne.

For eksempel, hvis tagget er `<body id="page">`, så har DOM-objektet `body.id="page"`.

Men forholdet mellem attributter og egenskaber er ikke en-til-en! I dette kapitel vil vi fokusere på at adskille disse to koncepter, for at se, hvordan man arbejder med dem, når de er de samme, og når de er forskellige.

## DOM egenskaber

Vi har allerede set det indbyggede DOM egenskaber - der er mange. Men teknisk set er der ingen begrænsninger for os. Hvis der ikke er nok, kan vi oprette vores egne.

DOM noder er regulære JavaScript objekter. Vi kan ændre dem.

For eksempel, lad os oprette en ny egenskab i `document.body`:

```js run
document.body.myData = {
  name: 'Cæsar',
  title: 'Kejser'
};

alert(document.body.myData.title); // Kejser
```

Vi kan også tilføje en metode:

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (værdien af "this" i metoden er document.body)
```

Vi kan også modificere indbyggede prototyper som `Element.prototype` og tilføje nye metoder til alle elementer:

```js run
Element.prototype.sayHi = function() {
  alert(`Hej, Jeg er ${this.tagName}!`);
};

document.documentElement.sayHi(); // Hej, Jeg er HTML!
document.body.sayHi(); // Hej, Jeg er BODY!
```

Så, DOM egenskaber og metoder er de samme som regulære JavaScript objekter.

- De kan have hvilken som helst værdi.
- De er case-sensitive (på dansk versalfølsomme, men det er der ingen der siger) (skriv `elem.nodeType`, ikke `elem.NoDeTyPe`).

## HTML attributter

I HTML kan tags have attributter. Når browseren parser HTML'en for at oprette DOM-objekter for tags, genkender den *standard* attributter og opretter DOM-egenskaber ud fra dem.

Så når et element har `id` eller en anden *standard* attribut, oprettes den tilsvarende egenskab. Men det sker ikke, hvis attributten *ikke er standard*.

For eksempel:
```html run
<body id="test" something="ikke-standard">
  <script>
    alert(document.body.id); // test
*!*
    // ikke-standard attribut giver ikke en egenskab
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

Bemærk at en standard attribut for et element kan være ukendt for et andet element. For eksempel er `"type"` standard for `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), men ikke for `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Standard attributter er beskrevet i specifikationen for den tilsvarende elementklasse.

Det kan vi se her:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM egenskaben oprettes ikke, fordi den ikke er standard for elementet
*/!*
  </script>
</body>
```

Så, hvis en attribut ikke er standard for elementet oprettes der ikke en DOM egenskab. Men, er der så en måde at tilgå sådanne attributter?

Det er der! Alle attributter er tilgængelige ved hjælp af følgende metoder:

- `elem.hasAttribute(name)` -- tjekker for eksistens.
- `elem.getAttribute(name)` -- henter værdien.
- `elem.setAttribute(name, value)` -- sætter værdien.
- `elem.removeAttribute(name)` -- fjerner attributten.

Disse metoder arbejder præcis med det, der er skrevet i HTML.

Man kan også læse alle attributter ved hjælp af `elem.attributes`: en samling af objekter, der tilhører en indbygget [Attr](https://dom.spec.whatwg.org/#attr) klasse, med `name` og `value` egenskaber.

Her er en demonstration af læsning af en ikke-standard egenskab:

```html run
<body something="ikke-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // ikke-standard
*/!*
  </script>
</body>
```

HTML attributter har følgende egenskaber:

- Deres navne er ikke case-sensitive (`id` er set samme som `ID`).
- Deres værdi er altid strenge.

Her er en udvidet demonstration af arbejde med attributter:

```html run
<body>
  <div id="elem" about="Elefant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elefant', reading

    elem.setAttribute('Test', 123); // (2), writing

    alert( elem.outerHTML ); // (3), se om attributten er i HTML (ja, det er den)

    for (let attr of elem.attributes) { // (4) oplist alle attributter
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

Bemærk:

1. `getAttribute('About')` -- det første bogstav er stort, og i HTML er alle bogstaverne små. Men det er lige meget: attributnavne er ikke case-sensitive.
2. Vi kan tildele hvad som helst til en attribut, men det bliver til en streng. Så her har vi `"123"` som værdien.
3. Alle attributter, også dem vi selv sæltter, er synlige i `outerHTML`.
4. Samlingen `attributes` er itererbar og har alle attributter for elementet (standard og ikke-standard) som objekter med `name` og `value` egenskaber.

## Egenskab-attribut synkronisering

Når en standard attribut ændres, opdateres den tilsvarende egenskab automatisk, og (med nogle undtagelser) vice versa.

I eksemplet herunder ændres `id` som attribut, og vi kan se at egenskaben også ændres. Og det samme sker den anden vej:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribut => egenskab
  input.setAttribute('id', 'id');
  alert(input.id); // id (opdateret)

  // egenskab => attribut
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (opdateret)
</script>
```

Men der er undtagelser, for eksempel synkroniserer `input.value` kun fra attribut til egenskab og ikke den anden vej rundt:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribut => egenskab
  input.setAttribute('value', 'tekst');
  alert(input.value); // tekst

*!*
  // IKKE egenskab => attribut
  input.value = 'newValue';
  alert(input.getAttribute('value')); // tekst (ikke opdateret!)
*/!*
</script>
```

I eksemplet ovenfor:
- Ændring af attributten `value` opdaterer egenskaben.
- Men ændring af egenskaben påvirker ikke attributten.

Denne "feature" kan faktisk være nyttig, fordi brugerhandlinger kan føre til `value`-ændringer, og derefter, hvis vi vil gendanne den "originale" værdi fra HTML, er den i attributten.

## DOM egenskaber er en bestemt type

DOM egenskaber er ikke altid strenge. For eksempel er egenskaben `input.checked` (for afkrydsningsbokse) boolesk:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // værdien af attributten er: tom streng
  alert(input.checked); // værdien af egenskaben er: true
</script>
```

Der er andre eksempler. Attributten `style` er en streng, men egenskaben `style` er et objekt:

```html run
<div id="div" style="color:red;font-size:120%">Hej</div>

<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

De fleste egenskaber er dog strenge.

I sjældne tilfælde kan de adskille sig fra attributten, selvom en DOM-egenskabens type er en streng. For eksempel er `href`-egenskaben altid en *fuld* URL, selv hvis attributten indeholder en relativ URL eller kun en `#hash`.

Her er et eksempel:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attribut
  alert(a.getAttribute('href')); // #hello

  // egenskab
  alert(a.href ); // fuld URL i formaetet http://site.com/page#hello
</script>
```

Hvis vi har brug for værdien af `href` eller en anden attribut præcis som den er skrevet i HTML, kan vi bruge metoden `getAttribute`.


## Ikke-standard attributter, dataset

Når vi skriver HTML, bruger vi mange standard attributter. Men hvad med ikke-standard, brugerdefinerede attributter? Lad os først se på om de overhovedet er brugbare eller ej. Hvad kan de bruges til?

Nogle gange bruges ikke-standard attributter til at sende brugerdefinerede data fra HTML til JavaScript, eller til at "markere" HTML-elementer for JavaScript.

Sådan her:

```html run
<!-- marker denne div fil at vise "name" her -->
<div *!*show-info="name"*/!*></div>
<!-- og age her -->
<div *!*show-info="age"*/!*></div>

<script>
  // koden finder elementet med markeringen og viser det der efterspørges
  let user = {
    name: "Valdemar",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // idsætter den tilsvarende info i feltet der efterspørges
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // først sættes Valdemar ind i "name", derefter 25 ind i "age"
  }
</script>
```

De kan også bruges til at style et element.

For eksempel opdateres en ordres status med attributten `order-state`:

```html run
<style>
  /* styles der forlader sig på den brugerdefinerede attribut "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  En ny ordre.
</div>

<div class="order" order-state="pending">
  En ventende ordre.
</div>

<div class="order" order-state="canceled">
  En annulleret ordre.
</div>
```

HVorfor vil en attribut være at foretrække frem for en klasse i stil med `.order-state-new`, `.order-state-pending`, `.order-state-canceled`?

Fordi en attribut er mere praktisk at håndtere. Tilstanden kan ændres lige så let som:

```js
// en smule mere simpelt end at slette og tilføje en ny klasse
div.setAttribute('order-state', 'canceled');
```

Men, der kan være mulige problemer med brugerdefinerede attributter. Hvad hvis vi bruger ikke-standard attributter i vores projekt, men standarden senere introducere samme attribut? HTML sproget er levende, det gror og flere attributter vil komme for at tilfredsstille udvikleres behov. Det kan derfor føre til uventede resultater.

For at undgå den slags konflikter, findes [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) attributter.

**Alle attributter der starter med "data-" er reserveret til brug for programører. De er tilgængelige i egenskaben `dataset`.**

For eksempel, hvis et `elem` har en attribut med navnet `"data-about"`, er den tilgængelig som `elem.dataset.about`.

Sådan her:

```html run
<body data-about="Elefanter">
<script>
  alert(document.body.dataset.about); // Elefanter
</script>
```

Attributter med flere ord som `data-order-state` bliver til camel-cased: `dataset.orderState`.

Her er et omskrevet eksempel af ordretilstanden, der bruger `data-*` attributter:

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  En ny ordre.
</div>

<script>
  // læs
  alert(order.dataset.orderState); // new

  // modificer
  order.dataset.orderState = "pending"; // (*)
</script>
```

Brugen af `data-*` attributter er en valid og sikker måde at overføre brugerdefinerede data.

Bemærk, at vi ikke kun kan læse data-attributter, vi kan også modificere dem. Derefter vil CSS opdatere skærmen: I eksemplet vil den sidste linje `(*)` ændre farven til blå.

## Opsummering

- Attributter -- er det der skrives i HTML.
- Egenskaber -- er det der er i DOM-objekter.

En lille sammenligning:

|            | Properties | Attributes |
|------------|------------|------------|
|Type|Alle værdier, standard egenskaber har deres type beskrevet i specifikationen|En streng|
|Navn|case-sensitiv|ikke case-sensitiv|

Metoder til at arbejde med attributter er:

- `elem.hasAttribute(name)` -- for at tjekke om attributten eksisterer.
- `elem.getAttribute(name)` -- for at få værdien af en attribut.
- `elem.setAttribute(name, value)` -- for at sætte værdien af en attribut.
- `elem.removeAttribute(name)` -- for at fjerne et attribut.
- `elem.attributes` er en samling af attributter på et element.

I de fleste situationer er det bedre at bruge DOM-egenskaber. Vi bør kun henvise til attributter, når DOM-egenskaber ikke passer med det vil vil opnå. Altså, situationer hvor vi har brug for det præcise indhold af en attribut, for eksempel:

- Vi har brug for en oprettet ikke-standard attribut. Men hvis den starter med `data-`, så bør vi bruge `dataset`.
- Vi vil læse værdien "som den er skrevet" i HTML. Værdien af DOM-egenskaben kan være anderledes, for eksempel `href`-egenskaben er altid en fuld URL, og vi kan ønske at få "original" værdi.
