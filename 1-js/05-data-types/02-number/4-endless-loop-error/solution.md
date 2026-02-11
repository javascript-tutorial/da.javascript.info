Det er fordi `i` aldrig ville være præcis `10`.

Kør det for at se de *rigtige* værdier af `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Ingen af dem er præcis `10`.

Sådanne ting sker på grund af præcisionstab, når man lægger brøker som `0.2` sammen.

Konklusion: undgå lighedschecks, når du arbejder med decimale brøker.