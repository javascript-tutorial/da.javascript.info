Svaret er: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Hver iteration af løkken mindsker `i` med `1`. Tjekket `while(i)` stopper løkken, når `i = 0`.

Dermed danner trinnene i løkken følgende sekvens ("løkken trin for trin"):

```js
let i = 3;

alert(i--); // viser 3, mindsker i til 2

alert(i--) // viser 2, mindsker i til 1

alert(i--) // viser 1, mindsker i til 0

// færdig, while(i) tjek stopper løkken
```
