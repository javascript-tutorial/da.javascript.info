
# Omskriv ved brug af async/await

Omskriv dette eksempelkode fra kapitlet <info:promise-chaining> ved hjælp af `async/await` i stedet for `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
```
