# Funktioner

Meget ofte har vi brug for at udføre en lignende handling mange steder i scriptet.

For eksempel har vi brug for at vise en pæn besked, når en besøgende logger ind, logger ud og måske et andet sted.

Funktioner er programmets vigtigste "byggesten". De tillader, at koden kan kaldes mange gange uden gentagelse.

Vi har allerede set eksempler på indbyggede funktioner, som `alert(message)`, `prompt(message, default)` og `confirm(question)`. Men vi kan også oprette vores egne funktioner.

## Funktionsdeklaration

For at oprette en funktion kan vi bruge en *funktionsdeklaration*.

Det ser sådan ud:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

Nøgleordet `function` kommer først, derefter navnet på funktionen, så en liste af parametre mellem parenteserne (kommasepareret, tom i eksemplet ovenfor, vi vil se eksempler senere) og til sidst koden i funktionen, også kaldet "funktionskroppen", mellem krøllede parenteser.

```js
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

Vores nye funktion kan kaldes ved sit navn: `showMessage()`.

For eksempel:

```js run
function showMessage() {
  alert( 'Hej allesammen!' );
}

*!*
showMessage();
showMessage();
*/!*
```

Kaldet `showMessage()` udfører koden i funktionen. Her vil vi se beskeden to gange.

Dette eksempel demonstrerer tydeligt et af hovedformålene med funktioner: at undgå kodegentagelse.

Hvis vi nogensinde har brug for at ændre beskeden eller måden den vises på, er det nok at ændre koden ét sted: funktionen, der viser den.

## Lokale variabler

En variabel, der er erklæret inde i en funktion, er kun synlig inde i den funktion.

For eksempel:

```js run
function showMessage() {
*!*
  let message = "Hej, jeg er JavaScript!"; // lokal variabel
*/!*

  alert( message );
}

showMessage(); // Hej, jeg er JavaScript!

alert( message ); // <-- Fejl! Variablen er lokal for funktionen
```

## Ydre variabler

En funktion kan også få adgang til en ydre variabel, for eksempel:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hej, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hej, John
```

Funktionen har fuld adgang til den ydre variabel. Den kan også ændre den.

For eksempel:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) ændrede den ydre variabel

  let message = 'Hej, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* før funktionenskaldet

showMessage();

alert( userName ); // *!*Bob*/!*, værdien blev ændret af funktionen
```

Den ydre variabel bruges kun, hvis der ikke findes en lokal med samme navn.

Hvis en variabel med samme navn erklæres inde i funktionen, så *overskygger* den den ydre. For eksempel, i koden nedenfor bruger funktionen den lokale `userName`. Den ydre ignoreres:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // erklær en lokal variabel
*/!*

  let message = 'Hej, ' + userName; // *!*Bob*/!*
  alert(message);
}

// Funktionen vil oprette og bruge sin egen lokale userName
showMessage();

alert( userName ); // *!*John*/!*, uændret, funktionen tilgik ikke den ydre variabel
```

```smart header="Globale variabler"
Variabler erklæret uden for en funktion, som den ydre `userName` i koden ovenfor, kaldes *globale*.

Globale variabler er synlige fra enhver funktion (medmindre de overskygges af lokale).

Det er en god praksis at minimere brugen af globale variabler. Moderne kode har få eller ingen globale. De fleste variabler befinder sig i deres funktioner. Nogle gange kan de dog være nyttige til at gemme data på projekt-niveau.
```

## Parametre og argumenter

Vi kan sende vilkårlige data til funktioner ved hjælp af parametre.

I eksemplet nedenfor har funktionen to parametre: `from` og `text`.

```js run
function showMessage(*!*from, text*/!*) { // parametre: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Hello!');*/!* // Ann: Hello! (*)
*!*showMessage('Ann', "What's up?");*/!* // Ann: What's up? (**)
```

Når funktionen kaldes i linjerne `(*)` og `(**)`, kopieres de givne værdier til lokale variabler `from` og `text`. Derefter bruger funktionen dem.

Her er et eksempel mere: vi har en variabel `from` og sender den til funktionen. Bemærk venligst: funktionen ændrer `from`, men ændringen ses ikke udenfor, fordi en funktion altid får en kopi af værdien:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // gør "from" pænere
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

Når en værdi sendes som en funktionsparameter, kaldes den et *argument*.

Med andre ord, for at gøre disse termer klare:

- En parameter er variablen, der er angivet inde i parenteserne i funktionsdeklarationen (det er en deklarationstidsterm).
- Et argument er den værdi, der sendes til funktionen, når den kaldes (det er en kaldetidsterm).

Vi erklærer funktioner ved at liste deres parametre, og kalder dem derefter ved at sende argumenter.

I eksemplet ovenfor kan man sige: "funktionen `showMessage` erklæres med to parametre, og kaldes derefter med to argumenter: `from` og `"Hello"`".


## Standardværdier

Hvis en funktion kaldes, men et argument ikke gives, bliver den tilsvarende værdi `undefined`.

For eksempel kan den førnævnte funktion `showMessage(from, text)` kaldes med et enkelt argument:

```js
showMessage("Ann");
```

Dette er ikke en fejl. Et sådant kald ville give outputtet `"*Ann*: undefined"`. Da værdien for `text` ikke er givet, bliver den `undefined`.

Vi kan angive den såkaldte "standard" (som bruges hvis udeladt) værdi for en parameter i funktionsdeklarationen ved hjælp af `=`:

```js run
function showMessage(from, *!*text = "ingen tekst givet"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: ingen tekst givet
```

Hvis `text`-parameteren ikke gives, får den værdien `"ingen tekst givet"`.

Standardværdien træder også i kraft, hvis parameteren eksisterer, men er strengt lig med `undefined`, som dette:

```js
showMessage("Ann", undefined); // Ann: ingen tekst givet
```

Her er `"ingen tekst givet"` en streng, men det kan være et mere komplekst udtryk, som kun evalueres og tildeles, hvis parameteren mangler. Så dette er også muligt:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() kaldes kun, hvis der ikke gives tekst
  // dens resultat bliver værdien af text
}
```

```smart header="Evaluering af standardparametre"
I JavaScript evalueres en standardparameter hver gang funktionen kaldes uden den respektive parameter.

I eksemplet ovenfor kaldes `anotherFunction()` slet ikke, hvis `text`-parameteren gives.

På den anden side kaldes den uafhængigt hver gang, når `text` mangler.
```

````smart header="Standardværdier i gammel JavaScript-kode"
For flere år siden understøttede JavaScript ikke syntaksen for standardværdier. Så folk brugte andre måder til at angive dem på.

I dag kan vi stadig støde på dem i gamle scripts.

For eksempel, en eksplicit kontrol for `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'ingen tekst givet';
  }
*/!*

  alert( from + ": " + text );
}
```

...Eller ved at bruge `||` operatoren:

```js
function showMessage(from, text) {
  // Hvis værdien af text er falsk, tildel standardværdien
  // dette antager, at text == "" er det samme som ingen tekst overhovedet
  text = text || 'ingen tekst givet';
  ...
}
```
````


### Alternative standardværdier for parametre

Nogle gange giver det mening at tildele standardværdier til parametre på et senere tidspunkt efter funktionsdeklarationen.

Vi kan kontrollere, om argumentet er givet under funktionsudførelsen, ved at sammenligne den med `undefined`:

```js run
function showMessage(text) {
  // ...

  if (text === undefined) { // hvis argumentet mangler
    text = 'tom besked';
  }
*/!*

  alert(text);
}

showMessage(); // tom besked
```

...Eller vi kunne bruge `||` operatoren:

```js
function showMessage(text) {
  // hvis text er undefined eller på anden måde falsk, sæt den til 'tom'
  text = text || 'tom';
  ...
}
```

Moderne JavaScript motorer understøtter [nullish coalescing operator](info:nullish-coalescing-operator) `??`, det er bedre, når de fleste falske værdier, såsom `0`, skal betragtes som "normale":

```js run
function showCount(count) {
  // hvis count er undefined eller null, vis "ukendt"
  alert(count ?? "ukendt");
}

showCount(0); // 0
showCount(null); // ukendt
showCount(); // ukendt
```

## Returnering af en værdi

En funktion kan returnere en værdi tilbage til den kaldende kode som resultatet.

Det simpleste eksempel ville være en funktion, der summerer to værdier:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

Direktivet `return` kan være placeret hvor som helst i funktionen. Når udførelsen når det, stopper funktionen, og værdien returneres til den kaldende kode (tildelt til `result` ovenfor).

Der kan være mange forekomster af `return` i en enkelt funktion. For eksempel:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Har du tilladelse fra dine forældre?');
*/!*
  }
}

let age = prompt('Hvor gammel er du?', 18);

if ( checkAge(age) ) {
  alert( 'Adgang givet' );
} else {
  alert( 'Adgang nægtet' );
}
```

Det er muligt at bruge `return` uden en værdi. Det får funktionen til at afslutte øjeblikkeligt.

For example:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Viser filmen" ); // (*)
  // ...
}
```

I koden ovenfor, hvis `checkAge(age)` returnerer `false`, så vil `showMovie` ikke fortsætte til `alert`.

````smart header="En funktion med en tom `return` eller uden den returnerer `undefined`"
Hvis en funktion ikke returnerer en værdi, er det det samme som om den returnerer `undefined`:

```js run
function doNothing() { /* tom */ }

alert( doNothing() === undefined ); // true
```

En tom `return` er også det samme som `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Tilføj aldrig et linjeskift mellem `return` og værdien"
Hvis du har et langt udtryk i `return`, kan det være fristende at placere det på en separat linje, som dette:

```js
return
 (et + langt + udtryk + eller + hvad + som + helst * f(a) + f(b))
```
Det virker ikke, fordi JavaScript antager et semikolon efter `return`. Det vil fungere på samme måde som:

```js
return;
 (et + langt + udtryk + eller + hvad + som + helst * f(a) + f(b));
```

Så det opfattes som en tom return.

Hvis vi ønsker, at det returnerede udtryk skal strække sig over flere linjer, bør vi starte det på samme linje som `return`. Eller i det mindste placere den åbne parentes der som følger:

```js
return (
  et + langt + udtryk
  + eller +
  hvad + som + helst * f(a) + f(b)
  )
```
det vil fungere præcis som forventet.
````

## Navngivning af en funktion [#function-naming]

Funktioner er handlinger. Derfor er deres navn som regel et verbum. Det bør være kort, så præcist som muligt og beskrive, hvad funktionen gør, så en person, der læser koden, får en idé om, hvad funktionen gør.

Det er en udbredt praksis at starte en funktion med et verbalt præfiks, der vagt beskriver handlingen. Der skal være en aftale inden for teamet om betydningen af præfikserne.

For eksempel viser funktioner, der starter med `"show"`, som regel noget.
Funktioner, der starter med...

- `"get…"` -- returnere en værdi,
- `"calc…"` -- beregner noget,
- `"create…"` -- opretter noget,
- `"check…"` -- kontrollerer noget og returnerer en boolean, osv.

Eksempler på sådanne navne:

```js no-beautify
showMessage(..)     // viser en besked
getAge(..)          // returnerer alderen (henter den på en eller anden måde)
calcSum(..)         // beregner en sum og returnerer resultatet
createForm(..)      // opretter en formular (og returnerer den som regel)
checkPermission(..) // kontrollerer en tilladelse, returnerer true/false
```

Med præfikser på plads giver et hurtigt blik på et funktionsnavn en forståelse af, hvilken slags arbejde det udfører, og hvilken slags værdi det returnerer.

```smart header="En funktion -- en handling"
En funktion bør gøre præcis det, som dens navn antyder, ikke mere.

To uafhængige handlinger fortjener som regel to funktioner, selvom de ofte kaldes sammen (i så fald kan vi lave en tredje funktion, der kalder de to andre).

Nogle eksempler på at bryde denne regel:

- `getAge` -- ville være dårligt, hvis den viser en `alert` med alderen (bør kun hente).
- `createForm` -- ville være dårligt, hvis den ændrer dokumentet ved at tilføje en formular (bør kun oprette den og returnere).
- `checkPermission` -- ville være dårligt, hvis den viser beskeden `adgang givet/afvist` (bør kun udføre kontrollen og returnere resultatet).

Disse eksempler antager almindelige betydninger af præfikser. Du og dit team er frie til at blive enige om andre betydninger, men som regel er de ikke meget forskellige. Under alle omstændigheder bør du have en fast forståelse af, hvad et præfiks betyder, hvad en præfikset funktion kan og ikke kan gøre. Alle funktioner med samme præfiks bør overholde reglerne. Og teamet bør dele denne viden.
```

```smart header="Ultrakorte funktionsnavne"
Funktioner, der bruges *meget ofte*, har nogle gange ultrakorte navne.

For eksempel definerer [jQuery](https://jquery.com/) frameworket en funktion med `$`. [Lodash](https://lodash.com/) biblioteket har sin kernefunktion navngivet `_`.

Disse er undtagelser. Generelt bør funktionsnavne være korte og beskrivende.
```

## Funktioner == Kommentarer

Funktioner bør være korte og gøre præcis én ting. Hvis den ting er stor, kan det være værd at opdele funktionen i nogle få mindre funktioner. Nogle gange er det ikke så let at følge denne regel, men det er bestemt en god ting at bestræbe sig på.

En separat funktion er ikke kun nemmere at teste og fejlfinde – dens eksistens er også en fremragende kommentar!

For eksempel, sammenlign de to funktioner `showPrimes(n)` nedenfor. Hver af dem udskriver [primtal](https://en.wikipedia.org/wiki/Prime_number) op til `n`.

Den første variant bruger en label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // et primtal
  }
}
```

Den anden variant bruger en ekstra funktion `isPrime(n)` til at teste for primalitet:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // et primtal
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

Den anden variant er nemmere at forstå, ikke sandt? I stedet for et stykke kode ser vi et navn på handlingen (`isPrime`). Nogle gange omtaler folk sådan kode som *selvbeskrivende*.

Så funktioner kan oprettes, selvom vi ikke har til hensigt at genbruge dem. De er også med til at strukturere koden og gøre den læsbar.

## Opsummering

En funktionsdeklaration ser sådan ud:

```js
function name(parametre, adskilt, med, komma) {
  /* kode */
}
```

- Værdier, der sendes til en funktion som argumenter, kopieres til dens lokale variabler.
- En funktion kan få adgang til ydre variable. Men det virker kun indefra og ud. Koden uden for funktionen ser ikke dens lokale variabler.
- En funktion kan returnere en værdi. Hvis den ikke gør det, er resultatet `undefined`.

For at gøre koden ren og let at forstå, anbefales det at bruge hovedsageligt lokale variabler og parametre i funktionen, ikke ydre variabler.

Det er altid nemmere at forstå en funktion, der får argumenter, arbejder med dem og returnerer et resultat, end en funktion, der ikke får parametre, men ændrer ydre variabler som en bivirkning.

Navngivning af funktioner:

- Et navn bør klart beskrive, hvad funktionen gør. Når vi ser et funktionskald i koden, giver et godt navn os straks en forståelse af, hvad det gør og returnerer.
- En funktion er en handling, så funktionsnavne er normalt verbale.
- Der findes mange velkendte funktionspræfikser som `create…`, `show…`, `get…`, `check…` og så videre. Brug dem til at antyde, hvad en funktion gør.

Funktioner er hovedbyggestenene i scripts. Nu hvor vi har dækket det grundlæggende, kan vi faktisk begynde at oprette og bruge dem. Men det er kun begyndelsen på vejen. Vi vil vende tilbage til dem mange gange og gå mere i dybden med deres avancerede funktioner.
