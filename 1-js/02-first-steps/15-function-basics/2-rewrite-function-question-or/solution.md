Ved brug af spørgsmålstegnsoperatoren `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Har du dine forældres tilladelse?');
}
```

Ved brug af OR `||` (den korteste variant):

```js
function checkAge(age) {
  return (age > 18) || confirm('Har du dine forældres tilladelse?');
}
```

Bemærk, at parenteserne omkring `age > 18` ikke er påkrævet her. De findes for bedre læsbarhed.
