
# Re-resolve et promise?


Hvad er outputtet af koden nedenfor? 

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
