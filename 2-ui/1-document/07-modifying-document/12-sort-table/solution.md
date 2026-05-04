Løsningen er kort, men kan se lidt tricky ud, så her leverer jeg den med omfattende kommentarer:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

Algoritmen trin for trin er:

1. Hent alle `<tr>`, fra `<tbody>`.
2. Sorter dem ved at sammenligne indholdet af det første `<td>` (navnefeltet).
3. Indsæt nu nodene i den rigtige rækkefølge ved hjælp af `.append(...sortedRows)`.

Vi behøver ikke at fjerne rækkelementerne, bare "genindsætte" dem - de forlader den gamle plads automatisk.

P.S. I vores tilfælde er der en eksplicit `<tbody>` i tabellen, men selvom HTML-tabellen ikke har `<tbody>`, har DOM-strukturen altid en.
