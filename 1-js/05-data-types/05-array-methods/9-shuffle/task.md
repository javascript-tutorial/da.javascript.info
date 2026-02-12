importance: 3

---

# Bland et array

Skriv en funktion `shuffle(array)` der blander (tilfældigt omarrangerer) elementerne i arrayet.

Flere køringer af `shuffle` kan føre til forskellige rækkefølger af elementer. For eksempel:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Alle elementrækkefølger skal have lige stor sandsynlighed. For eksempel kan `[1,2,3]` omarrangeres som `[1,2,3]` eller `[1,3,2]` eller `[3,1,2]` osv., med lige stor sandsynlighed for hver tilfældighed.
