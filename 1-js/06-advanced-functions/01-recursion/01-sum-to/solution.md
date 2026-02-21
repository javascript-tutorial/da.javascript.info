Løsningen ved brug af et `for`-loop:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

Løsningen der bruger rekursion:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

Løsningnen der bruger formlen: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. Naturligvis er formlen den hurtigste løsning. Den bruger kun 3 operationer for ethvert tal `n`. Matematikken hjælper!

Loop-varianten er den anden i hastighed. I både den rekursive og loop-variant summerer vi de samme tal. Men rekursionen involverer indlejrede kald og stak-håndtering. Det tager også ressourcer, så det er langsommere.

P.P.S. Nogle motorer understøtter "tail call" optimering: hvis et rekursivt kald er det sidste i funktionen uden andre beregninger udført, så vil den ydre funktion ikke behøve at genoptage eksekveringen, så motoren behøver ikke at huske dens eksekveringskontekst. Det fjerner byrden på hukommelsen. Men hvis JavaScript-motoren ikke understøtter tail call optimering (de fleste gør ikke), vil der være en fejl: maksimal stakstørrelse overskredet, fordi der normalt er en begrænsning på den totale stakstørrelse.
