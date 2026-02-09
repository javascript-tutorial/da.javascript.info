# Pilefunktioner (Arrow functions), grundlæggende

Der findes en anden meget enkel og kortfattet syntaks til at oprette funktioner, som ofte er bedre end Funktionsudtryk.

Det kaldes "arrow funktionens" (pilefunktioner), fordi det ser sådan ud:
```js
let func = (arg1, arg2, ..., argN) => udtryk;
```

Dette skaber en funktion `func`, der accepterer argumenter `arg1..argN`, evaluerer derefter `udtryk` på højre side med deres brug og returnerer resultatet.

Med andre ord er det den kortere version af:

```js
let func = function(arg1, arg2, ..., argN) {
  return udtryk;
};
```

Lad os se et konkret eksempel:

```js run
let sum = (a, b) => a + b;

/* Denne pilefunktion er en kortere form for:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

Som du kan se, betyder `(a, b) => a + b` en funktion, der accepterer to argumenter med navnene `a` og `b`. Ved udførelsen evaluerer den udtrykket `a + b` og returnerer resultatet.

- Hvis vi kun har ét argument, kan parenteserne omkring parametrene udelades, hvilket gør det endnu kortere.

    For eksempel:

    ```js run
    *!*
    let double = n => n * 2;
    // det samme som: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Hvis der ikke er nogen argumenter, er parenteserne tomme, men de skal være til stede:

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Pilefunktioner kan bruges på samme måde som Funktionsudtryk.

For eksempel, for dynamisk at oprette en funktion:

```js run
let age = prompt("Hvor gammel er du?", 18);

let welcome = (age < 18) ?
  () => alert('Hej!') :
  () => alert("Velkommen!");

welcome();
```

Pilefunktioner kan virke uvante og ikke særlig læsbare i starten, men det ændrer sig hurtigt, når øjnene vænner sig til strukturen.

De er meget praktiske til simple en-linjers handlinger, når vi bare er for dovne til at skrive mange ord.

## Multilinje pilefunktioner

De pilefunktioner, vi har set indtil videre, var meget simple. De tog argumenter fra venstre side af `=>`, evaluerede og returnerede udtrykket på højre side med dem.

Nogle gange har vi brug for en mere kompleks funktion med flere udtryk og sætninger. I så fald kan vi omslutte dem med krøllede parenteser. Den store forskel er, at krøllede parenteser kræver en `return` inden i dem for at returnere en værdi (lige som en almindelig funktion gør).

Som dette:

```js run
let sum = (a, b) => {  // de krøllede parenteser åbner en multiline funktion
  let result = a + b;
*!*
  return result; // hvis vi bruger krøllede parenteser, så skal vi have en eksplicit "return"
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Mere senere"
Her roste vi pilefunktioner for deres kortfattethed. Men det er ikke alt!

Pilefunktioner har andre interessante egenskaber.

For at studere dem i dybden, skal vi først lære nogle andre aspekter af JavaScript at kende, så vi vender tilbage til pilefunktioner senere i kapitlet <info:arrow-functions>.

For nu kan du dog allerede bruge pilefunktioner til en-linjers handlinger og callbacks.
```

## Opsummering

Pilefunktioner er praktiske til simple handlinger, især for en-linjers funktioner. De findes i to varianter:

1. Uden krøllede parenteser: `(...args) => expression` -- højre side er et udtryk: funktionen evaluerer det og returnerer resultatet. Parenteser kan udelades, hvis der kun er et enkelt argument, f.eks. `n => n*2`.
2. Med krøllede parenteser: `(...args) => { body }` -- parenteser tillader os at skrive flere sætninger inde i funktionen, men vi skal have en eksplicit `return` for at returnere noget.
