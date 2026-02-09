importance: 4

---

# Er "else" påkrævet?

Følgende funktion returnerer `true`, hvis parameteren `age` er større end `18`.

Ellers spørger den om en bekræftelse og returnerer dens resultat:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Har du dine forældres tilladelse?');
  }
*/!*
}
```

Vil funktionen opføre sig anderledes, hvis `else` fjernes?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Har du dine forældres tilladelse?');
*/!*
}
```

Er der nogen forskel i opførslen af disse to varianter?
