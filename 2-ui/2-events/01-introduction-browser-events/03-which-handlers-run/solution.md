Svaret er `1` og `2`.

Den første handler afvikles, fordi den ikke er blevet fjernet af `removeEventListener`. For at fjerne handleren skal vi overføre præcis den funktion, der var tildelt. Og i koden bliver en ny funktion overført, som ser den samme ud, men er stadig en anden funktion.

For at fjerne et funktionsobjekt, skal vi gemme en reference til det, sådan her:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

Handleren `button.onclick` virker uafhængigt og i tilføjelse til `addEventListener`.
