Den første løsning vi kunne prøve er den rekursive.

Fibonacci-tallene er rekursive per definition:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // vil være meget langsom!
```

...Men for store værdier af `n` er det meget langsomt. For eksempel kan `fib(77)` få motoren til at hænge op i nogle sekunder og spise alle CPU-ressourcer.

Det skyldes, at funktionen laver for mange underkald. De samme værdier evalueres igen og igen.

For eksempel, lad os se en del af beregningerne for `fib(5)`:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Her kan vi se at `fib(3)` er nødvendig både for `fib(5)` og `fib(4)`. Så `fib(3)` vil blive kaldt og evalueret to gange helt uafhængigt.

Her er hele rekursions-træet:

![fibonacci rekursionstræ](fibonacci-recursion-tree.svg)

Vi kan tydeligt se at `fib(3)` evalueres to gange og `fib(2)` evalueres tre gange. Det samlede antal beregninger vokser meget hurtigere end `n`, hvilket gør det enormt endda for `n=77`.

Vi kan optimere det ved at huske allerede evaluerede værdier: hvis en værdi som f.eks. `fib(3)` beregnes én gang, så kan vi bare genbruge den i fremtidige beregninger.

En anden variant ville være at give op på rekursion og bruge et helt andet loop-baseret algoritme.

I stedet for at gå fra `n` og ned til lavere værdier kan vi oprette en løkke der starter fra `1` og `2`, så får vi `fib(3)` som summen af dem, så `fib(4)` som summen af de to foregående værdier, så `fib(5)` og går op og op, indtil det får den ønskede værdi. På hver trin behøver vi kun at huske de to foregående værdier.

Her er trinene for den nye algoritme i detaljer.

Starten:

```js
// a = fib(1), b = fib(2), disse værdier er per definition 1
let a = 1, b = 1;

// Hent c = fib(3) som summen af dem
let c = a + b;

/* nu har vi fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Nu vil vi gerne have fib(4) = fib(2) + fib(3)`.

Lad os skifte variablerne: `a,b` vil få `fib(2),fib(3)`, og `c` vil få deres sum:

```js no-beautify
a = b; // nu a = fib(2)
b = c; // nu b = fib(3)
c = a + b; // c = fib(4)

/* nu har vi sekvensen:
   a  b  c
1, 1, 2, 3
*/
```

Det næste trin giver endnu et nummer i sekvensen:

```js no-beautify
a = b; // now a = fib(3)
b = c; // now b = fib(4)
c = a + b; // c = fib(5)

/* nu er sekvensen:
      a  b  c
1, 1, 2, 3, 5
*/
```

...Og sådan fortsætter vi indtil vi får den ønskede værdi. Det er meget hurtigere end rekursion og involverer ingen duplikerede beregninger.

Den fulde kode:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

Løkken starter med `i=3`, fordi de første to sekvensværdier er hardkodet i variablerne `a=1`, `b=1`.

Denne tilgang kaldes dynamisk programmering (på engelsk [dynamic programming bottom-up](https://en.wikipedia.org/wiki/Dynamic_programming)).
