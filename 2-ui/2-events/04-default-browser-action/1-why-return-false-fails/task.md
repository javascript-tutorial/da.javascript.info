importance: 3

---

# Hvorfor virker "return false" ikke?

Se på koden nedenfor. Hvorfor virker `return false` ikke?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">browseren vil gå til w3.org</a>
```

Browseren følger URL'en ved klik, men det er ikke det, vi vil have.

Hvordan løser man det?
