importance: 5

---

# Map til objekter

Du har et array af `user` objekter, hvert med `name`, `surname` og `id`.

Skriv koden, der laver et nyt array fra det, bestående af objekter med `id` og `fullName`, hvor `fullName` genereres ud fra `name` og `surname`.

For eksempel:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... din kode ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
``` Så, faktisk skal du mappe et array af objekter til et andet. Prøv at bruge `=>` her. Der er en lille "catch".