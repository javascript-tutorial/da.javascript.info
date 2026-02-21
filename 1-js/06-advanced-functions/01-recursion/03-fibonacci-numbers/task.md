importance: 5

---

# Fibonacci-tal

Sekvensen af [Fibonacci-tal](https://da.wikipedia.org/wiki/Fibonacci-tal) (engelsk [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number)) har formlen <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. Med andre ord er det næste tal summen af de to foregående tal.

Første to tal er `1`, så `2(1+1)`, så `3(1+2)`, `5(2+3)` og så videre: `1, 1, 2, 3, 5, 8, 13, 21...`.

Fibonacci-tallene er relateret til [det gyldne snit](https://da.wikipedia.org/wiki/Det_gyldne_snit) (engelsk [Golden Ratio](https://en.wikipedia.org/wiki/Golden_ratio)) og mange naturlige fænomener omkring os.

Skriv en funktion `fib(n)` som returnerer det `n-te` Fibonacci-tal.

Et eksempel på brug er:

```js
function fib(n) { /* din kode */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. Funktionen skal være hurtig. Kaldet til `fib(77)` bør tage ikke mere end et sekund.
