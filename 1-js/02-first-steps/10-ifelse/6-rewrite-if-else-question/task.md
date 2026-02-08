importance: 5

---

# Omskriv 'if..else' til '?'

Omskriv `if..else` ved hjælp af flere betingede operatorer `'?'`.

For læsbarhed anbefales det at opdele koden i flere linjer.

```js
let message;

if (login == 'Ansat') {
  message = 'Hej';
} else if (login == 'Direktør') {
  message = 'Goddag';
} else if (login == '') {
  message = 'Ingen login';
} else {
  message = '';
}
```
