importance: 5

---

# Filtrer gennem funktion

Vi har en indbygget metode `arr.filter(f)` til arrays. Den filtrerer alle elementer gennem funktionen `f`. Hvis den returnerer `true`, så returneres det element i det resulterende array.

Lav et sæt af "klar til brug" filtre som kan bruges med `filter`:

- `inBetween(a, b)` -- tallet er mellem `a` og `b` begge tal inklusiv.
- `inArray([...])` -- i det givne array.

Brugen skal være i stil med dette:

- `arr.filter(inBetween(3,6))` -- vælg kun værdier mellem 3 og 6.
- `arr.filter(inArray([1,2,3]))` -- vælg kun elementer som matcher med et af elementerne i `[1,2,3]`.

For eksempel:

```js
/* .. din kode for inBetween og inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

