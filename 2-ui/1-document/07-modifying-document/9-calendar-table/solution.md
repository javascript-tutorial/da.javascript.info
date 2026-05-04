Vi opretter tabellen som en streng: `"<table>...</table>"`, og tilknytter den til  `innerHTML`.

Algoritmen er som følger:

1. Opret en tabelhoved med `<th>` og navne på ugedage.
2. Opret datoobjektet `d = new Date(year, month-1)`. Det er den første dag i `month` (med hensyn til at måneder i JavaScript starter fra `0`, ikke `1`).
3. De første få celler indtil den første dag i måneden `d.getDay()` kan være tomme. Lad os fylde dem med `<td></td>`.
4. Øg dagen i `d`: `d.setDate(d.getDate()+1)`. Hvis `d.getMonth()` ikke er den næste måned, så tilføj den nye celle `<td>` til kalenderen. Hvis det er en søndag, så tilføj en ny linje <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. Hvis måneden er slut, men tabelrækken ikke er fuld, tilføj tomme `<td>` til den, for at gøre den kvadratisk.
