
1. For at det overhovedet komme til at virke, skal resultatet af `sum` være en funktion.
2. Den funktion skal gemme den nuværende værdi mellem kald.
3. Ifølge opgaven skal funktionen blive til et tal når den bruges i `==`. Funktioner er objekter, så konverteringen sker som beskrevet i kapitlet <info:object-toprimitive>, og vi kan give en egen metode der returnerer tallet.

Her er koden:
```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Bemærk at funktionen `sum` virker kun én gang. Den returnerer funktionen `f`.

Herefter, på hvert efterfølgende kald, tilføjer `f` sin parameter til summen `currentSum`, og returnerer sig selv.

**Der er ingen rekursion i den sidste linje af `f`.**

Her er hvad rekursion ser ud som:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- rekursivt kald
}
```

Og i vores tilfælde returnerer vi bare funktionen, uden at kalde den:

```js
function f(b) {
  currentSum += b;
  return f; // <-- den kalder ikke sig selv. Den returnerer sig selv
}
```

Denne `f` vil blive brugt i det næste kald og igen returnere sig selv, så mange gange som nødvendigt. Herefter, når den bruges som et tal eller en streng -- returnerer `toString` `currentSum`. Vi kunne også bruge `Symbol.toPrimitive` eller `valueOf` her til konverteringen.
