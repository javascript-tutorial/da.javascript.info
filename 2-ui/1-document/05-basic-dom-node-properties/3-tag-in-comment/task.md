importance: 3

---

# Tag i kommentarer

Hvad viser denne kode?

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // hvad er der her?
</script>
```
