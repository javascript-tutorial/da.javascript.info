importance: 5

---

# Sorter brugere efter alder

Skriv en funktion `sortByAge(users)`, der modtager et array af objekter med egenskaben `age` og sorterer dem efter `age`.

For eksempel:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// nu: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
