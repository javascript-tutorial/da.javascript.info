importance: 5

---

# Kopier og sorter array

Vi har et array af strenge `arr`. Vi vil gerne have en sorteret kopi af det, men beholde `arr` uændret.

Lav en funktion `copySorted(arr)`, der returnerer en sådan kopi.

```js
let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (ingen ændring)
```
