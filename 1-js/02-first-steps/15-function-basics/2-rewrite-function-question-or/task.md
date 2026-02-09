importance: 4

---

# Omskriv funktionen ved brug af '?' eller '||'

Følgende funktion returnerer `true`, hvis parameteren `age` er større end `18`.

Ellers spørger den om en bekræftelse og returnerer dens resultat.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Har du dine forældres tilladelse?');
  }
}
```

Omskriv den, så den udfører det samme, men uden `if`, på en enkelt linje.

Lav to varianter af `checkAge`:

1. Ved brug af spørgsmålstegnsoperatoren `?`
2. Ved brug af OR `||`
