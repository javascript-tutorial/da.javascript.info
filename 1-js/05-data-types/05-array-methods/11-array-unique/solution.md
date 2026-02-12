Lad os gennemgå array-elementerne:
- For hvert element tjekker vi, om det resulterende array allerede indeholder det element.
- Hvis det er tilfældet, ignorerer vi det, ellers tilføjer vi det til resultatet.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

Koden virker, men der er et potentielt ydelsesproblem i den.

Metoden `result.includes(str)` gennemgår internt arrayet `result` og sammenligner hvert element med `str` for at finde et match.

Så hvis der er `100` elementer i `result` og ingen matcher `str`, vil den gennemgå hele `result` og lave præcis `100` sammenligninger. Og hvis `result` er stort, som `10000`, vil der være `10000` sammenligninger.

Det er ikke et problem i sig selv, fordi JavaScript-motorer er meget hurtige, så det at gennemgå et array med `10000` elementer kun tager mikrosekunder.

Men vi laver sådan en test for hvert element i `arr` i `for`-løkken.

Så hvis `arr.length` er `10000`, vil vi have noget i retning af `10000*10000` = 100 millioner sammenligninger. Det er meget.

Så løsningen er kun god til små arrays.

Senere i kapitlet <info:map-set> vil vi se, hvordan man optimerer det.

NB: I moderne JavaScript kan vi bruge en [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) til at gøre det samme på en mere effektiv måde.

