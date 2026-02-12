importance: 5

---

# Opbevar "ulæste" flag

Her er et array af beskeder:

```js
let messages = [
  {text: "Hej", from: "John"},
  {text: "Hvordan går det?", from: "John"},
  {text: "Vi ses snart", from: "Alice"}
];
```

Din kode kan tilgå det, men beskederne styres af en andens kode. Nye beskeder tilføjes, gamle fjernes regelmæssigt af den kode, og du kender ikke de præcise tidspunkter, hvor det sker.

Hvilken datastruktur kunne du bruge til at gemme information om, hvorvidt beskeden "er blevet læst"? Strukturen skal være velegnet til at give svaret "blev den læst?" for det givne beskedobjekt.

P.S. Når en besked fjernes fra `messages`, skal den også forsvinde fra din struktur.

P.P.S. Vi bør ikke ændre beskedobjekterne ved at tilføje vores egne egenskaber til dem. Da de styres af en andens kode, kan det føre til uønskede konsekvenser.
