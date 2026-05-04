importance: 1

---

# Hvorfor bliver "aaa" ved med at være synlig?

I eksemplet nedenfor fjerner kaldet `table.remove()` tabellen fra dokumentet.

Men hvis du kører det, kan du se at teksten `"aaa"` stadig er synlig.

Hvorfor sker det?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // tabellen, som forventet

  table.remove();
  // hvorfor er der stadig "aaa" i dokumentet?
</script>
```
