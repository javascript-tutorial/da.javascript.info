**Svaret er: fra `0` til `4` i begge tilfælde.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Dette kan let udledes fra algoritmen for `for`:

1. Udfør én gang `i = 0` før alt andet (begyndelse).
2. Tjek betingelsen `i < 5`
3. Hvis `true` -- udfør løkkens krop `alert(i)`, og derefter `i++`

Inkrementeringen `i++` er adskilt fra betingelsestjekket (2). Det er bare en anden sætning.

Værdien, der returneres af inkrementeringen, bruges ikke her, så der er ingen forskel mellem `i++` og `++i`.
