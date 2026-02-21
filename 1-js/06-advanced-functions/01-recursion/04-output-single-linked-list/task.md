importance: 5

---

# Udskriv en enkeltstrenget linked list

Lad os sige, vi har en enkeltstrenget linked list (som beskrevet i kapitlet <info:recursion>):

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Skriv en funktion `printList(list)` som udskriver listens elementer ét ad gangen.

Opret to varianter af løsningen: ved brug af en løkke og ved brug af rekursion.

Hvad er bedst: med rekursion eller uden?

