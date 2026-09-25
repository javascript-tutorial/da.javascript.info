importance: 4

---

# Sorterbare tabeller

Gør tabellen sorterbare: klik på `<th>`-elementer skal sortere den efter den tilsvarende kolonne.

Hver `<th>` har typen i attributten, som dette:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Alder</th>
      <th data-type="string">Navn</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

I eksemplet ovenfor har den første kolonne tal, og den anden har -- strenge. Sorteringsfunktionen bør håndtere sortering i forhold til typen.

Kun typerne `"string"` og `"number"` skal understøttes.

Et virkende eksempel:

[iframe border=1 src="solution" height=190]

P.S. Tabellen kan være stor, med et hvilket som helst antal rækker og kolonner.
