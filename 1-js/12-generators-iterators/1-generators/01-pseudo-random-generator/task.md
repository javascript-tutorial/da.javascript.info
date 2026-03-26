
# Pseudo-random generator

Der findes mange situationer, hvor vi har brug for tilfældige data.

En af dem er testning. Vi kan have brug for tilfældige data: tekst, tal osv. for at teste funktioner grundigt.

I JavaScript kan vi bruge `Math.random()`. Men hvis noget går galt, vil vi gerne være i stand til at kunne gentage testen ved hjælp af præcis de samme data.

Til dette kan såkaldte "seeded pseudo-random generators" bruges. De tager en "seed", den første værdi, og genererer derefter de næste ved hjælp af en formel, så den samme seed giver den samme sekvens, og dermed er hele flowet nemt reproducibelt. Vi behøver kun at huske seed'en for at gentage den.

Et eksempel på en sådan formel, som genererer nogle lidt uniformt fordelte værdier:

```
next = previous * 16807 % 2147483647
```

Hvis vi bruger `1` som seed, vil værdierne være:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...og så videre...

Opgaven er at oprette en generatorfunktion `pseudoRandom(seed)` som tager `seed` og opretter generator med denne formel.

Brugseksempel:

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
