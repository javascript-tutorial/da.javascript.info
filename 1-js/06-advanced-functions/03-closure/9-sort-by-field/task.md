importance: 5

---

# Sorter efter felt

Vi har et array af objekter, som skal sorteres:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Den normale måde at gøre det på er:

```js
// ved navn (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// ved alder (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Kan vi gøre det endnu mindre "udtalt" (verbose). Noget i stil med dette?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Så i stedet for at skrive en funktion, bare brug `byField(fieldName)`.

Skriv funktionen `byField` som kan bruges til det.
