importance: 5

---

# Vil funktionen tage de seneste ændringer?

Funktionen sayHi bruger en ekstern variabel name. Når funktionen kører, hvilken værdi vil den bruge?

```js
let name = "John";

function sayHi() {
  alert("Hej, " + name);
}

name = "Pete";

sayHi(); // Hvad vil den vise: "John" eller "Pete"?
```

Sådanne situationer er udbredte både i browser- og server-side udvikling. En funktion kan blive planlagt til at køre senere end den blev oprettet, for eksempel efter en brugerhandling eller en netværksforespørgsel.

Så spørgsmålet er: vil den tage de seneste ændringer?