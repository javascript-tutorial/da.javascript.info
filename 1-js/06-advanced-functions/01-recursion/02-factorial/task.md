importance: 4

---

# Udregn faktorial

[Fakultet](https://da.wikipedia.org/wiki/Fakultet_(matematik))(engelsk [factorial](https://en.wikipedia.org/wiki/Factorial)) af et naturligt tal er tallet ganget med "tallet minus én", så med "tallet minus to", og så videre til `1`. Fakultetet af `n` betegnes som `n!`

Vi kan skrive en definition af fakultet som denne:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Værdier af fakultet for forskellige `n`:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Opgaven er at skrive en funktion `factorial(n)` som beregner `n!` ved hjælp af rekursive kald.

```js
alert( factorial(5) ); // 120
```

Hint: `n!` kan skrives som `n * (n-1)!` For eksempel: `3! = 3*2! = 3*2*1! = 6`
