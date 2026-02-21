importance: 5

---

# Sammentæl alle tal op til et bestemt tal

Skriv en funktion `sumTo(n)` som beregner summen af tallene `1 + 2 + ... + n`.

For eksempel:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Opret tre variationer af løsningen:

1. Ved brug af et `for`-loop.
2. Ved brug af rekursion, da `sumTo(n) = n + sumTo(n-1)` for `n > 1`.
3. Ved brug af formlen [Differensrække](https://da.wikipedia.org/wiki/Differensr%C3%A6kke). Det engelske opslag [aritmetisk progression](https://en.wikipedia.org/wiki/Arithmetic_progression) giver en dybere forklaring, hvis du har brug for det.

Her er et eksempel på resultatet:

```js
function sumTo(n) { /*... din kode ... */ }

alert( sumTo(100) ); // 5050
```

P.S. Hvilken løsning er hurtigst? Og hvilken er langsomst? Hvorfor?

P.P.S. Kan vi bruge rekursion til at regne `sumTo(100000)`? 
