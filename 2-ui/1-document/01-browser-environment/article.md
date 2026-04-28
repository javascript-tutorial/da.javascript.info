# Browser miljø, specs

JavaScript blev oprindelig skabt for webbrowsere. Siden da har det udviklet sig til et sprog med mange brugsområder og platforme.

En platform kan være en browser, eller en web-server eller en anden *host*. Den kan endda en "smart" kaffemaskine hvis den kan køre JavaScript. Hver af disse leverer platform-specifik funktionalitet. JavaScript specifikationen kalder det en *host miljø*.

Et host miljø leverer dets egne objekter og funktioner i tilføjelse til sprogkernen. Webbrowsere giver et middel til at kontrollere web sider. Node.js leverer server-side funktioner, og så videre.

Her er et simpelt billede af, hvad vi har, når JavaScript kører i en web browser:

![](windowObjects.svg)

Der er et "root" objekt kaldet `window`. Det har to roller:

1. Det er et globalt objekt for JavaScript kode, som beskrevet i kapitlet <info:global-object>.
2. Det repræsenterer "browser vinduet" og leverer metoder til at kontrollere det.

Vi kan for eksempel bruge det som et globalt objekt, for at definere en global funktion:

```js Kør globalt
function sayHi() {
  alert("Hej!");
}

// globale funktioner er metoder i det globale objekt:
window.sayHi();
```

Og vi kan bruge det som et browser vindue, for at vise vinduets højde:

```js run
alert(window.innerHeight); // indre højde på browser vinduet
```

Der er flere window-specifikke metoder og egenskaber, som vi vil dække senere.

## DOM (Document Object Model)

Document Object Model, ofte bare kaldt DOM, repræsenterer alt indhold på siden der kan ændres.

Objektet `document` er "hoveddøren" til siden. Vi kan ændre eller oprette noget på siden ved hjælp af det.

For eksempel, for at ændre baggrundsfarven på siden, kan vi bruge `document.body.style`:
```js run
// gør baggrundsfarven rød
document.body.style.background = "red";

// nulstil den efter 1 sekund
setTimeout(() => document.body.style.background = "", 1000);
```

Her bruger vi `document.body.style`, men der er mange andre muligheder. Egenskaber og metoder er beskrevet i specificationen for: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM er ikke kun for browseren"
DOM specifikationen forklarer strukturen af et dokument og leverer objekter til at manipulere det. Der er ikke-browser instrumenter som også bruger DOM.

For eksempel, server-side scripts som downloader HTML sider og behandler dem kan også bruge DOM. De kan måske kun supportere en del af specifikationen.
```

```smart header="CSSOM til styling"
Der er også en seperat specifikation, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) for CSS-regler og stylesheets, som forklarer, hvordan de repræsenteres som objekter, og hvordan man læser og skriver dem.

CSSOM bruges sammen med DOM, når vi ændrer style-regler for dokumentet. I praksis er CSSOM dog sjældent nødvendigt, fordi vi sjælden har brug for at ændre CSS-regler fra JavaScript. For det meste tilføjer eller fjerner vi bare CSS-klasser. Kun i sjældne tilfælde ændrer vi CSS-regler, men det er muligt.
```

## BOM (Browser Object Model)

Browser Object Model (BOM) repræsenterer yderligere objekter leveret af browseren (hostmiljøet) til at arbejde med alt undtagen dokumentet.

For eksempel:

- Objektet [navigator](mdn:api/Window/navigator) leverer baggrundsinformation om browseren ogopretaivsystemet. Det indeholder mange egenskaber, men de to mest kendte er: `navigator.userAgent` -- den aktuelle browser, og `navigator.platform` -- platformen der kører browseren (kan hjælpe med at differentiere mellem Windows/Linux/Mac etc).
- Objektet [location](mdn:api/Window/location) tillader dig at læse den nuværende URL og kan omdirigere browseren til en ny URL.

Her er hvordan vi kan bruge `location`-objektet til at vise den nuværende URL og omdirigere browseren til Wikipedia, hvis brugeren bekræfter det:

```js run
alert(location.href); // Vis den nuværende URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // omdirigere browseren til en ny URL
}
```

Funktionerne `alert/confirm/prompt` er også en del af BOM: de er ikke direkte relaterede til dokumentet, men repræsenterer rene browsermetoder til kommunikation med brugeren.

```smart header="Specifikationer"
BOM er en del af den generelle [HTML specifikation](https://html.spec.whatwg.org).

Ja, du hørte rigtigt. HTML specifikationen fra <https://html.spec.whatwg.org> handler ikke kun om "HTML sproget" (tags, attributter, etc), men dækker også over en stor bunke objekter, metoder og browser-specifikke DOM-udvidelser. Det er "HTML i bred betydning". Desuden har nogle dele yderligere specifikationer opført andre steder på <https://spec.whatwg.org>.
```

## Opsummering

Når vi taler om standarder, så har vi:

DOM specifikationen
: Beskriver strukturen af et dokument, manipulation af den og hændelser (events), se <https://dom.spec.whatwg.org>.

CSSOM specifikation
: Beskriver stylesheet og regler for styling, manipulation af dem, og deres binding til dokumenter, se <https://www.w3.org/TR/cssom-1/>.

HTML specifikation
: Beskriver HTML sproget (f.eks. tags) og også BOM (browser object model) -- forskellige browserfunktioner: `setTimeout`, `alert`, `location` og så videre, se <https://html.spec.whatwg.org>. Den tager DOM specifikationen og udvider den med mange yderligere egenskaber og metoder.

Ud over disse specifikationer er der også flere klasser beskrevet separat på <https://spec.whatwg.org/>.

Gem disse links, da der er så meget at lære og det er umuligt at dække eller huske det hele.

Når du vil læse om en egenskab eller en metode, er Mozilla manualen på <https://developer.mozilla.org/en-US/> også en god ressource. Du kan starte med den, men den tilsvarende spec kan nogle gange være bedre for den øvede. Den er mere kompleks og længere at læse, men vil gøre din fundamentale viden komplet.

For at finde noget, er det ofte praktisk at bruge en internet søgning "WHATWG [term]" eller "MDN [term]", f.eks <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Nu er det tid til at lære DOM nærmere at kende, fordi dokumentet spiller en central rolle i UI.