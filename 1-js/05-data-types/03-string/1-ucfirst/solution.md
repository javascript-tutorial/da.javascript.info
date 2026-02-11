Vi kan ikke "erstatte" det første tegn, fordi strenge i JavaScript er uforanderlige (immutable).

Men vi kan lave en ny streng baseret på den eksisterende, med det første tegn i stort:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Der er dog et lille problem. Hvis `str` er tom, så er `str[0]` `undefined`, og da `undefined` ikke har metoden `toUpperCase()`, får vi en fejl.

Den nemmeste løsning er at tilføje en test for en tom streng, sådan her:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("karsten") ); // Karsten
```
