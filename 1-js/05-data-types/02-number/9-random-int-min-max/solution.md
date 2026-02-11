# Den simple, men forkerte løsning

Den simpleste, men forkerte løsning ville være at generere en værdi fra `min` til `max` og runde den:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

Funktionen virker, men den er forkert. Sandsynligheden for at få kantværdierne `min` og `max` er to gange mindre end for alle andre.

Hvis du kører eksemplet ovenfor mange gange, vil du nemt se, at `2` optræder oftest.

Det sker, fordi `Math.round()` får tilfældige tal fra intervallet `1..3` og runder dem som følger:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

Nu kan vi tydeligt se, at `1` får halvt så mange værdier som `2`. Det samme gælder for `3`.

# Den korrekte løsning

Der er mange korrekte løsninger på opgaven. En af dem er at justere intervalgrænserne. For at sikre de samme intervaller kan vi generere værdier fra `0.5 til 3.5`, og dermed tilføje de nødvendige sandsynligheder til kanterne:

```js run
*!*
function randomInteger(min, max) {
  // Nu er rand fra (min-0.5) til (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

En alternativ måde kunne være at bruge `Math.floor` for et tilfældigt tal fra `min` til `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // her er rand fra min til (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Nu er alle intervaller mappet på denne måde:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

Alle intervaller har samme længde, hvilket gør den endelige fordeling ensartet.
