importance: 5

---

# Den maksimale løn

Der er et `salaries` objekt:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

Skriv funktionen `topSalary(salaries)`, der returnerer navnet på den bedst betalte person.

- Hvis `salaries` er tomt, skal den returnere `null`.
- Hvis der er flere bedst betalte personer, kan du returnere en af dem.

P.S. Brug `Object.entries` og destrukturering til at iterere over nøgle-/værdipar. 
