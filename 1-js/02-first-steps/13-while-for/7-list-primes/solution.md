Der er mange algoritmer til denne opgave.

Lad os bruge en indlejret løkke:

```js
For hvert i i intervallet {
  tjek om i har en divisor fra 1..i
  hvis ja => værdien er ikke et primtal
  hvis nej => værdien er et primtal, vis det
}
```

Koden med en label:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for hvert i...

  for (let j = 2; j < i; j++) { // tjek for en divisor..
    if (i % j == 0) continue nextPrime; // ikke et primtal, gå til næste i
  }

  alert( i ); // et primtal
}
```

Der er meget plads til optimering. For eksempel kunne vi lede efter divisorer fra `2` til kvadratroden af `i`. Men uanset hvad, hvis vi vil være virkelig effektive for store intervaller, skal vi ændre tilgangen og stole på avanceret matematik og komplekse algoritmer som [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) osv.
