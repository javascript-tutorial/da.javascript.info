
Prøv at køre det:

```js run
let str = "Hej";

str.test = 5; // (*)

alert(str.test);
```

Afhængigt af om du har `use strict` eller ej, kan resultatet være:
1. `undefined` (ingen strict mode)
2. En fejl (strict mode).

Hvorfor? Lad os gennemgå, hvad der sker på linje `(*)`:

1. Når en egenskab af `str` tilgås, oprettes der et "wrapper-objekt".
2. I strict mode er det en fejl at skrive til det.
3. Ellers fortsætter operationen med egenskaben, objektet får `test`-egenskaben, men efterfølgende forsvinder "wrapper-objektet", så i den sidste linje har `str` ingen spor af egenskaben.

**Dette eksempel viser tydeligt, at primitivtyper ikke er objekter.**

De kan ikke gemme yderligere data.
