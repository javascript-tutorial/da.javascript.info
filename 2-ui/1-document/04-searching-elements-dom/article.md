# Søgning: getElement*, querySelector*

Egenskaberne til DOM navigation properties er gode når elementerne er tætte på hinanden. Hvad nu hvis de ikke er det? Hvordan får man adgang til et vilkårligt element på siden?

Der er heldigvis flere søgemetoder til rådighed.

## document.getElementById or just id

Hvis et element har `id` attributten, kan vi få adgang til elementet ved hjælp af metoden `document.getElementById(id)`, uanset hvor det er.

For eksempel:

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // hent elementet
*!*
  let elem = document.getElementById('elem');
*/!*

  // gør baggrunden rød
  elem.style.background = 'red';
</script>
```

Der er også en global variabel kaldet `id`der refererer til elementet:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  // elem er en reference til DOM-elementet med id="elem"
  elem.style.background = 'red';

  // id="elem-content" har en bindestreg i navnet, så det ikke kan være et variabelnavn
  // ...men vi kan tilgå det ved hjælp af firkantede parenteser: window['elem-content']
</script>
```

...Det sker med mindre at du deklarerer en JavaScript variabel med det samme navn - så vil den tage præcedens.

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // elem er nu 5, ikke en reference til <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="Du skal helst ikke bruge id-navngivede globale variable til at tilgå elememnter"
Denne adfærd er beskrevet [i specifikationen](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object), men det er understøttet hovedsageligt af kompetibilitet.

Browseren forsøger at hjælpe os ved at blande namespaces for JS og DOM. Det er i orden for simple scripts, indlejret i HTML, men generelt er det ikke en god idé. Der kan være navnekonflikter. Desuden, når man læser JS-kode og ikke har HTML i samme visning, er det ikke helt klart hvor variablen kommer fra.

Her i tutorialen bruger vi `id` til at referere direkte til et element for korthed, når det er klart hvor elementet kommer fra.

I virkeligheden er `document.getElementById` den foretrukne metode.
```

```smart header="Et `id` skal være unikt"
Et `id` skal være unikt. Der kan kun være ét element i dokumentet med det givne `id`.

Hvis der er flere elementer med det samme `id`, så er opførslen for metoder, der bruger det, uforudsigelig, f.eks. `document.getElementById` kan returnere et af sådanne elementer tilfældigt. Så husk venligst reglen og hold `id` unikt.
```

```warn header="Kun `document.getElementById`, ikke `anyElem.getElementById`"
Metoden `getElementById` kan kun kaldes på `document` objektet. Den leder efter det givne `id` i hele dokumentet.
```

## querySelectorAll [#querySelectorAll]

Den mest fleksible metode, `elem.querySelectorAll(css)` returnerer alle elementer inden for `elem` som matcher den givne CSS-selektor.

Her leder vi efter alle `<li>` elementer som er sidste børn:

```html run
<ul>
  <li>Denne</li>
  <li>test</li>
</ul>
<ul>
  <li>er</li>
  <li>fuldført</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "fuldført"
  }
</script>
```

Denne metode er ret kraftfuld, fordi du kan bruge en hvilken som helst CSS-selektor.

```smart header="Du kan også bruge pseudo-classes"
Pseudo-classes i en CSS selector såsom `:hover` og `:active` understøttes også. For eksempel vil `document.querySelectorAll(':hover')` returnere en samling der indeholder elementer, som markøren er over (i indlejret orden: fra den yderste `<html>` til den mest indlejrede).
```

## querySelector [#querySelector]

Kaldet til `elem.querySelector(css)` returnere det første element med den givne CSS-selektor.

Med andre ord er resultatet det samme som `elem.querySelectorAll(css)[0]`, men det vil kigge efte *alle* elementer og give det første, mens `elem.querySelector` kun kigger efter det første og returnerer det. Så det er både hurtigere at afvikle og skrive.

## matches

De forrige metoder søger i DOM'en.

Metoden [elem.matches(css)](https://dom.spec.whatwg.org/#dom-element-matches) kigger ikke efter noget, det tjekker kun om `elem` matcher den givne CSS-selector. Det returnerer `true` eller `false`.

Metoden kommer i brug, når vi itererer over elementer (som i en liste eller noget lignende) og forsøger at filtrere de elementer, der interesserer os.

For eksempel, hvis vi har en liste af elementer og ønsker at finde dem, der er links til zip-arkiver:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // kan være en hvilken som helst samling i stedet for document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("Referencen til arkivet: " + elem.href );
    }
  }
</script>
```

## closest

*Forfædre* til et element er: forældre, forældren af forældren, etc. De forfædre sammen danner kæden af forældre fra elementet til toppen.

Metoden `elem.closest(css)` leder efter den nærmeste forfader, der matcher CSS-selektoren. `elem` selv er også inkluderet i søgningen.

Med andre ord går metoden `closest` op fra elementet og tjekker hver enkelt forfader. Hvis den matcher selektoren, stopper søgningen, og forfaderen returneres. Hvis ingen forfader matcher, returneres `null`.

For eksempel:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Kapitel 1</li>
    <li class="chapter">Kapitel 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (fordi h1 er ikke en forælder)
is not an ancestor)
</script>
```

## getElementsBy*

Der er også andre metoder til at finde elementer - via tag, class, etc.

De bliver sjældent brugt i dag, da `querySelector` er mere kraftfuld og kortere at skrive.

Så her dækker vi dem hovedsageligt for komplettheden, mens du stadig kan finde dem i gamle scripts.

- `elem.getElementsByTagName(tag)` kigger efter elementer med den givne tag og returnerer en samling med dem. Parameteren `tag` kan også være en stjerne `"*"` for "any tags".
- `elem.getElementsByClassName(className)` returnerer elementer, der har den givne CSS-class.
- `document.getElementsByName(name)` returnerer elementer med den givne `name`-attribut, Søger hele dokumentet og er meget sjældent brugt.

For eksempel:
```js
// hent alle div i dokumentet
let divs = document.getElementsByTagName('div');
```

Lad os finde alle `input` tags inde i tabellen:

```html run height=50
<table id="table">
  <tr>
    <td>Din alder:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> under 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> mellem 18 og 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> over 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Glem ikke bogstavet `\"s\"`!"
Udviklere kan nogle gange glemme bogstavet `"s"`. F. eks. når de forsøger at kalde `getElementByTagName` istedet for <code>getElement<b>s</b>ByTagName</code>.

Når bogstavet `"s"` udelades i `getElementById` returnerer det et enkelt element. Men `getElementsByTagName` returnerer en samling af elementer - så det lille `"s"` i metoden er vigtig.
```

````warn header="Det returnerer en samling, ikke et element!"
En anden udbredt fejl er at skrive:

```js
// virker ikke
document.getElementsByTagName('input').value = 5;
```

Dette vil ikke virke fordi det tager en *samling* af input og tildeler en værdi til den i stedet for elementerne inde i samlingen.

Vi skal enten iterere over samlingen eller pege på et specifikt element i samlingen og tildele værdien til det, sådan her:

```js
// bør virke (hvis der er et input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Her kigges efter `.article` elementer:

```html run height=50
<form name="my-form">
  <div class="article">Artikel</div>
  <div class="long article">Lang artikel</div>
</form>

<script>
  // find via attributten name
  let form = document.getElementsByName('my-form')[0];

  // find via en class inde i formen
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, fandt to elementer med class "article"
</script>
```

## Live samlinger

Alle metoderne `"getElementsBy*"` returnerer en *live* samling. Sådanne samlinger reflekterer altid den nuværende tilstand af dokumentet og opdateres automatisk når det ændres.

I eksemplet herunder er der to scripts.

1. Det første opretter en reference til en samling af `<div>`. Som det er nu er dets længde `1`.
2. Det andet script kører efter at browseren har fundet et tilføjet `<div>`, så dets længde er `2`.

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

Som kontrast til dette så returnerer `querySelectorAll` en *statisk* samling. Her er det en fikseret liste af elementer.

Hvis vi brugte denne metode i stedet, så ville begge scripts outputte `1`:


```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Nu bør det være tydeligt at se forskellen. Den statiske samling øgede ikke sin længde efter det nye `div` blev tilføjet i dokumentet.

## Opsummering

Der er seks hoved-metoder til at finde elementer i DOM'en:

<table>
<thead>
<tr>
<td>Metoder</td>
<td>Søger ved ...</td>
<td>Kan kaldes på et element?</td>
<td>Live?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

Den klart mest fleksible metode er `querySelector` og `querySelectorAll`, men `getElement(s)By*` kan fra tid til anden være nyttige eller findes i gamle scripts.

Derudover finde der:

- metoden `elem.matches(css)` der tjekker om `elem` matcher det givne CSS-selector.
- metoden `elem.closest(css)` der kigger efter den nærmeste forælder, der matcher det givne CSS-selector. Selve `elem` er også med i søgningen.

Og lad os nævne en yderligere metode her til at tjekke for barn-forælder-forhold, da det kan være nyttigt:
-  `elemA.contains(elemB)` returnerer true hvis `elemB` er inde i `elemA` (en efterkommer af `elemA`) eller når `elemA==elemB`.
