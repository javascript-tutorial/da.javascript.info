importance: 5

---

# Itererbare nøgler

Vi vil gerne have et array af `map.keys()` i en variabel og derefter anvende array-specifikke metoder på det, f.eks. `.push`.

Men det virker ikke:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Fejl: keys.push er ikke en funktion
keys.push("more");
*/!*
```

Hvorfor? Hvordan kan vi rette koden, så `keys.push` virker?
