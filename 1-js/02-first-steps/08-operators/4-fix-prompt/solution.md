Årsagen er, at prompt returnerer brugerinput som en streng.

Så variablerne har værdierne `"1"` og `"2"` henholdsvis.

```js run
let a = "1"; // prompt("Første nummer?", 1);
let b = "2"; // prompt("Andet nummer?", 2);

alert(a + b); // 12
```

Hvad vi skal gøre er at konvertere strenge til tal før `+`. For eksempel ved at bruge `Number()` eller ved at tilføje `+` foran dem.

For eksempel lige før `prompt`:

```js run
let a = +prompt("Første nummer?", 1);
let b = +prompt("Andet nummer?", 2);

alert(a + b); // 3
```

Eller i `alert`:

```js run
let a = prompt("Første nummer?", 1);
let b = prompt("Andet nummer?", 2);

alert(+a + +b); // 3
```

Ved at bruge både unær og binær `+` i den seneste kode. Ser sjovt ud, ikke?

