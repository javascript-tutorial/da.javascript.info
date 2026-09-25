Når en browser læser `on*`-attributten som `onclick`, opretter den en håndtering ud fra dens indhold.

For `onclick="handler()"` vil funktionen være:

```js
function(event) {
  handler() // indholdet af onclick
}
```

Nu kan vi se, at værdien returneret af `handler()` ikke bruges og ikke påvirker resultatet.

Løsningen er enkel:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Vi kan også bruge `event.preventDefault()`, som dette:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
