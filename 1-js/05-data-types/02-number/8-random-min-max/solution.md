Vi skal "mappe" alle værdier fra intervallet 0..1 til værdier fra `min` til `max`.

Det kan gøres i to trin:

1. Hvis vi ganger et tilfældigt tal fra 0..1 med `max-min`, så øges intervallet af mulige værdier fra `0..1` til `0..max-min`.
2. Nu, hvis vi lægger `min` til, bliver det mulige interval fra `min` til `max`.

Funktionen:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

