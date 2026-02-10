importance: 5

---

# Brug af "this" i object literals

Her returnerer funktionen `makeUser` et objekt.

Hvad er resultatet af at tilgå dets `ref`? Hvorfor?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Hvad er resultatet?
```

