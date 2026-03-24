# Fejl i setTimeout

Hvad tror du? Vil `.catch` blive udløst? Forklar dit svar.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Ups!");
  }, 1000);
}).catch(alert);
```
