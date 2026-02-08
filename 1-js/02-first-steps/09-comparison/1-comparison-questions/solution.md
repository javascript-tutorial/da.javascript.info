

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Nogle af grundene:

1. Selvfølgelig sandt.
2. Ordbogsammenligning, derfor falsk. `"a"` er mindre end `"p"`.
3. Igen ordbogsammenligning, første tegn `"2"` er større end første tegn `"1"`.
4. Værdierne `null` og `undefined` er kun lige med hinanden.
5. Strengt lighedstjek er strengt. Forskellige typer fra begge sider fører til falsk.
6. På samme måde som `(4)`, er `null` kun lig med `undefined`.
7. Strengt lighedstjek af forskellige typer.