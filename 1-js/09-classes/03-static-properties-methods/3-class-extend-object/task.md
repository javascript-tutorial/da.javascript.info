importance: 3

---

# Klasse udvider object?

Som vi ved, nedarver alle objekter normalt fra `Object.prototype` og får dermed adgang til "generiske" objektmetoder som `hasOwnProperty` etc.

For eksempel:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty metoden kommer fra Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Men, hvis vi skriver det udtrykkeligt som `"class Rabbit extends Object"`, så vil resultatet være anderledes end ved en simpel `"class Rabbit"`?

Hvad er forskellen?

Her er et eksempel på sådan en kode (den virker ikke -- hvorfor? fix den?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Fejl
```
