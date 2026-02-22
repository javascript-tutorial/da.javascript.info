importance: 2

---

# Tæl sammen med et vilkårligt antal parenteser

Skriv funktionen `sum` som virker som dette:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

Hint: du vil være nødt til at oprette en brugerdefineret objekt til primitiv konvertering for for at de virker.