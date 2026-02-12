importance: 4

---

# Filtrer interval "in place"

Skriv en funktion `filterRangeInPlace(arr, a, b)` der modtager et array `arr` og fjerner fra det alle værdier undtagen dem, der ligger mellem `a` og `b`. Testen er: `a ≤ arr[i] ≤ b`.

Funktionen skal kun ændre arrayet. Den må ikke returnere noget.

For instance:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // fjernede alle tal undtaget dem fra 1 til 4

alert( arr ); // [3, 1]
```
