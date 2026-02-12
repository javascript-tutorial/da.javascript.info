importance: 5

---

# Summen af egenskaberne

Der er et `salaries` objekt med et vilkårligt antal lønninger. 

Skriv funktionen `sumSalaries(salaries)`, der returnerer summen af alle lønninger ved hjælp af `Object.values` og `for..of` løkken.

Hvis `salaries` er tom, skal resultatet være `0`.

For eksempel:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

