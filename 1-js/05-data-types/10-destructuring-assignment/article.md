# Deestrukturering

De to mest brugte datastrukturer i JavaScript er `Object` og `Array`.

- Objekter tillader os at skabe en enkelt enhed, der gemmer dataelementer efter nøgle.
- Arrays tillader os at samle dataelementer i en ordnet liste.

Men når vi sender disse til en funktion, har vi måske ikke brug for det hele. Funktionen kan kun have brug for visse elementer eller egenskaber.

*Destrukturering tildeling* er en speciel syntaks, der tillader os at "pakke" arrays eller objekter ud i en bunke variabler, da det nogle gange er mere bekvemt.

Destrukturering fungerer også godt med komplekse funktioner, der har mange parametre, standardværdier osv. Det vil vi snart se.

## Array destrukturering

Her er et eksempel på, hvordan et array destruktureres til variabler:

```js
// vi har et array med et navn og efternavn
let arr = ["John", "Smith"]

*!*
// destrukturering tildeling
// sætter firstName = arr[0]
// og surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Nu kan vi arbejde med variabler i stedet for medlemmer af et array.

Det ser godt ud, når det kombineres med `split` eller andre metoder, der returnerer arrays:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

Som du kan se, er syntaksen enkel. Der er dog flere særlige detaljer. Lad os se flere eksempler for at forstå det bedre.

````smart header="\"Destrukturering\" betyder ikke \"destruktiv\"."
Det kaldes "destruktureringstildeling", fordi det "destrukturerer" ved at kopiere elementer til variabler. Dog ændres arrayet selv ikke.

Det er en kortere måde at skrive dette på:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ignorer elementer ved hjælp af kommaer"
Elementer du ikke skal bruge kan også kasseres ved hjælp af et ekstra komma:

```js run
*!*
// andet element er ikke nødvendigt, så det er bare et ekstra komma
let [firstName, , title] = ["Julius", "Cæsar", "Konsul", "af den Romerske Republik"];
*/!*

alert( title ); // Konsul
```

I koden ovenfor bliver det andet element i arrayet sprunget over, det tredje tildeles til `title`, og resten af arrayets elementer bliver også sprunget over (da der ikke er nogen variabler til dem).
````

````smart header="Virker med ethvert itererbart objekt på højre side"

...Faktisk kan vi bruge det med ethvert itererbart objekt, ikke kun arrays:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
Det virker fordi tildeling gennem destrukturering itererer over værdien til højre. Det er en slags syntaktisk sukker for at kalde `for..of` over værdien til højre for `=` og tildele værdierne.
````


````smart header="Tildel til hvad som helst på venstre side"
Vi kan bruge ethvert "tildelbar" element på venstre side.

For eksempel en objekt-egenskab:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="Gennemløb med .entries()"
I det forrige kapitel så vi [Object.entries(obj)](mdn:js/Object/entries) metoden.

Vi kan bruge det med destrukturering til at gennemløbe nøgler og værdier i et objekt:

```js run
let user = {
  name: "John",
  age: 30
};

// Gennemløb over nøgler og værdier
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, derefter age:30
}
```

Den lignende kode for en `Map` er enklere, da den er itererbar:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map itererer som [key, value] par, meget praktisk for destrukturering
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, derefter age:30
}
```
````

````smart header="Ombyt variabler trick'et"
Der er et velkendt trick til at bytte værdierne af to variabler ved hjælp af en destruktureringsopgave:

```js run
let guest = "Jane";
let admin = "Pete";

// Lad os bytte værdierne: gør guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (byttet om uden besvær!)
```

Her opretter vi et midlertidigt array af to variabler og destrukturerer så der er byttet om på dem.

Vi kan bytte mere end to variabler på denne måde.
````

### rest parameteren '...'

Normalt, hvis et array er længere end listen på venstre side, bliver de "ekstra" elementer udeladt.

For eksempel, her tages kun to elementer, og resten ignoreres:

```js run
let [name1, name2] = ["Julius", "Cæsar", "Konsul", "af den Romerske Republik"];

alert(name1); // Julius
alert(name2); // Cæsar
// Resten af elementerne bliver ikke tildelt noget sted
```

Hvis vi vil indsamle alt det følgende -- vi kan tilføje en parameter, der får "resten" ved hjælp af tre prikker `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Cæsar", "Konsul", "af den Romerske Republik"];

*!*
// `rest` er et array af elementer, startende fra det tredje element
alert(rest[0]); // Konsul
alert(rest[1]); // af den Romerske Republik
alert(rest.length); // 2
*/!*
```

Værdien af `rest` er et array af de resterende array-elementer.

Vi kan bruge hvilken som helst anden variabelnavn i stedet for `rest`, bare sørg for at det har tre prikker før det og står sidst i destruktureringsopgaven.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Cæsar", "Konsul", "af den Romerske Republik"];
// nu indeholder titles = ["Konsul", "af den Romerske Republik"]
```

### Standardværdier

Hvis det givne array er kortere end listen af variabler på venstre side, vil der ikke være nogen fejl. Manglende værdier betragtes som `undefined`:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Hvis vi vil have standardværdier i stedet for `undefined`, kan vi bruge `=`:

```js run
*!*
// default values
let [name = "Gæst", surname = "Anonym"] = ["Julius"];
*/!*

alert(name);    // Julius (fra array)
alert(surname); // Anonym (standardværdi brugt)
```

Standardværdier kan være mere komplekse udtryk eller endda funktion kald. De evalueres kun hvis værdien ikke er tilgængelig.

For eksempel, her bruger vi `prompt` funktionen for to standardværdier:

```js run
// runs only prompt for surname
let [name = prompt('navn?'), surname = prompt('efternavn?')] = ["Julius"];

alert(name);    // Julius (fra array)
alert(surname); // Hvad end du modtager fra propmt, fordi det ikke er i arrayet
```

Bemærk at `prompt` vil kun køre for den manglende værdi (`surname`).

## Destrukturering af objekt

Tildeling gennem destrukturering virker også med objekter.

Den grundlæggende syntaks er:

```js
let {var1, var2} = {var1:…, var2:…}
```

Vi skal have et eksisterende objekt på højre side, som vi vil opdele i variabler. Venstre side indeholder et objekt-lignende "mønster" for de tilsvarende egenskaber. I det enkleste tilfælde er det en liste af variabelnavne i `{...}`.

For eksempel:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Egenskaberne `options.title`, `options.width` og `options.height` bliver tildelt til de tilsvarende variable.

Rækkefølgen er ligegyldig. Dette virker også:

```js
// ændret rækkefølge i let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Venstre side kan være mere komplekse og specificere mapping mellem egenskaber og variabler.

Hvis vi vil tildele en egenskab til en variabel med et andet navn, for eksempel, gør `options.width` til variablen `w`, så kan vi sætte variabelnavnet ved hjælp af kolon:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { kildesEgenskab: målVariabel }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Kolonet viser "det her : skal her". I eksemplet ovenfor sendes egenskaben `width` il variablen `w`, egenskaben `height` sendes til `h` og `title` forbliver det samme navn.

For potentielt manglende egenskaber kan vi sætte standardværdier ved hjælp af `"="`, som dette:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

På samme måde som med parametre til array og funktioner, kan standardværdier være hvilket som helst udtryk eller endda funktion kald. De evalueres kun hvis værdien ikke er tilgængelig.

I koden under vil `prompt` spørge efter en værdi til `width`, men ikke til `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (hvad end resultatet af prompt er)
```

Vi kan  også kombinere både kolon og lighedstegn for at tildele en egenskab til en variabel med et andet navn og samtidig sætte en standardværdi:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Hvis vi har et komplekst objekt med mange egenskaber, kan vi kun trække de egenskaber, vi har brug for:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// Udtræk kun title som variabel
let { title } = options;

alert(title); // Menu
```

### rest parameteren "..."

Hvad hvis objektet har flere egenskaber end vi har variable? Kan vi tage nogle og så tildele "resten" et sted?

Vi kan bruge parameteren rest, lige som vi gjorde med arrays. Muligheden er ikke undestøttet af gamle browsere, men virker fint i nyere.

Det ser således ud:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = Egenskab kaldet title
// rest = objekt kaldet rest med resten af egenskaberne
let {title, ...rest} = options;
*/!*

// nu er title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Detalje, hvis der ikke er noget`let`"
I eksemplet ovenfor bliver variablene deklareret samtidig med at de tildeles værdi: `let {…} = {…}`. Vi kan selfølgelig bruge eksisterende variable også, uden `let`. Men der er en lille detalje du skal være opmærksom på.

Dette vil ikke virke:
```js run
let title, width, height;

// Fejl i denne linje
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

Problemet er at JavaScript behandler `{...}` i kodens hovedflow (ikke inde i andre udtryk) som en kodeblok. Sådan en kodeblok kan bruges til at gruppere udsagn, som dette:

```js run
{
  // en kodeblok
  let message = "Hej!";
  // ...
  alert( message );
}
```

Så her vil JavaScript antage at vi har en kodeblok - derfor er der er en fejl. Vi vil have destructuring i stedet.

For at vise JavaScript at det ikke er en kodeblok, kan vi indkapsle udtrykket med parenteser `(...)`:

```js run
let title, width, height;

// okay nu
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Indlejret destrukturering

Hvis et objekt eller et array indeholder andre indlejrede objekter og arrays, kan vi bruge mere komplekse venstre side mønstre til at trække dybere dele ud.

I koden nedenfor har `options` et andet objekt i egenskaben `size` og et array i egenskaben `items`. Mønsteret på venstre side af tildelingsudtrykket har samme struktur som bruges til at trække værdier ud af dem:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// destrukturering splittet i flere linjer for tydelighed
let {
  size: { // put size her, så vi kan få
    width,
    height
  },
  items: [item1, item2], // tildel items her
  title = "Menu" // hvis det ikke findes, så brug standardværdi
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

Alle egenegenskaberne i `options` objektet undtagen `extra` som ikke findes i venstre side, er tildelt til tilsvarende variabler:

![](destructuring-complex.svg)

Endelig har vi `width`, `height`, `item1`, `item2` og `title` fra standardværdierne.

Bemærk at der ikke er variable for `size` og `items`, da vi tager deres indhold i stedet.

## Smarte parametre til funktioner

Der er situationer hvor en funktione er nødt til at have mulighed for mange parametre men hvor de fleste er frivillige. Det kan f.eks. være i forbindelse med brugerinterfaces. Forestil dig en funktion der opretter en menu. Den kan have en bredde, en højde, en titel, en liste af elementer og så videre.

Her er en mindre god måde at skrive sådan en funktion:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

I virkeligheden er problemet hvordan man husker rækkefølgen af argumenter. Ofte hjælper IDE'er os, især hvis koden er godt dokumenteret, men stadig... Et andet problem er hvordan man kalder en funktion når de fleste parametre er ok med standardværdier.

Som dette?

```js
// undefined hvor standardværdierne er fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Det er uholdbart. Og bliver ulæselig når vi har mange parametre.

Destrukturering kommer til hjælp!

Vi kan overføre parametre som et objekt, og funktionen destrukturerer dem med det samme til variable:

```js run
// vi overfører objektet til funktionen
let options = {
  title: "Min menu",
  items: ["Item1", "Item2"]
};

// ...og det bliver med det samme trukket ud til variable
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – tages fra options,
  // width, height – standard brugt
  alert( `${title} ${width} ${height}` ); // Min Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Vi kan også bruge mere komplekse destruktureringsmønstre med indlejrede objekter og kolon-mapping:

```js run
let options = {
  title: "Min menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width sendes til w
  height: h = 200, // height sendes til h
  items: [item1, item2] // items første element sendes til item1, anden sendes til item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // Min Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

Den fulde syntaks er den samme som for en destrukturerings-tilordning:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

For et objekt med parametre vil der være en variabel `varName` for egenskaben `incomingProperty`, med `defaultValue` som standardværdi.

Bemærk at destruktureringsmønstre som dette antager at `showMenu()` har et argument. Hvis vi ønsker alle værdier som standard, så skal vi specificere et tomt objekt:

```js
showMenu({}); // ok, alle værdier er standard

showMenu(); // dette vil resultere i en fejl
```

Vi kan fixe dette ved at gøre `{}` til standardværdien for hele objektet med parametre:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

I koden ovenfor er hele objektet med argumenter `{}` som standardværdi, så der er altid noget at destrukturerer.

## Opsummering

- Destrukturering tillader øjeblikkelig mapping af et objekt eller array til mange variable.
- Den fulde objektsyntaks:
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    Dette betyder at egenskaben `prop` skal sendes til variablen `varName`, og hvis der ikke findes en sådan egenskab, så skal standardværdien bruges.

    Objektegenskaber som ikke har nogen mapping kopieres til objektet `rest`.

- Den fulde fulde syntaks for arrya er:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

    Det første element sendes til `item1`; det andet element sendes til `item2`, og alt det resterende laves til arrayet `rest`.

- Det er muligt at hente data fra indlejrede arrays/objekter. Her skal venstre side have samme struktur som det højre side.
