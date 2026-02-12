importance: 4

---

# Find gennemsnitsalderen

Skriv funktionen `getAverageAge(users)`, der modtager et array af objekter med egenskaben `age` og returnerer gennemsnitsalderen.

Formlen for gennemsnittet er `(age1 + age2 + ... + ageN) / N`.

For eksempel:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
