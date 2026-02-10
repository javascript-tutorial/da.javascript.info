# Objektmetoden, "this"

Objekter er normalt oprettet for at repræsentere enheder fra den virkelige verden, som brugere, ordrer og så videre:

```js
let user = {
  name: "John",
  age: 30
};
```

Og i den virkelige verden kan en bruger *handle*: vælge noget fra indkøbskurven, logge ind, logge ud osv.

Handlinger repræsenteres i JavaScript ved funktioner i egenskaber.

## Eksempler på metoder

Til at begynde med, lad os lære `user` at sige hej:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hej!");
};
*/!*

user.sayHi(); // Hej!
```

Her har vi netop brugt et Funktionsudtryk til at oprette en funktion og tildele den til egenskaben `user.sayHi` af objektet.

Derefter kan vi kalde det som `user.sayHi()`. Brugeren kan nu tale!

En funktion, der er en egenskab af et objekt, kaldes dets *metode*.

Så her har vi en metode `sayHi` af objektet `user`.

Selvfølgelig kunne vi bruge en foruddefineret funktion som en metode, sådan her:

```js run
let user = {
  // ...
};

*!*
// først, deklarer
function sayHi() {
  alert("Hej!");
}

// så tilføj som en metode
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hej!
```

```smart header="Objektorienteret programmering"
Når vi skriver vores kode ved hjælp af objekter til at repræsentere enheder, kaldes det [objektorienteret programmering](https://en.wikipedia.org/wiki/Object-oriented_programming), forkortet: "OOP".

OOP er en stor ting, en interessant videnskab i sig selv. Hvordan vælger man de rigtige enheder? Hvordan organiserer man interaktionen mellem dem? Det er arkitektur, og der findes gode bøger om det emne, som "Design Patterns: Elements of Reusable Object-Oriented Software" af E. Gamma, R. Helm, R. Johnson, J. Vissides eller "Object-Oriented Analysis and Design with Applications" af G. Booch, og flere.
```
### Metode 'shorthand'

Der findes en kortere syntaks for metoder i et objektliteral:

```js
// disse objekter gør det samme

user = {
  sayHi: function() {
    alert("Hej");
  }
};

// metode 'shorthand' ser bedre ud, ikke?
user = {
*!*
  sayHi() { // det samme som "sayHi: function(){...}"
*/!*
    alert("Hej");
  }
};
```

Som du ser, kan vi udelade `"function"` og blot skrive `sayHi()`.

For at være ærlig er noterne ikke helt identiske. Der er subtile forskelle relateret til objektarv (som vil blive dækket senere), men for nu betyder det ikke noget. I næsten alle tilfælde foretrækkes den kortere syntaks.

## "this" i metoder

Det er almindeligt, at en objektmetode har brug for at få adgang til informationen, der er gemt i objektet, for at udføre sit arbejde.

For eksempel kan koden inde i `user.sayHi()` have brug for navnet på `user`.

**For at få adgang til objektet kan en metode bruge nøgleordet `this`.**

Værdien af `this` er objektet "før punktum", det der bruges til at kalde metoden.

For eksempel:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" er det "nuværende objekt"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Under udførsel af `user.sayHi()`, vil værdien af `this` være `user`.

Teknisk set er det også muligt at få adgang til objektet uden `this`, ved at referere til det via den ydre variabel:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" i stedet for "this"
*/!*
  }

};
```

...Men sådan kode er upålidelig. Hvis vi beslutter at kopiere `user` til en anden variabel, f.eks. `admin = user` og overskrive `user` med noget andet, så vil det få adgang til det forkerte objekt.

Det demonstreres nedenfor:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // fører til en fejl
*/!*
  }

};


let admin = user;
user = null; // oveskriv for at gøre det tydeligt

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
```

Hvis vi brugte `this.name` i stedet for `user.name` inde i `alert`, så ville koden fungere.

## "this" er ikke bundet

I JavaScript opfører nøgleordet `this` sig anderledes end i de fleste andre programmeringssprog. Det kan bruges i enhver funktion, selvom det ikke er en metode i et objekt.

Der er ingen syntaksfejl i følgende eksempel:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

Værdien af `this` evalueres under kørsel, afhængigt af konteksten.

For eksempel her er den samme funktion tildelt til to forskellige objekter og har forskellig "this" i kald:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// brug den samme funktion i to objekter
user.f = sayHi;
admin.f = sayHi;
*/!*

// disse kald har forskellig this
// "this" inde i funktionen er objektet "før punktum"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (adgang via dot eller firkantede parenteser til metoden – det er ligegyldigt)
```

Reglen er simpel: hvis `obj.f()` kaldes, så er `this` `obj` under kaldet af `f`. Så det er enten `user` eller `admin` i eksemplet ovenfor.

````smart header="Kald uden et objekt: `this == undefined`"
Vi kan endda kalde funktionen uden et objekt overhovedet:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

I dette tilfælde er `this` `undefined` i strict mode. Hvis vi prøver at få adgang til `this.name`, vil der opstå en fejl.

I non-strict mode vil værdien af `this` i sådanne tilfælde være *globalt objekt* (`window` i en browser, vi kommer til det senere i kapitlet [](info:global-object)). Dette er en historisk adfærd, som `"use strict"` retter.

Normalt er sådan et kald en programmeringsfejl. Hvis der er `this` inde i en funktion, forventes det at blive kaldt i en objektkontekst.
````

```smart header="Konsekvenserne af et ubundet `this`"
Hvis du kommer fra et andet programmeringssprog, er du sandsynligvis vant til ideen om et "bundet `this`", hvor metoder defineret i et objekt altid har `this`, der refererer til det objekt.

I JavaScript er `this` "frit", dets værdi evalueres ved kaldetid og afhænger ikke af, hvor metoden blev erklæret, men snarere af hvilket objekt der er "før punktum".

Konceptet med run-time evalueret `this` har både fordele og ulemper. På den ene side kan en funktion genbruges for forskellige objekter. På den anden side skaber den større fleksibilitet flere muligheder for fejl.

Her er vores holdning ikke at bedømme, om dette sprogdesign er godt eller dårligt. Vi vil forstå, hvordan man arbejder med det, hvordan man får fordele og undgår problemer.
```

## Arrow funktioner har ikke deres eget "this"

Arrow funktioner er specielle: de har ikke deres eget `this`. Hvis vi refererer til `this` fra en sådan funktion, tages det fra den ydre "normale" funktion.

For eksempel her bruger `arrow()` `this` fra den ydre `user.sayHi()` metode:

```js run
let user = {
  firstName: "Karsten",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Karsten
```

Det er en speciel funktion ved arrow funktioner, det er nyttigt, når vi faktisk ikke ønsker at have et separat `this`, men snarere tage det fra den ydre kontekst. Senere i kapitlet <info:arrow-functions> vil vi gå mere i dybden med arrow funktioner.


## Opsummering

- Funktioner, der er gemt i objektets egenskaber, kaldes "metoder".
- Metoder tillader objekter at "handle" som `objekt.doSomething()`.
- Metoder kan referere til objektet som `this`.

Værdien af `this` defineres under kørsel.
- Når en funktion erklæres, kan den bruge `this`, men det `this` har ingen værdi, før funktionen kaldes.
- En funktion kan kopieres mellem objekter.
- Når en funktion kaldes i "metode" syntaksen: `objekt.metode()`, er værdien af `this` under kaldet `objekt`.

Bemærk, at arrow funktioner er specielle: de har ikke deres eget `this`. Når `this` tilgås inde i en arrow funktion, tages det fra den ydre kontekst.
