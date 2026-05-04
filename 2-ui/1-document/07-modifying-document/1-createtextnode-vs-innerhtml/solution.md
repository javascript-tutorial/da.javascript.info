Svar: **1 og 3**.

Begge kommandoer resulterer i at tilføje `text` "som tekst" til `elem`.

Her er et eksempel:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>Tekst</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
