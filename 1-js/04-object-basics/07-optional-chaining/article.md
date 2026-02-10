
# Valgfri sammenkædning '?.'

[recent browser="new"]

Den valgfrie sammenkædning `?.` er en sikker måde at få adgang til indlejrede objekt-egenskaber på, selvom en mellemliggende egenskab ikke eksisterer.

## Problemet med "ikke-eksisterende egenskaber"

Hvis du lige er begyndt at læse vejledningen og lære JavaScript, har problemet måske ikke ramt dig endnu, men det er ret almindeligt.

Som et eksempel, lad os sige, at vi har `user`-objekter, der indeholder oplysninger om vores brugere.

De fleste af vores brugere har adresser i `user.address`-egenskaben, med gaden `user.address.street`, men nogle har ikke angivet dem.

I så fald, når vi forsøger at få `user.address.street`, og brugeren tilfældigvis ikke har en adresse, får vi en fejl:

```js run
let user = {}; // en bruger uden "address"-egenskab

alert(user.address.street); // Fejl!
```

Det er det forventede resultat. JavaScript fungerer sådan. Da `user.address` er `undefined`, mislykkes et forsøg på at få `user.address.street` med en fejl.

I mange praktiske tilfælde foretrækker vi at få `undefined` i stedet for en fejl her (betydende "ingen gade").

...og et andet eksempel. I webudvikling kan vi få et objekt, der svarer til et websideelement ved hjælp af et specielt metodekald, såsom `document.querySelector('.elem')`, og det returnerer `null`, når der ikke er et sådant element.

```js run
// document.querySelector('.elem') er null, hvis der ikke er et element
let html = document.querySelector('.elem').innerHTML; // fejl, hvis det er null
```

Hvis elementet ikke findes, får vi en fejl, når vi forsøger at få adgang til `.innerHTML`-egenskaben af `null`. Og i nogle tilfælde, når fraværet af elementet er normalt, vil vi gerne undgå fejlen og blot acceptere `html = null` som resultatet.

Hvordan kan vi gøre dette?

Den oplagte løsning ville være at tjekke værdien ved hjælp af `if` eller den betingede operator `?`, før vi får adgang til dens egenskab, sådan her:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

Det virker, der er ingen fejl... Men det er ret upraktisk. Som du kan se, optræder `"user.address"` to gange i koden.

Her er hvordan det samme ville se ud for `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

Vi kan se, at element-søgningen `document.querySelector('.elem')` faktisk kaldes to gange her. Ikke godt.

For mere dybt indlejrede egenskaber bliver det endnu grimmere, da flere gentagelser er nødvendige.

F.eks. lad os få `user.address.street.name` på en lignende måde.

```js
let user = {}; // user har ingen adresse

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

Det er skrækkeligt!. Flere kan endda have problemer med bare at forstå sådan kode.

Der er en lidt bedre måde at skrive det på ved hjælp af `&&`-operatoren:

```js run
let user = {}; // user har ingen adresse

alert( user.address && user.address.street && user.address.street.name ); // undefined (ingen fejl)
```

At "AND'e" hele stien til egenskaben sikrer, at alle komponenter eksisterer (hvis ikke, stopper evalueringen), men det er heller ikke ideelt.

Som du kan se, optræder egenskabsnavne stadig flere gange i koden. F.eks. i koden ovenfor optræder `user.address` tre gange.

Derfor blev den valgfrie kædning `?.` tilføjet til sproget. For at løse dette problem én gang for alle!

## Valgfri kædning

Den valgfrie kædning `?.` stopper evalueringen, hvis værdien før `?.` er `undefined` eller `null` og returnerer `undefined`.

**Fremover i denne artikel, for korthedens skyld, vil vi sige, at noget "eksisterer", hvis det ikke er `null` og ikke `undefined`.**

Med andre ord, `value?.prop`:
- fungerer som `value.prop`, hvis `value` eksisterer,
- ellers (når `value` er `undefined/null`) returnerer det `undefined`.

Her er den sikre måde at få adgang til `user.address.street` ved hjælp af `?.`:

```js run
let user = {}; // user har ingen adresse

alert( user?.address?.street ); // undefined (ingen fejl)
```

Koden er kort og ren, der er ingen duplikation overhovedet.

Her er et eksempel med `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // vil være undefined, hvis der ikke er noget element
```

At læse adressen med `user?.address` fungerer selvom `user` objektet ikke eksisterer:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Bemærk: `?.`-syntaksen gør værdien før den valgfri, men ikke videre.

F.eks. i `user?.address.street.name` tillader `?.` at `user` sikkert kan være `null/undefined` (og returnerer `undefined` i det tilfælde), men det gælder kun for `user`. Yderligere egenskaber tilgås på en almindelig måde. Hvis vi vil have nogle af dem til at være valgfrie, skal vi erstatte flere `.` med `?.`.

```warn header="Lad være med at overbruge valgfri kædning"
Vi bør kun bruge `?.` der, hvor det er i orden, at noget ikke eksisterer.

For eksempel, hvis vores kodes logik kræver at `user` objektet eksisterer, men `address` er valgfri, så bør vi skrive `user.address?.street`, men ikke `user?.address?.street`.

På den måde, hvis `user` tilfældigvis er undefined, vil vi se en programmeringsfejl om det og rette det. Ellers, hvis vi overbruger `?.`, kan kodefejl blive tavse, hvor det ikke er passende, og blive sværere at debugge.
```

````warn header="Variablen før `?.` skal være deklareret"
Hvis der slet ikke er nogen variabel `user`, vil `user?.anything` udløse en fejl:

```js run
// ReferenceError: user is not defined
user?.address;
```
Variablen skal være deklareret (f.eks. `let/const/var user` eller som en funktionsparameter). Den valgfrie kædning fungerer kun for deklarerede variabler.
````

## Kortslutning (Short-circuiting)

Som nævnt tidligere stopper `?.` straks ("kortslutter") evalueringen, hvis venstredelen ikke eksisterer.

Så hvis der er yderligere funktionskald eller operationer til højre for `?.`, vil de ikke blive udført.

For eksempel:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // ingen "user", så udførelsen når ikke sayHi-kaldet og x++

alert(x); // 0, værdi ikke inkrementeret
```

## Andre varianter: ?.(), ?.[]

Den valgfrie kædning `?.` er ikke en operator, men en særlig syntaks, der også fungerer med funktioner og firkantede parenteser.

For eksempel bruges `?.()` til at kalde en funktion, der måske ikke eksisterer.

I koden nedenfor har nogle af vores brugere `admin`-metoden, og nogle har ikke:
```js run
let userAdmin = {
  admin() {
    alert("Jeg er admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // Jeg er admin
*/!*

*!*
userGuest.admin?.(); // intet sker (metoden findes ikke)
*/!*
```

Her bruger vi i begge linjer først punktum (`userAdmin.admin`) til at få `admin`-egenskaben, fordi vi antager, at `user`-objektet eksisterer, så det er sikkert at læse fra det.

Derefter tjekker `?.()` venstredelen: hvis `admin`-funktionen findes, så kører den (det gælder for `userAdmin`). Ellers (for `userGuest`) stopper evalueringen uden fejl.

`?.[]`-syntaksen fungerer også, hvis vi gerne vil bruge firkantede parenteser `[]` til at få adgang til egenskaber i stedet for punktum `.`. Ligesom i de tidligere tilfælde tillader det at læse en egenskab sikkert fra et objekt, der måske ikke eksisterer.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

Vi kan også bruge `?.` med `delete`:

```js run
delete user?.name; // slet user.name hvis user eksisterer
```

````warn header="Vi kan bruge `?.` til sikker læsning og sletning, men ikke skrivning"
Den valgfrie kædning `?.` har ingen effekt på venstresiden af en tildeling.

For eksempel:
```js run
let user = null;

user?.name = "John"; // Fejl, virker ikke
// fordi det evalueres til: undefined = "John"
```

````

## Opsummering

Den valgfrie kædning `?.`-syntaks har tre former:

1. `obj?.prop` -- returnerer `obj.prop` hvis `obj` eksisterer, ellers `undefined`.
2. `obj?.[prop]` -- returnerer `obj[prop]` hvis `obj` eksisterer, ellers `undefined`.
3. `obj.method?.()` -- kalder `obj.method()` hvis `obj.method` eksisterer, ellers returnerer `undefined`.

Som vi kan se, er alle tre former enkle og ligetil at bruge. `?.` tjekker venstredelen for `null/undefined` og tillader evalueringen at fortsætte, hvis det ikke er tilfældet.

En kæde af `?.` tillader sikker adgang til indlejrede egenskaber.

Vi bør dog anvende `?.` med omtanke, kun hvor det er acceptabelt ifølge vores kodelogik, at venstredelen ikke eksisterer. Så det ikke skjuler programmeringsfejl for os, hvis de opstår.
