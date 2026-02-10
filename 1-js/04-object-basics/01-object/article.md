
# Objekter

Som vi ved fra kapitlet <info:types>, er der otte datatyper i JavaScript. Syv af dem kaldes "primitive", fordi deres værdier kun indeholder en enkelt ting (det være sig en streng eller et tal eller hvad som helst).

Modsat dem er objekter brugt til at gemme samlinger af forskellige data og mere komplekse enheder. I JavaScript gennemsyrer objekter næsten alle aspekter af sproget. Så vi skal forstå dem først, før vi går i dybden med noget andet.

Et objekt kan oprettes med krøllede parenteser `{…}` med en valgfri liste af *egenskaber*. En egenskab er et "nøgle: værdi" par (key/value), hvor `nøgle` er en streng (også kaldet et "egenskabsnavn"), og `værdi` kan være hvad som helst.

Vi kan forestille os et objekt som et skab med underskrevne filer. Hver datadel gemmes i sin fil efter nøglen. Det er nemt at finde en fil efter dens navn eller tilføje/fjerne en fil.

![](object.svg)

Et tomt objekt ("tomt skab") kan oprettes ved hjælp af en af to syntakser:

```js
let user = new Object(); // "objekt konstruktør" syntaks
let user = {};  // "objekt literal" syntaks
```

![](object-user-empty.svg)

Normalt bruges krøllede parenteser `{...}`. Den erklæring kaldes en *objekt literal* - på dansk "objekt bogstaveligt".

## Literals og egenskaber

Vi kan straks putte nogle egenskaber (kaldet properties) ind i `{...}` som "nøgle: værdi" par:

```js
let user = {     // et objekt
  name: "John",  // under nøglen "name" gem værdien "John"
  age: 30        // under nøglen "age" gem værdien 30
};
```

En egenskab har en nøgle (engelsk "key") (også kendt som "navn" eller "identifikator") før kolon `":"` og en værdi til højre for den.

I `user` objektet er der to egenskaber:

1. Den første egenskab har navnet `"name"` og værdien `"John"`.
2. Den anden har navnet `"age"` og værdien `30`.

Det resulterende `user` objekt kan forestilles som et skab med to underskrevne filer mærket "name" og "age".

![user object](object-user.svg)

Vi kan tilføje, fjerne og læse filer fra det når som helst.

Egenskabsværdier er tilgængelige ved hjælp af punktnotation:

```js
// hent værdier for egenskaber fra objektet:
alert( user.name ); // John
alert( user.age ); // 30
```

Værdien kan være af enhver type. Lad os tilføje en boolean:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

For at fjerne en egenskab kan vi bruge `delete` operatoren:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Vi kan også bruge egenskabsnavne med flere ord, men så skal de være i anførselstegn:

```js
let user = {
  name: "John",
  age: 30,
  "elsker fugle": true  // egenskaber der indeholder flere ord skal være i anførselstegn
};
```

![](object-user-props.svg)


Den sidste egenskab i listen må ende med et komma, det er helt lovligt:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Dette kaldes en "trailing" eller "hængende" komma. Det gør det nemmere at tilføje/fjerne/flytte egenskaber, fordi alle linjer bliver ens.

## Firkantede parenteser

For egenskaber med flere ord virker punktnotation ikke:

```js run
// this would give a syntax error
user.likes birds = true
```

JavaScript forstår ikke den sætning. Det tror, at vi adresserer `user.elsker`, og så giver det en syntaksfejl, når det støder på det uventede `fugle`.

Punktnotation kræver, at nøglen er en gyldig identifikator. Det indebærer: indeholder ingen mellemrum, starter ikke med et tal og indeholder ikke specialtegn (`$` og `_` er tilladt).

Der findes et alternativ, "firkantede parenteser" notation (engelsk "square bracket notation"), som virker med enhver streng:

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

Nu virker det. Bemærk, at strengen inde i parenteserne er korrekt sat i anførselstegn (enhver type anførselstegn kan bruges).

Firkantede parenteser giver også en måde at få egenskabsnavnet som resultatet af et vilkårligt udtryk – i modsætning til en bogstavelig streng – for eksempel fra en variabel som følger:

```js
let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;
```

Her kan variablen `key` blive beregnet under kørsel eller afhænge af brugerinput. Og så bruger vi den til at få adgang til egenskaben. Det giver os en stor fleksibilitet.

For eksempel:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("Hvad vil du vide om brugeren?", "name");

// adgang via variabel
alert( user[key] ); // John (hvis der indtastes "name")
```

Punktnotation kan ikke bruges på en lignende måde:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Beregnede egenskaber

Vi kan bruge firkantede parenteser i en objektbogstav, når vi opretter et objekt. Det kaldes *beregnede egenskaber* (engelsk "computed properties").

For eksempel:

```js run
let fruit = prompt("Hvilken frugt vil du købe?", "apple");

let bag = {
*!*
  [fruit]: 5, // navnet på egenskaben tages fra variablen fruit
*/!*
};

alert( bag.apple ); // 5 if fruit="apple"
```

Meningen med en beregnet egenskab er enkel: `[fruit]` betyder, at navnet på egenskaben skal tages fra `fruit`.

Så hvis en besøgende indtaster `"apple"`, vil `bag` blive `{apple: 5}`.

I bund og grund fungerer det på samme måde som:
```js run
let fruit = prompt("Hvilken frugt vil du købe?", "apple");
let bag = {};

// tag egenskabsnavnet fra variablen fruit
bag[fruit] = 5;
```

...Men ser pænere ud.

Vi kan bruge mere komplekse udtryk inde i firkantede parenteser:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Firkantede parenteser er meget mere kraftfulde end punktnotation. De tillader alle egenskabsnavne og variabler. Men de er også mere besværlige at skrive.

Så det meste af tiden, når egenskabsnavne er kendte og simple, bruges punktnotation. Og hvis vi har brug for noget mere komplekst, så skifter vi til firkantede parenteser.

## Egenskaber og "shorthand"

I kode bruger vi ofte eksisterende variabler som værdier for egenskabsnavne.

For instance:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...andre egenskaber
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

I eksemplet ovenfor har egenskaberne samme navne som variablerne. Brugssituationen med at lave en egenskab ud fra en variabel er så almindelig, at der findes en særlig *property value shorthand* for at gøre det kortere.

I stedet for `name:name` kan vi bare skrive `name`, sådan her:

```js
function makeUser(name, age) {
*!*
  return {
    name, // samme som name: name
    age,  // samme som age: age
    // ...
  };
*/!*
}
```

Vi kan bruge både normale egenskaber og shorthand i det samme objekt:

```js
let user = {
  name,  // samme som name:name
  age: 30
};
```


## Begrænsninger ved egenskabsnavne

Som vi allerede ved, kan en variabel ikke have et navn, der er lig med et af sprogets reserverede ord som "for", "let", "return" osv.

Men for en objekt-egenskab er der ingen sådan begrænsning:

```js run
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Kort fortalt, er der ingen begrænsninger for egenskabsnavne. De kan være enhver streng eller symbol (en særlig type for identifikatorer, som vi vil dække senere).

Andre typer konverteres automatisk til strenge.

For eksempel bliver et tal `0` til en streng `"0"`, når det bruges som en egenskabsnøgle:

```js run
let obj = {
  0: "test" // samme som "0": "test"
};

// begge alerts tilgår den samme egenskab (tallet 0 konverteres til strengen "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (samme egenskab)
```

Der er en helt særlig lille undtagelse med en særlig egenskab ved navn `__proto__`. Vi kan ikke sætte den til en ikke-objektværdi:

```js run
let obj = {};
obj.__proto__ = 5; // tildel et tal
alert(obj.__proto__); // [object Object] - værdien er et objekt, virkede ikke som forventet
```

Som vi kan se fra koden, ignoreres tildelingen til en primitiv `5`.

Vi vil dække den særlige natur af `__proto__` i [efterfølgende kapitler](info:prototype-inheritance), og foreslå [måder at rette](info:prototype-methods) sådan adfærd på.

## Test af eksistensen af en egenskab, "in" operator

En særlig egenskab ved objekter i JavaScript, sammenlignet med mange andre sprog, er, at det er muligt at tilgå enhver egenskab. Der opstår ingen fejl, hvis egenskaben ikke findes!

At læse en ikke-eksisterende egenskab returnerer blot `undefined`. Så vi kan nemt teste, om egenskaben findes:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true betyder at "no such property" egenskaben ikke findes
```

Der findes også en særlig operator `"in"` til det formål.

Syntaksen er:
```js
"key" in object
```

For eksempel:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age findes
alert( "blabla" in user ); // false, user.blabla findes ikke
```

Bemærk at der skal stå et *egenskabsnavn* til venstre for `in`. Det er som regel en citeret streng.

Hvis vi udelader citationstegn, betyder det, at en variabel skal indeholde det faktiske navn, der skal testes. For eksempel:

```js run
let user = { age: 30 };

let key = "age";
alert( key in user ); // true, egenskaben "age" findes
```

Hvorfor findes `in` operatoren? Er det ikke nok at sammenligne med `undefined`?

Det fungerer som regel fint at sammenligne med `undefined`. Men der er en særlig situation, hvor det fejler, men hvor `"in"` virker korrekt.

Det er når en objekt-egenskab findes, men indeholder `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // Den er undefined, så - ingen sådan egenskab?

alert( "test" in obj ); // true, egenskaben findes faktisk!
```

I koden ovenfor eksisterer egenskaben `obj.test` teknisk set. Så `in` operatoren fungerer korrekt.

Situationer som denne opstår meget sjældent, fordi `undefined` ikke bør tildeles eksplicit. Vi bruger for det meste `null` for "ukendte" eller "tomme" værdier. Så `in` operatoren er en eksotisk gæst i koden.


## "for..in" løkken [#forin]

For at gennemløbe alle nøgler i et objekt, findes der en særlig form for løkke: `for..in`. Dette er en helt anden ting end `for(;;)`-konstruktionen, som vi studerede tidligere.

Syntaksen:

```js
for (key in object) {
  // Udfører koden for hver nøgle blandt objektets egenskaber
}
```

For eksempel, lad os udskrive alle egenskaber af `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // nøgle
  alert( key );  // name, age, isAdmin
  // værdier for nøglerne
  alert( user[key] ); // John, 30, true
}
```

Bemærk at alle "for" konstruktioner tillader os at erklære løkkevariablen inde i løkken, som `let key` her.

Vi kunne også bruge et andet variabelnavn her i stedet for `key`. For eksempel er `"for (let prop in obj)"` også meget brugt.

### Ordnet som et objekt

Er objekter ordnet? Med andre ord, hvis vi løber igennem et objekt, får vi så alle egenskaber i den samme rækkefølge, som de blev tilføjet? Kan vi stole på dette?

Det korte svar er at de er "ordnet på en særlig måde": heltals-egenskaber sorteres, andre vises i oprettelsesrækkefølge. Detaljerne følger.

Som et eksempel, lad os betragte et objekt med telefonkoder:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  "45": "Denmark",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 45, 49
}
*/!*
```

Objektet kan være ment til at foreslå en liste af muligheder til brugeren. Hvis vi laver et site primært for et tysk publikum, så vil vi sandsynligvis have `49` som den første.

Men hvis vi kører koden, ser vi et helt andet billede:

- USA (1) går først
- derefter Schweiz (41) og så videre.

Telefonkoderne vises i stigende sorteret rækkefølge, fordi de er heltal. Så vi ser `1, 41, 44, 45, 49`.

````smart header="Heltals-egenskaber? Hvad er det?"
Begrebet "heltals-egenskab" her betyder en streng, der kan konverteres til og fra et heltal uden ændring.

Så `"49"` er et heltals-egenskabsnavn, fordi når det omdannes til et heltal og tilbage, er det stadig det samme. Men `"+49"` og `"1.2"` er ikke:

```js run
// Number(...) Eksplicit konverterer til et tal
// Math.trunc er en indbygget funktion, der fjerner decimaldelen
alert( String(Math.trunc(Number("49"))) ); // "49", Samme, heltals-egenskab
alert( String(Math.trunc(Number("+49"))) ); // "49", ikke samme "+49" ⇒ ikke heltals-egenskab
alert( String(Math.trunc(Number("1.2"))) ); // "1", ikke samme "1.2" ⇒ ikke heltals-egenskab
```
````

...Modsat, hvis nøglerne ikke er heltal, så vises de i oprettelsesrækkefølge, for eksempel:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // tilføj en mere

*!*
// nøgler der ikke er direkte konverterbare til heltal vises i oprettelsesrækkefølge
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Så, hvis vi vil løse problemet med telefonkoderne, kan vi "snyde" ved at gøre koderne ikke-heltal. At tilføje et plus `"+"` tegn før hver kode er nok.

Like this:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  "+45": "Denmark",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 45, 1
}
```

Nu virker det som forventet.

## Opsummering

Objekter er associative arrays med flere særlige egenskaber.

De gemmer egenskaber (nøgle-værdi par), hvor:
- Egenskabsnøgler skal være strenge eller symboler (normalt strenge).
- Værdier kan være af enhver type.

For at tilgå en egenskab kan vi bruge:
- Punktnotation: `obj.property`.
- Firkantede parenteser notation `obj["property"]`. Firkantede parenteser tillader at tage nøglen fra en variabel, som `obj[varWithKey]`.

Yderligere operatorer:
- For at slette en egenskab: `delete obj.prop`.
- For at tjekke om en egenskab med den givne nøgle findes: `"key" in obj`.
- For at iterere over et objekt: `for (let key in obj)` løkke.

Det, vi har studeret i dette kapitel, kaldes et "almindeligt objekt" eller bare `Object`.

Der findes mange andre slags objekter i JavaScript:

- `Array` til at gemme ordnede datasamlinger,
- `Date` til at gemme information om dato og tid,
- `Error` til at gemme information om en fejl.
- ...Og så videre.

De har deres særlige egenskaber, som vi vil studere senere. Nogle gange siger folk noget som "Array type" eller "Date type", men formelt er de ikke egne typer, men tilhører en enkelt "object" datatyper. Og de udvider den på forskellige måder.

Objekter i JavaScript er meget kraftfulde. Her har vi kun ridset overfladen af et emne, der er virkelig stort. Vi vil arbejde tæt med objekter og lære mere om dem i videre dele af tutorialen.
