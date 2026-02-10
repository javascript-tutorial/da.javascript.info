**Svar: en fejl.**

Prøv det:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Fejl: Kan ikke læse egenskaben 'name' af undefined
```

Dette sker fordi reglerne, der sætter `this`, ikke ser på objektdefinitionen. Kun øjeblikket for kaldet betyder noget.

Her er værdien af `this` inde i `makeUser()` `undefined`, fordi det kaldes som en funktion, ikke som en metode med "dot" syntaks.

Værdien af `this` er den samme for hele funktionen, kodeblokke og objektlitteraler påvirker det ikke.

Så `ref: this` tager faktisk den nuværende `this` fra funktionen.

Vi kan omskrive funktionen og returnere den samme `this` med værdien `undefined`: 

```js run
function makeUser(){
  return this; // denne gang er der ikke noget object literal, så "this" er det samme som i funktionen
}

alert( makeUser().name ); // Fejl: Kan ikke læse egenskaben 'name' af undefined
```
Som du kan se, er resultatet af `alert( makeUser().name )` det samme som resultatet af `alert( user.ref.name )` fra det tidligere eksempel.

Her er det modsatte tilfælde:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

Nu virker det, fordi `user.ref()` er en metode. Og værdien af `this` sættes til objektet før punktum `.`.
