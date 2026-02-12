importance: 4

---

# Filtrer interval

Skriv en funktion `filterRange(arr, a, b)` der modtager et array `arr`, leder efter elementer med værdier højere eller lig med `a` og lavere eller lig med `b` og returnerer resultatet som et array.

Funktionen må ikke ændre arrayet. Den skal returnere det nye array.

For eksempel:

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1 (matchende værdier)

alert( arr ); // 5,3,8,1 (ikke ændret)
```

