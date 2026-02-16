`new Date` konstruktøren bruger lokal tidszone. Så det vigtigste at huske er, at måneder starter fra 0.

Så februar har nummer 1.

Her er et eksempel med tal som dato-komponenter:

```js run
//new Date(år, måned, månedsdag, timer, minutter, sekunder, mellisekunder)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
Vi kunne også oprette en dato fra en streng, som dette:

```js run
//new Date(datastring)
let d2 = new Date("2012-02-20T03:12");
alert( d2 );
```
