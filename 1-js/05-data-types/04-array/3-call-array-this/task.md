importance: 5

---

# Kald i et array-kontekst

Hvad er resultatet? Hvorfor?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```

