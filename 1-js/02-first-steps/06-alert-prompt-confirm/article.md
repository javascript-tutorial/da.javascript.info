# Interaktion: alert, prompt, confirm

Eftersom vi vil bruge en browser som mål i vores udviklingsmiljø, kan det være godt at se et par funktioner, der bruges til at interagere med brugeren: `alert`, `prompt` og `confirm`.

## alert

Denne her har du allerede set. Den viser en besked og venter på, at brugeren trykker "OK".

For eksempel:

```js run
alert("Hallo");
```

Mini-vinduet med beskeden kaldes et *modalt vindue*. Ordet "modal" betyder, at brugeren ikke kan interagere med resten af siden, trykke på knapper etc, før de har håndteret vinduet. I dette tilfælde, før de har trykket på "OK".

## prompt

Funktionen `prompt` accepterer to argumenter:

```js no-beautify
result = prompt(title, [default]);
```

Den viser et modalt vindue med en tekstbesked, et inputfelt og knapperne OK og Cancel (fortryd).

`title`
: Den tekst der vises til brugeren.

`default`
: En frivillig anden parameter er hvilken tekst der skal stå som standard i inputfeltet.

```smart header="De hårde paranteser i en syntaks `[...]`"
De hårde paranteser omkring `default` i syntaksen betyder, at parameteren er frivillig og derfor kan udelades.
```

Brugeren kan skrive noget i promptens inputefelt og trykke på OK. Teksten bliver derved overført til variablen `result`. De kan også fortryde deres input ved at trykke Cancel eller trykke på `key:Esc`. I det tilfælde vil datatypen `null` overføres til `result`.

Et kald til `prompt` returnerer enten teksten fra inputfeltet eller `null` hvis brugeren fortryder.

For eksempel:

```js run
let age = prompt('Hvor gammel er du?', 100);

alert(`Du er ${age} år gammel!`); // Du er 100 år gammel!
```

````warn header="I IE: Skriv altid en `default`"
Anden parameter er frivillig men, hvis du ikke skriver den vil Internet Exlporer sætte teksten `"undefined"` ind i prompten.

Kør denne kode i Internet Exlporer for at se et eksempel:

```js run
let test = prompt("Test");
```

Så, for at din prompt skal se ordentlig ud i IE anbefales det, altid at skrive det andet argument:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

Syntaksen ser således ud:

```js
result = confirm(question);
```

Funktionen `confirm` viser et modalt vindue med et `spørgsmål` og to knapper: OK og Cancel.

result bliver `true` hvis der trykkes på OK og ellers `false`.

For eksempel:

```js run
let isBoss = confirm("Er du chefen?");

alert( isBoss ); // true hvis der trykkes på OK
```

## Opsummering

Du har set tre browser-specifikke funktioner til at interagere med brugere:

`alert`
: viser en besked.

`prompt`
: viser en besked og beder brugeren om at skrive input tekst. Den returnerer teksten eller `null`hvis der trykkes på Cancel eller `key:Esc`

`confirm`
: viser en besked og venter på, atbrugeren trykker "OK" eller "Cancel". Den returnerer `true` hvis der trykkes OK og `false` hvis der trykkes Cancel eller `key:Esc`.

Alle disse funktioner er modale: De pauser udførelsen af dit script og tillader ikke brugeren at interagere med resten af siden indtil arbejdet med vinduet er afsluttet.

Der er to begrænsninger der deles af alle metoderne ovenfor:

1. Den præcise placering af vinduet bestemmes af browseren. Normalt vil det være i midten.
2. Udseendet af vinduet er også bestemt af browseren og du har ikke nogen nem måde at ændre det på.

Dette er prisen for den simple adgang. Der er metoder til at vise pænere vinduer med mere mulighed for interaktion med brugeren. Men, hvis "bling og glimmer" ikke betyder så meget er disse metoder ret effektive.
