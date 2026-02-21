Grundlæggende kan fakultetet `n!` skrives som `n * (n-1)!`.

Med andre ord kan resultatet af `factorial(n)` beregnes som `n` ganget med resultatet af `factorial(n-1)`. Og kaldet for `n-1` kan rekursivt falde ned, og ned, til `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

Basis af rekursion er tallet `1`. Vi kan også gøre `0` til basis her, det betyder ikke meget, men giver en ekstra rekursiv trin:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
