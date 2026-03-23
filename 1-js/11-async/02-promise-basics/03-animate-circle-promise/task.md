
# Animeret cirkel med promise

Omskriv funktionen `showCircle` i løsningen fra opgaven <info:task/animate-circle-callback> så den returnerer et promise i stedet for at acceptere en callback.

Den nye brug:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hej, verden!");
});
```

Brug løsningen fra <info:task/animate-circle-callback> som udgangspunkt.
